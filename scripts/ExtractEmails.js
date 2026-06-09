/**
  {
    "api": 1,
    "name": "Extract Emails",
    "description": "Extracts all email addresses from text, one per line.",
    "author": "Jeff Cryder",
    "icon": "envelope",
    "tags": "extract,email,address,regex,find"
  }
**/

function main(state) {
  const matches = state.text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g);
  if (!matches) {
    state.postError('No email addresses found.');
    return;
  }
  const unique = [...new Set(matches)];
  state.text = unique.join('\n');
  state.postInfo(`Found ${unique.length} email address${unique.length === 1 ? '' : 'es'}.`);
}
