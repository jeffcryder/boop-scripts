/**
  {
    "api": 1,
    "name": "Kebab Case with Suffix",
    "description": "Converts text to kebab-case and appends a random 4-character suffix to prevent naming collisions.",
    "author": "Jeff Cryder",
    "icon": "tag",
    "tags": "kebab,case,suffix,random,resource,name,unique,slug"
  }
**/

const { kebabCase } = require('@boop/lodash.boop');

function randomSuffix() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines
    .map(line => line.trim() ? `${kebabCase(line)}-${randomSuffix()}` : line)
    .join('\n');
}
