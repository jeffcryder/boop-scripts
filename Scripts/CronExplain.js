/**
  {
    "api": 1,
    "name": "Cron Explain",
    "description": "Translates a 5-field cron expression into plain English.",
    "author": "Jeff Cryder",
    "icon": "clock",
    "tags": "cron,schedule,explain,describe,time"
  }
**/

function main(state) {
  const expr = state.text.trim();
  const parts = expr.split(/\s+/);

  if (parts.length !== 5) {
    state.postError('Expected a 5-field cron expression (minute hour day month weekday).');
    return;
  }

  const [minute, hour, dom, month, dow] = parts;

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function describeField(val, names, unit, zeroIndex) {
    if (val === '*') return null;

    if (/^\*\/\d+$/.test(val)) {
      const step = val.split('/')[1];
      return `every ${step} ${unit}${step === '1' ? '' : 's'}`;
    }

    if (/^\d+-\d+$/.test(val)) {
      const [a, b] = val.split('-').map(Number);
      const lo = names ? names[a - (zeroIndex ? 0 : 1)] || a : a;
      const hi = names ? names[b - (zeroIndex ? 0 : 1)] || b : b;
      return `${lo} through ${hi}`;
    }

    if (/^\d+-\d+\/\d+$/.test(val)) {
      const [range, step] = val.split('/');
      const [a, b] = range.split('-').map(Number);
      const lo = names ? names[a - (zeroIndex ? 0 : 1)] || a : a;
      const hi = names ? names[b - (zeroIndex ? 0 : 1)] || b : b;
      return `every ${step} ${unit}${step === '1' ? '' : 's'} from ${lo} to ${hi}`;
    }

    if (val.includes(',')) {
      const items = val.split(',').map(v => {
        const n = Number(v);
        return names ? (names[n - (zeroIndex ? 0 : 1)] || v) : v;
      });
      return items.join(', ');
    }

    const n = Number(val);
    if (!isNaN(n)) {
      return names ? (names[n - (zeroIndex ? 0 : 1)] || val) : val;
    }

    return val;
  }

  const minuteDesc  = describeField(minute, null, 'minute', false);
  const hourDesc    = describeField(hour,   null, 'hour',   false);
  const domDesc     = describeField(dom,    null, 'day',    false);
  const monthDesc   = describeField(month,  MONTHS, 'month', false);
  const dowDesc     = describeField(dow,    DAYS,   'day',   true);

  // Build time phrase
  let timePart;
  if (minute === '*' && hour === '*') {
    timePart = 'every minute';
  } else if (hour === '*') {
    timePart = `at minute ${minute === '*' ? 'every' : minuteDesc} of every hour`;
  } else if (minute === '*') {
    timePart = `every minute of hour ${hourDesc}`;
  } else if (/^\*\//.test(minute)) {
    timePart = `${minuteDesc}`;
    if (hourDesc) timePart += ` during hour ${hourDesc}`;
  } else {
    const h = hour === '*' ? null : (hour.includes(',') || hour.includes('-') || hour.includes('/') ? hourDesc : hour.padStart(2, '0'));
    const m = minute === '*' ? '00' : (minute.includes(',') || minute.includes('-') || minute.includes('/') ? minuteDesc : minute.padStart(2, '0'));
    timePart = h ? `at ${h}:${m}` : `at minute ${m}`;
  }

  const parts2 = [timePart];

  if (dowDesc)   parts2.push(dowDesc);
  if (domDesc)   parts2.push(`on day ${domDesc}`);
  if (monthDesc) parts2.push(`in ${monthDesc}`);

  state.text = parts2.join(', ');
}
