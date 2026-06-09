/**
  {
    "api": 1,
    "name": "Number Lines",
    "description": "Prefixes each line with its 1-based line number.",
    "author": "Jeff Cryder",
    "icon": "list.number",
    "tags": "number,lines,prefix,enumerate,list"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
}
