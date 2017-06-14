const postcss = require('postcss');

/**
 * get the name of a variable
 * @param  {object} node
 * @return {null|string}
 */
function getVariableName(node) {
  const match = node.prop.match(/^\$(.*?)$/i);

  return match && match[1];
}

module.exports = postcss.plugin('inline-variables', (callback) => {
  const variables = {};

  return (root) => {
    root.walkDecls((node) => {
      const name = getVariableName(node);

      if (name) {
        variables[name] = node.value;
      }
    });

    callback(variables);
  };
});
