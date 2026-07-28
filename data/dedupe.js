(()=>{
const TRACKING=new Set(['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','gclid','fbclid','mc_cid','mc_eid']);
function canon(raw){
  try{
    const u=new URL(raw);
    const host=u.hostname.toLowerCase().replace(/^www\./,'');
    let path=u.pathname.replace(/\/+/g,'/').replace(/\/+$/,'');
    const q=[...u.searchParams.entries()].filter(([k])=>!TRACKING.has(k.toLowerCase())).sort(([a],[b])=>a.localeCompare(b));
    const search=q.length?'?'+new URLSearchParams(q).toString():'';
    return host+path+search;
  }catch{
    return String(raw||'').trim().replace(/^https?:\/\/(www\.)?/i,'').replace(/\/+$/,'').toLowerCase();
  }
}
const RECLASS=new Map([
  ['news.google.com',34],['bbc.com/monitoring',34],['hosted.ap.org',34],['edition.cnn.com',34],['alltop.com',34],['flipboard.com',34],
  ['scholar.google.com',35],['academia.edu',35],['citeseer.ist.psu.edu',35],['journalseek.net',35],
  ['visualping.io',36],['fetchrss.com',36],['ctrlq.org/rss',36],['newspaperarchive.com',41]
]);
const input=Array.isArray(window.OSINT_TOOLS)?window.OSINT_TOOLS:[];
const map=new Map();
for(const row of input){
  if(!Array.isArray(row)||!row[1]) continue;
  const key=canon(row[1]);
  if(!key) continue;
  const cat=RECLASS.has(key)?RECLASS.get(key):row[2];
  if(!map.has(key)){
    const copy=[row[0],row[1],cat,Array.isArray(row[3])?[...new Set(row[3])]:[]];
    if(row[4]) copy[4]=row[4];
    map.set(key,copy);
    continue;
  }
  const base=map.get(key);
  base[3]=[...new Set([...(base[3]||[]),...(row[3]||[])])];
  if(!base[4]&&row[4]) base[4]=row[4];
}
window.OSINT_CANON=canon;
window.OSINT_DEDUPE={before:input.length,after:map.size,removed:input.length-map.size};
window.OSINT_TOOLS=[...map.values()];
})();