/**
  {
    "api": 1,
    "name": "Generate UUID",
    "description": "Replaces text with a newly generated UUID v4.",
    "author": "Jeff Cryder",
    "icon": "number",
    "tags": "uuid,guid,generate,random,id"
  }
**/

function main(state) {
  state.text = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
