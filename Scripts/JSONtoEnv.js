/**
  {
    "api": 1,
    "name": "JSON to Env",
    "description": "Converts a flat JSON object to .env format (KEY=VALUE lines).",
    "author": "Jeff Cryder",
    "icon": "doc.plaintext",
    "tags": "json,env,dotenv,convert,environment,variables"
  }
**/

function main(state) {
  let obj;
  try {
    obj = JSON.parse(state.text);
  } catch (e) {
    state.postError('Invalid JSON: ' + e.message);
    return;
  }

  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    state.postError('Input must be a JSON object (not an array or primitive).');
    return;
  }

  const lines = [];
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'object' && val !== null) {
      state.postError(`Nested values are not supported in .env format (key: "${key}").`);
      return;
    }
    const str = String(val);
    // Quote if value contains spaces, quotes, or special shell characters
    const needsQuotes = /[\s"'\\#$`!]/.test(str) || str === '';
    lines.push(`${key}=${needsQuotes ? `"${str.replace(/"/g, '\\"')}"` : str}`);
  }

  state.text = lines.join('\n');
}
