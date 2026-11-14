(function(){
const S={en:{
 title:'Explore the data',lead:'Pick a country and an area to see how its stored water changed from 2002 on.',
 country:'Country',area:'Area',metric:'Show',more:'Data is available for Saudi Arabia now. More countries appear in this list when their data is added.',
 tws:'GRACE total water storage',sm:'GLDAS soil moisture (0-2 m)',gw:'Groundwater proxy (derived)',
 slope:'Trend (Sen slope)',cmyr:'cm/yr',p:'p',period:'Period',months:'months',
 pcorr:'autocorrelation-corrected p',ci:'95% CI',
 res:'GRACE sees areas of roughly 300 km and larger. A value for a city or small area describes the surrounding GRACE cell or box, not the place itself.',
 derived:'The groundwater proxy is GRACE minus modelled GLDAS soil moisture: derived, not measured.',
 nogldas:'The groundwater split (GLDAS) is not computed for this area yet. Only total water storage is shown.',
 noseries:'The monthly series for this area is not loaded yet. The chart image below comes from the analysis notebook.',
 axis:'cm of water, seasonal cycle removed',trend:'trend',decl:'declining',incr:'rising',
 hint:'Move over the chart to read values.',box:'Box',maptitle:'Map: click an area',maplegend:'Colour = GRACE total water storage trend (cm/yr). Rectangles are the analysis boxes, not exact borders.',mapfail:'The map could not load. The dropdowns still work.',credit:'Map: OpenStreetMap contributors'},
 ar:{
 title:'استكشف البيانات',lead:'اختر دولة ومنطقة لترى كيف تغيّر مخزونها من المياه منذ 2002.',
 country:'الدولة',area:'المنطقة',metric:'اعرض',more:'البيانات متاحة الآن للسعودية. تظهر دول أخرى في هذه القائمة عند إضافة بياناتها.',
 tws:'إجمالي المياه المخزنة (GRACE)',sm:'رطوبة التربة (GLDAS، 0-2 م)',gw:'مؤشر المياه الجوفية (مشتق)',
 slope:'الاتجاه (ميل سين)',cmyr:'سم/سنة',p:'p',period:'الفترة',months:'شهرًا',
 pcorr:'قيمة p بعد تصحيح الارتباط الذاتي',ci:'فاصل الثقة 95٪',
 res:'يرى GRACE مساحات تقارب 300 كم فأكثر. القيمة لمدينة أو منطقة صغيرة تصف خلية GRACE أو النطاق المحيط بها، وليس المكان نفسه.',
 derived:'مؤشر المياه الجوفية هو GRACE ناقص رطوبة تربة GLDAS المحاكاة: مشتق وليس مقيسًا.',
 nogldas:'فصل المياه الجوفية (GLDAS) لم يُحسب لهذه المنطقة بعد. يظهر إجمالي المياه المخزنة فقط.',
 noseries:'السلسلة الشهرية لهذه المنطقة لم تُحمّل بعد. الصورة أدناه من دفتر التحليل.',
 axis:'سم من الماء بعد إزالة الموسمية',trend:'الاتجاه',decl:'انخفاض',incr:'ارتفاع',
 hint:'حرّك المؤشر فوق الرسم لقراءة القيم.',box:'النطاق',maptitle:'الخريطة: اضغط على منطقة',maplegend:'اللون = اتجاه إجمالي المياه المخزنة من GRACE (سم/سنة). المستطيلات هي نطاقات التحليل وليست الحدود الدقيقة.',mapfail:'تعذّر تحميل الخريطة. القوائم المنسدلة تعمل.',credit:'الخريطة: مساهمو OpenStreetMap'}};
const COL={tws:'#1f4e79',sm:'#2aa764',gw:'#c0392b'};
const NUM=/(\d[\d.,]*-\d[\d.,]*|[-+]?\d[\d.,]*(?:e-?\d+)?)/g;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const f=s=>esc(s).split(NUM).map((x,i)=>i%2?'<span class="num">'+x+'</span>':x).join('');
const BND={sa:{whole:[[16,34.5],[32.5,55.7]],saq:[[27,37],[32,42.5]],sirhan:[[29,41],[32,44]],ahsa:[[22,48],[26,51]]}};
function lf(cb){if(window.L)return cb(1);if(!document.getElementById('lfcss')){const l=document.createElement('link');l.id='lfcss';l.rel='stylesheet';l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(l)}const sc=document.createElement('script');sc.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';sc.onload=()=>cb(1);sc.onerror=()=>cb(0);document.head.appendChild(sc)}
function scol(v){const t=Math.max(0,Math.min(1,-v/1.4));const a=[254,224,210],b=[165,15,21];return 'rgb('+a.map((x,i)=>Math.round(x+(b[i]-x)*t)).join(',')+')'}
let MAP=null;
const st={c:0,r:'whole',on:{tws:true,sm:true,gw:true}};
function median(a){const b=[...a].sort((x,y)=>x-y),n=b.length;return n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2}
function fmt(v,d){return (v>0?'+':v<0?'-':'')+Math.abs(v).toFixed(d)}
window.initExplorer=function(lang){
 const el=document.getElementById('explorer'); if(!el||!window.DATA)return;
 const T=S[lang],ar=lang==='ar',D=window.DATA,C=D.countries[st.c];
 const areas=[{id:'whole',name:C.whole.name,obj:C.whole}].concat(C.regions.map(r=>({id:r.id,name:r.name,obj:r})));
 if(!areas.find(a=>a.id===st.r))st.r='whole';
 const A=areas.find(a=>a.id===st.r),o=A.obj;
 const keys=o.series?['tws','sm','gw']:['tws'];
 let h=`<p class="label">${esc(T.title)}</p><h2>${esc(T.title)}</h2><p class="cap">${esc(T.lead)}</p>
 <div class="ctl"><label>${esc(T.country)}<select id="xc">${D.countries.map((c,i)=>`<option value="${i}"${i===st.c?' selected':''}>${esc(c.name[lang])}</option>`).join('')}</select></label>
 <label>${esc(T.area)}<select id="xr">${areas.map(a=>`<option value="${a.id}"${a.id===st.r?' selected':''}>${esc(a.name[lang])}</option>`).join('')}</select></label></div>
 <p class="cap">${esc(T.more)}</p>
 <div id="xmapw"><div id="xmap" role="application" aria-label="${esc(T.maptitle)}" style="direction:ltr"></div><div class="legend"><span class="lg" style="background:linear-gradient(90deg,${scol(0)},${scol(-1.4)})"></span><span class="num">0</span><span class="num" style="margin-inline-start:auto">-1.4 ${esc(T.cmyr)}</span></div><p class="cap">${esc(T.maplegend)}</p></div>`;
 if(o.series){
  h+=`<div class="chips" role="group" aria-label="${esc(T.metric)}">${keys.map(k=>`<label class="chip" style="--c:${COL[k]}"><input type="checkbox" data-k="${k}"${st.on[k]?' checked':''}><span class="sw" style="background:${COL[k]}"></span>${esc(T[k])}</label>`).join('')}</div>
  <div id="xchart" class="chart"></div><p class="cap" id="xtip">${esc(T.hint)}</p>`;
 } else {
  h+=`<p class="cap">${esc(T.noseries)}</p><figure><img src="${(window.IM||{})[o.image]||''}" alt="${esc(A.name[lang])}"></figure>`;
 }
 h+=`<div class="cards">`+keys.map(k=>{const s=o.stats[k];if(!s)return'';
  const dir=s.sen<0?T.decl:T.incr;
  return `<div class="card" style="--c:${COL[k]}"><div class="cn">${esc(T[k])}</div><div class="cv">${ar?'<span class="num">'+(s.sen<0?'\u25BC ':'\u25B2 ')+Math.abs(s.sen).toFixed(2)+'</span> '+esc(T.cmyr):f(fmt(s.sen,2)+' '+T.cmyr)}</div><div class="cd">${esc(dir)}${s.ci?' · '+esc(T.ci)+': '+f(s.ci[0]+' '+(ar?'إلى':'to')+' '+s.ci[1]):''}<br>${esc(T.pcorr)}: ${ar&&String(s.p)[0]==='<'?'أقل من '+f(String(s.p).slice(1)):f(s.p)}</div></div>`}).join('')+`</div>
 <p class="cap">${esc(T.period)}: ${f(o.period.replace(' to ',ar?' إلى ':' to '))} (${f(String(o.n))} ${esc(T.months)}). ${o.box?esc(T.box)+': '+f(o.box)+'. ':''}${C.area_note&&st.r==='whole'?esc(C.area_note[lang])+'. ':''}</p>`;
 if(o.series)h+=`<div class="warn"><p style="margin:0">${esc(T.derived)}</p></div>`; else h+=`<div class="warn"><p style="margin:0">${esc(T.nogldas)}</p></div>`;
 h+=`<div class="warn" style="margin-top:10px"><p style="margin:0">${esc(T.res)}</p></div>`;
 el.innerHTML=h;
 if(MAP){try{MAP.remove()}catch(e){}MAP=null}
 lf(ok=>{const mb=document.getElementById('xmap');if(!mb)return;if(!ok){document.getElementById('xmapw').innerHTML='<p class="cap">'+esc(T.mapfail)+'</p>';return}
  const mp=L.map(mb,{scrollWheelZoom:false,attributionControl:true}).setView([24.5,45],mb.clientWidth<500?4:5);MAP=mp;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:8,attribution:'&copy; OpenStreetMap'}).addTo(mp);
  const bn=BND[C.id]||{};const order=areas.slice().sort((a,b)=>(a.id==='whole'?-1:1)-(b.id==='whole'?-1:1));
  order.forEach(a=>{const b=bn[a.id];if(!b)return;const sv=a.obj.stats&&a.obj.stats.tws?a.obj.stats.tws.sen:0;const on=a.id===st.r;
   const r=L.rectangle(b,{color:on?'#0c2a2f':'#585254',weight:on?3:1.5,fillColor:scol(sv),fillOpacity:a.id==='whole'?.35:.7,dashArray:a.id==='whole'?'6 4':null}).addTo(mp);
   r.bindTooltip(a.name[lang]+': '+(ar?Math.abs(sv).toFixed(2)+' '+T.cmyr:fmt(sv,2)+' '+T.cmyr),{sticky:true});
   r.on('click',()=>{st.r=a.id;initExplorer(lang)});});
  const wb=bn.whole;if(wb)mp.fitBounds(wb,{padding:[10,10]});
 });
 document.getElementById('xc').onchange=e=>{st.c=+e.target.value;st.r='whole';initExplorer(lang)};
 document.getElementById('xr').onchange=e=>{st.r=e.target.value;initExplorer(lang)};
 el.querySelectorAll('input[data-k]').forEach(i=>i.onchange=()=>{st.on[i.dataset.k]=i.checked;draw()});
 function draw(){
  {const c=document.getElementById('xchart'),k=document.querySelector('#explorer .cards');[c,k].forEach(e=>{if(e){e.classList.remove('fx');void e.offsetWidth;e.classList.add('fx')}})}
  if(!o.series)return;
  const box=document.getElementById('xchart'),W=Math.max(300,box.clientWidth-12||700),H=W<500?260:340,m={l:40,r:12,t:12,b:28};
  const act=keys.filter(k=>st.on[k]);
  const n=o.months.length;let lo=1e9,hi=-1e9;
  act.forEach(k=>o.series[k].forEach(v=>{lo=Math.min(lo,v);hi=Math.max(hi,v)}));
  if(!act.length){box.innerHTML='';return}
  const pad=(hi-lo)*.08;lo-=pad;hi+=pad;
  const tt=o.months.map(q=>+q.slice(0,4)+(+q.slice(5,7)-.5)/12),t0=tt[0],t1=tt[n-1];const x=i=>m.l+(W-m.l-m.r)*(tt[i]-t0)/(t1-t0),y=v=>m.t+(H-m.t-m.b)*(1-(v-lo)/(hi-lo));
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(T.axis)}" style="width:100%;height:auto;touch-action:pan-y;direction:ltr">`;
  const step=Math.pow(10,Math.floor(Math.log10((hi-lo)/4)));let tk=[1,2,2.5,5,10].map(q=>q*step).find(q=>(hi-lo)/q<=6);
  for(let v=Math.ceil(lo/tk)*tk;v<=hi;v+=tk){s+=`<line x1="${m.l}" x2="${W-m.r}" y1="${y(v)}" y2="${y(v)}" stroke="${Math.abs(v)<1e-9?'#999':'#eae9ea'}"/><text x="${m.l-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="#585254">${(+v.toFixed(2))}</text>`}
  const y0=+o.months[0].slice(0,4),y1=+o.months[n-1].slice(0,4);
  for(let yr=Math.ceil(y0/4)*4;yr<=y1;yr+=4){const i=o.months.findIndex(mm=>mm.startsWith(yr+'-01'));if(i<0)continue;s+=`<text x="${x(i)}" y="${H-10}" text-anchor="middle" font-size="11" fill="#585254">${yr}</text>`}
  act.forEach(k=>{const v=o.series[k];s+=`<polyline fill="none" stroke="${COL[k]}" stroke-opacity=".45" stroke-width="1.4" points="${v.map((a,i)=>x(i)+','+y(a)).join(' ')}"/>`;
   const sl=o.stats[k].sen/12,ic=median(v.map((a,i)=>a-sl*i));s+=`<line x1="${x(0)}" x2="${x(n-1)}" y1="${y(ic)}" y2="${y(ic+sl*(n-1))}" stroke="${COL[k]}" stroke-width="3"/>`});
  s+=`<line id="xcur" y1="${m.t}" y2="${H-m.b}" stroke="#251f21" stroke-opacity=".5" visibility="hidden"/></svg>`;
  box.innerHTML=s;
  const svg=box.querySelector('svg'),cur=svg.querySelector('#xcur'),tip=document.getElementById('xtip');
  function mv(ev){const r=svg.getBoundingClientRect(),px=(ev.clientX-r.left)/r.width*W;const tx=t0+(px-m.l)/(W-m.l-m.r)*(t1-t0);let i=0,bd=1e9;tt.forEach((q,j)=>{const dd=Math.abs(q-tx);if(dd<bd){bd=dd;i=j}});
   cur.setAttribute('x1',x(i));cur.setAttribute('x2',x(i));cur.setAttribute('visibility','visible');
   tip.innerHTML=f(o.months[i])+': '+act.map(k=>`<span style="color:${COL[k]}">&#9632;</span> ${esc(T[k])} <span class="num">${fmt(o.series[k][i],2)}</span>`).join(' &nbsp; ')}
  svg.addEventListener('pointermove',mv);svg.addEventListener('pointerdown',mv);
 }
 draw();
};
})();
