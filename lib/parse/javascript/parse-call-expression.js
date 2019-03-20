const isComponentReference = require('./is-component-reference');
const isObjectMethod = require('./is-object-method');
const parseObjectMethod = require('./parse-object-method');

const isShape = type => ['shape', 'exact'].includes(type);
const validTypes = ['arrayOf', 'exact', 'instanceOf', 'oneOf', 'shape'];

module.exports = (meta, parseType) => node => {
  const { callee } = node;
  const [argument] = node.arguments;

  // Handle component references in 'shape'
  if (isShape(callee.name) && isComponentReference(argument)) {
    return parseType(argument.object, meta);
  }

  if (meta.type === 'exclude') {
    return;
  }

  // 'instanceOf' is included here because it is automatically stripped in 'transform-prop-types.js' and should not throw an error
  if (validTypes.includes(callee.name)) {
    return { type: callee.name, children: parseType(argument, meta) };
  }

  // Object.keys, Object.values
  if (isObjectMethod(node)) {
    return parseObjectMethod(node);
  }

  throw new Error(`Invalid function call '${callee.name}'`);
};