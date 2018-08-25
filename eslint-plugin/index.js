const t = require('babel-types');

const getInvalidPropTypes = require('./get-invalid-prop-types');
const messages = require('./messages');
const validate = require('./validate');

const getPropTypesMeta = objectExpression => {
  return objectExpression.properties.reduce(
    (accum, property) =>
      Object.assign(accum, { [property.key.name]: property.value }),
    {}
  );
};

const getPropNames = objectExpression => {
  return objectExpression.properties.map(property => property.key);
};

module.exports = {
  rules: {
    all: {
      meta: { messages },
      create: function(context) {
        let exportDeclarations = [];
        const metaTypes = {};
        const invalidPropTypes = {};
        let propNames = [];

        if (!context.getFilename().includes('.jsx')) {
          return {};
        }

        // The exported visitor functions gather information about propTypes, propTypesMeta and file exports. The 'Program:exit' visitor will execute last. When it runs, the validate function is called with the gathered data. 'validate' will report any errors to eslint via the 'context' object.
        return {
          'Program:exit': node => {
            validate({
              bodyNode: node,
              context,
              exportDeclarations,
              metaTypes,
              propNames,
              invalidPropTypes
            });
          },
          ExportDefaultDeclaration: node => {
            exportDeclarations = exportDeclarations.concat(node.declaration);
          },
          ExportNamedDeclaration: node => {
            exportDeclarations = exportDeclarations.concat(
              node.specifiers.map(specifier => specifier.exported)
            );
          },
          ClassProperty: node => {
            if (t.isIdentifier(node.key, { name: 'propTypes' })) {
              Object.assign(invalidPropTypes, getInvalidPropTypes(node.value));
              propNames = propNames.concat(getPropNames(node.value));
            }

            if (t.isIdentifier(node.key, { name: 'propTypesMeta' })) {
              Object.assign(metaTypes, getPropTypesMeta(node.value));
            }
          },
          AssignmentExpression: node => {
            if (
              t.isMemberExpression(node.left) &&
              node.left.property.name === 'propTypes'
            ) {
              Object.assign(invalidPropTypes, getInvalidPropTypes(node.right));
              propNames = propNames.concat(getPropNames(node.right));
            }

            if (
              t.isMemberExpression(node.left) &&
              node.left.property.name === 'propTypesMeta'
            ) {
              Object.assign(metaTypes, getPropTypesMeta(node.right));
            }
          }
        };
      }
    }
  }
};