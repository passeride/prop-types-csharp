const get = require('lodash/get');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// Replace references in 'oneOf' with value literals
module.exports = function({ componentName, propTypesMeta = {}, syntaxTree }) {
  traverse(syntaxTree, {
    CallExpression(path) {
      const callee = path.get('callee');

      if (!callee.isIdentifier({ name: 'oneOf' })) {
        return;
      }

      const parent = path.findParent(parent => parent.isObjectProperty());
      const propName = parent.node.key.name;
      const oneOfArgument = path.node.arguments[0];
      const meta = propTypesMeta[propName];

      if (!oneOfArgument) {
        throw new Error(`Missing value in 'oneOf' for prop '${propName}'`);
      }

      // Abort if meta type is 'exclude'. Actual removal of the node happens later, in 'transform-prop-types.js'
      if (get(meta, 'type') === 'exclude') {
        return;
      }

      const missingLiteralError = argumentName =>
        new Error(
          `Couldn't resolve 'oneOf' value for prop '${propName}'. Make sure '${argumentName}' is defined in the above file.`
        );

      // Reference to an array
      if (t.isIdentifier(oneOfArgument)) {
        if (!path.scope.hasBinding(oneOfArgument.name)) {
          throw missingLiteralError(oneOfArgument.name);
        }

        // Class components have their bindings nested inside a key equal to the class name
        const bindings = path.scope.hasOwnBinding(oneOfArgument.name)
          ? path.scope.bindings
          : path.scope.bindings[componentName].scope.bindings;

        const arrayLiteral = bindings[oneOfArgument.name].path.node.init;

        if (!arrayLiteral) {
          throw missingLiteralError(oneOfArgument.name);
        }

        path.node.arguments = [arrayLiteral];
        return;
      }

      // Object.keys, Object.values
      if (
        t.isCallExpression(oneOfArgument) &&
        t.isMemberExpression(oneOfArgument.callee) &&
        t.isIdentifier(oneOfArgument.callee.object, { name: 'Object' })
      ) {
        const objectMethod = oneOfArgument;
        const argument = objectMethod.arguments[0];

        if (!argument) {
          throw new Error(`Missing value in 'oneOf' for prop '${propName}'`);
        }

        if (!path.scope.hasBinding(argument.name)) {
          throw missingLiteralError(argument.name);
        }

        // Class components have their bindings nested inside a key equal to the class name
        const bindings = path.scope.hasOwnBinding(argument.name)
          ? path.scope.bindings
          : path.scope.bindings[componentName].scope.bindings;

        const objectLiteral = bindings[argument.name].path.node.init;

        if (!objectLiteral) {
          throw missingLiteralError(argument.name);
        }

        objectMethod.arguments = [objectLiteral];
      }
    }
  });
};