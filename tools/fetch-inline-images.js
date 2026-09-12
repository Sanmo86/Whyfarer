// tools/fetch-inline-images.js
// One-off dev script: fetches the 25 mid-article images via Openverse,
// filtering allowed licenses CLIENT-SIDE (the API's own `license=` filter
// param is currently timing out on Openverse's backend — querying without
// it and filtering the results here works around that).
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');
const CREDITS_PATH = path.join(ROOT, 'assets', 'credits.json');
const ALLOWED = new Set(['cc0', 'by', 'by-sa', 'pdm']);

const QUERIES = [
  ['argentina2', 'Argentina countryside landscape']
];

function get(url, timeoutMs) {
  return new Promise(function (resolve, reject) {
    const req = https.get(url, { headers: { 'User-Agent': 'Whyfarer/1.0' } }, function (res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return get(res.headers.location, timeoutMs).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', function (c) { chunks.push(c); });
      res.on('end', function () { resolve({ status: res.statusCode, buffer: Buffer.concat(chunks) }); });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, function () { req.destroy(new Error('timeout')); });
  });
}

function readCredits() {
  try { return JSON.parse(fs.readFileSync(CREDITS_PATH, 'utf8')); } catch (e) { return {}; }
}

function extFromUrl(u) {
  const m = u.match(/\.(jpe?g|png|webp|gif|avif)(?:\?|$)/i);
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg';
}

async function processOne(id, query, credits) {
  const q = encodeURIComponent(query);
  const searchUrl = `https://api.openverse.org/v1/images/?q=${q}&mature=false&page_size=20`;
  process.stdout.write(`[${id}] "${query}" ... `);
  let res;
  try {
    res = await get(searchUrl, 9000);
  } catch (e) {
    console.log('FAIL (network: ' + e.message + ')');
    return false;
  }
  if (res.status !== 200) { console.log('FAIL (HTTP ' + res.status + ')'); return false; }

  let json;
  try { json = JSON.parse(res.buffer.toString('utf8')); } catch (e) { console.log('FAIL (bad JSON)'); return false; }
  const results = json.results || [];
  const pick = results.find(function (r) { return ALLOWED.has((r.license || '').toLowerCase()) && /\.(jpe?g|png|webp)(?:\?|$)/i.test(r.url || ''); });

  if (!pick) { console.log('FAIL (no allowed-license result among ' + results.length + ')'); return false; }

  let imgRes;
  try {
    imgRes = await get(pick.url, 12000);
  } catch (e) { console.log('FAIL (download: ' + e.message + ')'); return false; }
  if (imgRes.status !== 200 || imgRes.buffer.length < 1024) { console.log('FAIL (bad download)'); return false; }

  const ext = extFromUrl(pick.url);
  const filename = id + '.' + ext;
  fs.writeFileSync(path.join(IMG_DIR, filename), imgRes.buffer);

  credits[id] = {
    src: 'assets/img/' + filename,
    title: pick.title || '',
    creator: pick.creator || '',
    creator_url: pick.creator_url || '',
    license: pick.license || '',
    license_version: pick.license_version || '',
    license_url: pick.license_url || '',
    foreign_landing_url: pick.foreign_landing_url || '',
    source: pick.source || pick.provider || ''
  };

  console.log('OK ' + (imgRes.buffer.length / 1024 | 0) + ' KB — ' + pick.license.toUpperCase() + ' — ' + (pick.creator || 'unknown'));
  return true;
}

(async function main() {
  const credits = readCredits();
  let ok = 0, fail = 0;
  const failed = [];
  for (const [id, query] of QUERIES) {
    const success = await processOne(id, query, credits);
    if (success) ok++; else { fail++; failed.push([id, query]); }
    fs.writeFileSync(CREDITS_PATH, JSON.stringify(credits, null, 2));
    await new Promise(function (r) { setTimeout(r, 400); });
  }
  console.log('\nDone: ' + ok + ' ok, ' + fail + ' failed.');
  if (failed.length) {
    console.log('Failed queries (retry these manually with different terms):');
    failed.forEach(function (f) { console.log('  ' + f[0] + ' — ' + f[1]); });
  }
})();
