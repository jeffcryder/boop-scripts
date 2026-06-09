/**
  {
    "api": 1,
    "name": "Env to JSON",
    "description": "Parses a .env file (KEY=VALUE pairs) into a JSON object.",
    "author": "Jeff Cryder",
    "icon": "doc.text",
    "tags": "env,dotenv,json,convert,environment,variables"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const obj = {};
  let count = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key) {
      obj[key] = value;
      count++;
    }
  }

  if (count === 0) {
    state.postError('No KEY=VALUE pairs found.');
    return;
  }

  state.text = JSON.stringify(obj, null, 2);
  state.postInfo(`Parsed ${count} variable${count === 1 ? '' : 's'}.`);
}
