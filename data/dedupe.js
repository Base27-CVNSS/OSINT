(()=>{
const TRACKING=new Set(['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','gclid','fbclid','mc_cid','mc_eid']);
function canon(raw){
  try{
    const u=new URL(raw);
    const host=u.hostname.toLowerCase().replace(/^www\./,'');
    const path=u.pathname.replace(/\/+/g,'/').replace(/\/+$/,'');
    const q=[...u.searchParams.entries()].filter(([k])=>!TRACKING.has(k.toLowerCase())).sort(([a],[b])=>a.localeCompare(b));
    return host+path+(q.length?'?'+new URLSearchParams(q).toString():'');
  }catch{
    return String(raw||'').trim().replace(/^https?:\/\/(www\.)?/i,'').replace(/\/+$/,'').toLowerCase();
  }
}
function nameKey(raw){
  return String(raw||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\b(the|tool|tools|app|site)\b/g,'').replace(/[^a-z0-9]+/g,'');
}
const RECLASS=new Map([
  ['news.google.com',34],['bbc.com/monitoring',34],['hosted.ap.org',34],['edition.cnn.com',34],['alltop.com',34],['flipboard.com',34],
  ['scholar.google.com',35],['academia.edu',35],['citeseer.ist.psu.edu',35],['journalseek.net',35],
  ['visualping.io',36],['fetchrss.com',36],['ctrlq.org/rss',36],['newspaperarchive.com',41]
]);
const input=Array.isArray(window.OSINT_TOOLS)?window.OSINT_TOOLS:[];
const byUrl=new Map();
let removedByUrl=0,removedByName=0;
function merge(base,row){
  base[3]=[...new Set([...(base[3]||[]),...(row[3]||[])])];
  if(!base[4]&&row[4]) base[4]=row[4];
}
for(const row of input){
  if(!Array.isArray(row)||!row[1]) continue;
  const key=canon(row[1]);
  if(!key) continue;
  const cat=RECLASS.has(key)?RECLASS.get(key):row[2];
  const copy=[row[0],row[1],cat,Array.isArray(row[3])?[...new Set(row[3])]:[]];
  if(row[4]) copy[4]=row[4];
  if(byUrl.has(key)){merge(byUrl.get(key),copy);removedByUrl++;}
  else byUrl.set(key,copy);
}
const byName=new Map(),final=[];
for(const row of byUrl.values()){
  const nk=nameKey(row[0]);
  if(nk&&byName.has(nk)){
    merge(byName.get(nk),row);
    removedByName++;
    continue;
  }
  if(nk) byName.set(nk,row);
  final.push(row);
}
window.OSINT_CANON=canon;
window.OSINT_NAMEKEY=nameKey;
window.OSINT_DEDUPE={before:input.length,after:final.length,removed:input.length-final.length,removedByUrl,removedByName};
window.OSINT_TOOLS=final;
})();