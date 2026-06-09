/**
  {
    "api": 1,
    "name": "Extract URLs",
    "description": "Extracts all URLs (http/https/ftp) from text, one per line.",
    "author": "Jeff Cryder",
    "icon": "link",
    "tags": "extract,url,link,http,https,ftp,regex,find"
  }
**/

function main(state) {
  const matches = state.text.match(/(?:https?|ftp):\/\/[^\s"'<>)\]]+/g);
  if (!matches) {
    state.postError('No URLs found.');
    return;
  }
  const unique = [...new Set(matches)];
  state.text = unique.join('\n');
  state.postInfo(`Found ${unique.length} URL${unique.length === 1 ? '' : 's'}.`);
}
