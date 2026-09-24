const fs = require('fs');
const path = require('path');

const exts = ['.js', '.mjs', '.json', '.md'];
const dirs = ['src', 'config', 'server'];

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else if (exts.includes(path.extname(p))) {
      callback(p);
    }
  }
}

dirs.forEach(d => {
  const root = path.join(process.cwd(), d);
  walk(root, p => {
    let content = fs.readFileSync(p, 'utf8');
    let changed = false;
    
    const repl = (search, replace) => {
      const re = typeof search === 'string' ? new RegExp(search, 'g') : search;
      if (re.test(content)) {
        content = content.replace(re, replace);
        changed = true;
      }
    };
    
    // General text replacements
    repl('\\baustin\\b', 'delhi');
    repl('\\bAustin\\b', 'New Delhi');
    repl('\\bAUSTIN\\b', 'DELHI');
    repl('United States', 'India');
    repl("country: 'US'", "country: 'IN'");
    repl('countryCode: \\'US\\'', 'countryCode: \\'IN\\'');
    
    if (changed) {
      fs.writeFileSync(p, content);
      console.log('Updated: ' + p);
    }
  });
});
