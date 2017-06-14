# postcss-get-sass-variables [![Build Status](https://travis-ci.org/nelsonpecora/postcss-get-sass-variables.svg?branch=master)](https://travis-ci.org/nelsonpecora/postcss-get-sass-variables)

[PostCSS](https://github.com/postcss/postcss) plugin to get an object containing SASS-style variables and their values

# Installation

```
npm install --save-dev postcss-get-sass-variables
```

# Usage

Write SASS-style variables in a css file:

```sass
$background-color: red;
$font-stack: Helvetica, Arial, sans-serif;
```
Then run it through `postcss`, providing a callback function to handle the resulting object:

```js
const getVariables = require('postcss-get-sass-variables');

postcss([getVariables((obj) => {
  console.log(obj); // → { 'background-color': 'red', 'font-stack': 'Helvetica, Arial, sans-serif' }
})]).process(css);
```

Use this in combination with [postcss-inline-variables](https://github.com/nelsonpecora/postcss-inline-variables) for a simple and fast component + styleguide variable system!

```js
const getVariables = require('postcss-get-sass-variables'),
  inlineVariables = require('postcss-inline-variables'),
  variables = {};

// grab variables from styleguide css files
postcss([getVariables((obj) => {
  Object.assign(variables, obj);
})]).process(styleguide)
  // then apply them to your other styles
  .then(() => postcss([inlineVariables(variables)]).process(componentStyles));
```
