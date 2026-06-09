/**
  {
    "api": 1,
    "name": "Timestamp to Date",
    "description": "Converts a Unix timestamp (seconds or milliseconds) to a human-readable date.",
    "author": "Jeff Cryder",
    "icon": "calendar",
    "tags": "timestamp,unix,date,time,convert,epoch"
  }
**/

function main(state) {
  const raw = state.text.trim();
  const n = Number(raw);

  if (isNaN(n) || raw === '') {
    state.postError('Input must be a numeric Unix timestamp.');
    return;
  }

  // Heuristic: values > 1e11 are likely already milliseconds
  const ms = n > 1e11 ? n : n * 1000;
  const date = new Date(ms);

  if (isNaN(date.getTime())) {
    state.postError('Could not parse timestamp as a valid date.');
    return;
  }

  state.text = date.toISOString() + '\n' + date.toString();
}
