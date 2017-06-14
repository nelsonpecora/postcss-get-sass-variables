const postcss = require('postcss');

/**
 * get the name of a variable
 * @param  {string} str
 * @return {null|string}
 */
function getVariableName(str) {
  const match = str.match(/^\$(.*?)$/i);

  return match && match[1];
}

module.exports = postcss.plugin('get-sass-variables', (callback) => {
  const variables = {};

  return (root) => {
    root.walkDecls((node) => {
      const name = getVariableName(node.prop),
        variableReference = getVariableName(node.value);

      if (name && variableReference && variables[variableReference]) {
        // this references another variable which exists
        variables[name] = variables[variableReference];
      } else if (name && variableReference) {
        // this references a variable that DOESN'T exist
        throw node.error(`$${name} references $${variableReference} which doesn't exist!`);
      } else if (name) {
        // this defines a variable
        variables[name] = node.value;
      }
    });

    callback(variables);
  };
});
