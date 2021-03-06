/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import pt from 'prop-types';

const Link = () => {};

const enumArray = ['value-1', 'value-2'];
const enumObject = {
  valueA: 'value-a',
  valueB: 'value-b'
};

class ClassComponent extends React.Component {
  static propTypes = {
    text: pt.string.isRequired,
    isSomething: pt.bool,
    number: pt.number,
    intNumber: pt.number,
    floatNumber: pt.number,
    texts: pt.arrayOf(pt.string),
    singleObject: pt.shape({
      propertyA: pt.string.isRequired
    }),
    objects: pt.arrayOf(
      pt.shape({
        propertyB: pt.string.isRequired
      })
    ).isRequired,
    shapeExclude: pt.shape({
      object: pt.object
    }),
    shapeMeta: pt.shape({
      object: pt.object
    }).isRequired,
    objectArray: pt.arrayOf(pt.object).isRequired,
    nestedList: pt.arrayOf(pt.arrayOf(pt.arrayOf(pt.string))),
    nestedExclude: pt.shape({
      a: pt.object
    }),
    nestedShape: pt.shape({
      a: pt.shape({
        b: pt.shape({
          c: pt.string
        })
      })
    }),
    link: pt.shape(Link.propTypes),
    linkList: pt.arrayOf(pt.shape(Link.propTypes)),
    linkMeta: pt.object,
    linkListMeta: pt.array,
    enumArray: pt.oneOf(enumArray).isRequired,
    enumInline: pt.oneOf([1, 2]),
    enumObject: pt.oneOf(Object.keys(enumObject)),

    // These should be excluded
    instance: pt.instanceOf(Link),
    excludeMe: pt.number,
    node: pt.node,
    element: pt.element,
    function: pt.func
  };

  static propTypesMeta = {
    intNumber: 'int',
    floatNumber: 'float',
    excludeMe: 'exclude',
    shapeExclude: 'exclude',
    shapeMeta: {
      object: Link
    },
    nestedExclude: {
      a: 'exclude'
    },
    objectArray: [Link],
    linkMeta: Link,
    linkListMeta: [Link]
  };

  render() {
    return <div />;
  }
}

export default ClassComponent;
