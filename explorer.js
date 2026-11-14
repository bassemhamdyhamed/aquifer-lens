(function(){
const S={en:{
 title:'Explore the data',lead:'Pick a country and an area, or click the map, to see how its stored water changed from 2002 on.',
 country:'Country',area:'Area',whole:'Whole country (box)',show:'Show',
 tws:'GRACE total water storage',sm:'GLDAS soil moisture (0-2 m)',gw:'Groundwater proxy (derived)',
 cmyr:'cm/yr',period:'Period',months:'months',pcorr:'autocorrelation-corrected p',
 res:'GRACE sees areas of roughly 300 km and larger. A value for a city or small area describes the surrounding GRACE cell or box, not the place itself. Country and region boxes are rectangles, not exact borders, and include some neighbouring territory.',
 derived:'The groundwater proxy is GRACE minus modelled GLDAS soil moisture: derived, not measured.',
 approx:'Approximate: small area',approxnote:'This area is smaller than or close to GRACE resolution and shares signal with its neighbours. Treat the numbers as indicative only.',
 nsig:'not statistically significant (p above 0.05)',sig:'statistically significant',
 zonenote:'Aquifer zone: total water storage only. Monthly series and the GLDAS split are not loaded for it; the chart image comes from the analysis notebook.',
 decl:'declining',incr:'rising',axis:'cm of water, seasonal cycle removed',hint:'Move over the chart to read values. Thick lines are the Sen trend.',
 maptitle:'Map: click an area',maplegend:'Colour = GRACE total water storage trend (cm/yr): red declining, blue rising. Rectangles are analysis boxes, not exact borders.',
 mapfail:'The map could not load. The dropdowns still work.',credit:'Map UX inspired by geemap / leafmap (Qiusheng Wu, MIT). Map data: OpenStreetMap contributors.',
 pper:'GRACE record, April 2002 to September 2026',
 periodtxt:(a,b,n,g)=>`GRACE trend: ${a} to ${b}. The chart and the GLDAS-based values use the ${g} months both datasets share (April 2002 to July 2026).`,
 method:'Method: the seasonal cycle is removed (calendar-month climatology), then a Mann-Kendall test and Sen slope are applied. The chart plots these deseasonalized anomalies of the regional monthly means. p-values are autocorrelation-corrected (Hamed-Rao). Confidence intervals, where shown, are classic Sen/Kendall intervals and are not autocorrelation-adjusted.',
 mdata:'<bdi dir="ltr">JPL GRACE/GRACE-FO Mascon CRI RL06.3 v04</bdi>, <bdi dir="ltr">GLDAS Noah L4 monthly 0.25 deg V2.1</bdi> (NASA GES DISC, DOI <bdi dir="ltr">10.5067/SXAVCZFAQLNO</bdi>)',mlab:'Data: ',
 rtitle:'Country ranking',rlead:'Sen trend of GRACE total water storage, April 2002 to September 2026, most decline first. Click a row to open it above.',
 rk:'#',rc:'Country',rt:'Trend (cm/yr)',rp:'p (corrected)',rn:'Note',
 rising:(l)=>`${l} show rising total water storage, not decline. The ranking reports the trend as measured.`,
 risingnote:'GRACE total water storage covers all stored water, not groundwater alone.'},
 ar:{
 title:'استكشف البيانات',lead:'اختر دولة ومنطقة، أو اضغط على الخريطة، لترى كيف تغيّر مخزونها من المياه منذ 2002.',
 country:'الدولة',area:'المنطقة',whole:'الدولة كاملة (نطاق)',show:'اعرض',
 tws:'إجمالي المياه المخزنة (GRACE)',sm:'رطوبة التربة (GLDAS، 0-2 م)',gw:'مؤشر المياه الجوفية (مشتق)',
 cmyr:'سم/سنة',period:'الفترة',months:'شهرًا',pcorr:'قيمة p بعد تصحيح الارتباط الذاتي',
 res:'يرى GRACE مساحات تقارب 300 كم فأكثر. القيمة لمدينة أو منطقة صغيرة تصف خلية GRACE أو النطاق المحيط بها، وليس المكان نفسه. نطاقات الدول والمناطق مستطيلات وليست حدودًا دقيقة، وتضم بعض أراضي الجوار.',
 derived:'مؤشر المياه الجوفية هو GRACE ناقص رطوبة تربة GLDAS المحاكاة: مشتق وليس مقيسًا.',
 approx:'تقريبي: منطقة صغيرة',approxnote:'هذه المنطقة أصغر من دقة GRACE أو قريبة منها وتتشارك الإشارة مع جيرانها. اعتبر الأرقام إرشادية فقط.',
 nsig:'غير دالّ إحصائيًا (p أكبر من 0.05)',sig:'دالّ إحصائيًا',
 zonenote:'خزان جوفي: إجمالي المياه المخزنة فقط. السلسلة الشهرية وفصل GLDAS غير محمّلين له، والصورة من دفتر التحليل.',
 decl:'انخفاض',incr:'ارتفاع',axis:'سم من الماء بعد إزالة الموسمية',hint:'حرّك المؤشر فوق الرسم لقراءة القيم. الخطوط السميكة هي اتجاه سين.',
 maptitle:'الخريطة: اضغط على منطقة',maplegend:'اللون = اتجاه إجمالي المياه المخزنة من GRACE (سم/سنة): أحمر انخفاض، أزرق ارتفاع. المستطيلات هي نطاقات التحليل وليست الحدود الدقيقة.',
 mapfail:'تعذّر تحميل الخريطة. القوائم المنسدلة تعمل.',credit:'واجهة الخريطة مستوحاة من geemap / leafmap (Qiusheng Wu, MIT). بيانات الخريطة: مساهمو OpenStreetMap.',
 pper:'سجل GRACE، أبريل 2002 إلى سبتمبر 2026',
 periodtxt:(a,b,n,g)=>`اتجاه GRACE: من ${a} إلى ${b}. الرسم والقيم المبنية على GLDAS تستخدم الأشهر المشتركة بين المجموعتين (${g} شهرًا، من أبريل 2002 إلى يوليو 2026).`,
 method:'المنهج: تُزال الدورة الموسمية (متوسط كل شهر تقويمي)، ثم يُطبَّق اختبار مان-كندال وميل سين. يعرض الرسم هذه الانحرافات منزوعة الموسمية من المتوسطات الشهرية للمنطقة. قيم p مصحّحة للارتباط الذاتي (هامد-راو). فواصل الثقة، حيث تظهر، هي فواصل سين/كندال التقليدية وغير معدّلة للارتباط الذاتي.',
 mdata:'<bdi dir="ltr">JPL GRACE/GRACE-FO Mascon CRI RL06.3 v04</bdi> و<bdi dir="ltr">GLDAS Noah L4 monthly 0.25 deg V2.1</bdi> <bdi dir="ltr">(NASA GES DISC, DOI 10.5067/SXAVCZFAQLNO)</bdi>',mlab:' البيانات: ',
 rtitle:'ترتيب الدول',rlead:'اتجاه سين لإجمالي المياه المخزنة من GRACE، أبريل 2002 إلى سبتمبر 2026، الأكثر انخفاضًا أولًا. اضغط على صف لفتحه أعلاه.',
 rk:'#',rc:'الدولة',rt:'الاتجاه (سم/سنة)',rp:'p (مصحّحة)',rn:'ملاحظة',
 rising:(l)=>`${l} تُظهر ارتفاعًا في إجمالي المياه المخزنة، لا انخفاضًا. يعرض الترتيب الاتجاه كما قيس.`,
 risingnote:'إجمالي المياه المخزنة في GRACE يشمل كل المياه المخزنة، وليس المياه الجوفية وحدها.'}};
Object.assign(S.en,{
 lyr:'Layer',l_storage:'Storage (GRACE, GLDAS)',l_imerg:'Rain (IMERG)',l_ndvi:'Greenness (NDVI)',
 subbox:'Saudi area box',nodata:'This layer is not loaded for the selected area. It is available for:',
 pc:'p (corrected, Hamed-Rao)',pk:'p (classic Mann-Kendall)',rec:'Record',mo:'months',trend:'Trend',
 up:'rising',down:'declining',flat:'no clear trend',
 anomax:'Monthly anomaly (seasonal cycle removed)',ctxhint:'Move over the chart to read values. The thick line is the Sen trend.',
 ctxnote:'Context layer: it shows what happened alongside the storage change. It is correlation, not proof of pumping. Series are monthly regional means; the chart shows deseasonalized anomalies and the trend uses the same method as the storage layer.',
 srcl:'Source',aboutsat:'About the satellites and datasets',
 open:'Open in dashboard',
 h_rain_up:(a,v,p)=>`Rain in ${a} is rising slightly: ${v} mm per month each year (p = ${p}).`,
 h_rain_dn:(a,v,p)=>`Rain in ${a} is falling: ${v} mm per month each year (p = ${p}).`,
 h_rain_fl:(a,v,p)=>`No clear rain trend in ${a}: ${v} mm per month each year (p = ${p}, not statistically significant).`,
 h_rain_x:'Rainfall shows no significant decline in this record, so a drier climate is not what the data show.',
 h_rain_xd:'The rainfall record does not explain a storage decline.',
 h_gr_up:(a,v,p)=>`Vegetation in ${a} is greening: NDVI ${v} per year (p = ${p}).`,
 h_gr_dn:(a,v,p)=>`Vegetation in ${a} is declining: NDVI ${v} per year (p = ${p}).`,
 h_gr_fl:(a,v,p)=>`No clear greening trend in ${a}: NDVI ${v} per year (p = ${p}, not statistically significant).`,
 h_gr_x:'Greening while stored water declines is consistent with irrigation, not proof of it.',
 h_gr_y:'Greening is context only. It does not show where the water comes from.',
 h_st:(a,d,v,sg)=>`Total water storage in ${a} is ${d} by about ${v} cm per year (${sg}).`,
 ndvi_u:'NDVI per year',rain_u:'mm/month per year'});
Object.assign(S.ar,{
 lyr:'الطبقة',l_storage:'التخزين (GRACE وGLDAS)',l_imerg:'الأمطار (IMERG)',l_ndvi:'الاخضرار (NDVI)',
 subbox:'نطاق المنطقة في السعودية',nodata:'هذه الطبقة غير محمّلة للمنطقة المختارة. وهي متاحة لـ:',
 pc:'قيمة p (مصحّحة، هامد-راو)',pk:'قيمة p (مان-كندال التقليدية)',rec:'السجل',mo:'شهرًا',trend:'الاتجاه',
 up:'ارتفاع',down:'انخفاض',flat:'لا اتجاه واضحًا',
 anomax:'الانحراف الشهري (بعد إزالة الدورة الموسمية)',ctxhint:'حرّك المؤشر فوق الرسم لقراءة القيم. الخط السميك هو اتجاه سين.',
 ctxnote:'طبقة سياقية: تُظهر ما حدث بالتزامن مع تغيّر التخزين. هي ارتباط وليست دليلًا على الضخ. السلاسل متوسطات شهرية للمنطقة، ويعرض الرسم الانحرافات بعد إزالة الموسمية، والاتجاه بالمنهج نفسه المستخدم لطبقة التخزين.',
 srcl:'المصدر',aboutsat:'عن الأقمار الصناعية ومجموعات البيانات',
 open:'افتح في لوحة البيانات',
 h_rain_up:(a,v,p)=>`الأمطار في ${a} ترتفع قليلًا: ${v} ملم في الشهر كل سنة (p = ${p}).`,
 h_rain_dn:(a,v,p)=>`الأمطار في ${a} تتراجع: ${v} ملم في الشهر كل سنة (p = ${p}).`,
 h_rain_fl:(a,v,p)=>`لا اتجاه واضحًا للأمطار في ${a}: ${v} ملم في الشهر كل سنة (p = ${p}، غير دالّ إحصائيًا).`,
 h_rain_x:'لا يظهر في هذا السجل انخفاض دالّ في الأمطار، فلا تدل البيانات على مناخ أكثر جفافًا.',
 h_rain_xd:'سجل الأمطار لا يفسّر انخفاض التخزين.',
 h_gr_up:(a,v,p)=>`الغطاء النباتي في ${a} يزداد اخضرارًا: NDVI ${v} في السنة (p = ${p}).`,
 h_gr_dn:(a,v,p)=>`الغطاء النباتي في ${a} يتراجع: NDVI ${v} في السنة (p = ${p}).`,
 h_gr_fl:(a,v,p)=>`لا اتجاه واضحًا للاخضرار في ${a}: NDVI ${v} في السنة (p = ${p}، غير دالّ إحصائيًا).`,
 h_gr_x:'الاخضرار مع انخفاض المياه المخزنة ينسجم مع الري، لكنه ليس دليلًا عليه.',
 h_gr_y:'الاخضرار سياق فقط ولا يبيّن مصدر المياه.',
 h_st:(a,d,v,sg)=>`إجمالي المياه المخزنة في ${a} ${d} بنحو ${v} سم كل سنة (${sg}).`,
 ndvi_u:'NDVI في السنة',rain_u:'ملم/شهر في السنة'});
const CL={imerg:{col:'#1b7fb5',dec:3,k:'rain'},ndvi:{col:'#4c9a2a',dec:4,k:'gr'}};
const COL={tws:'#1f4e79',sm:'#2aa764',gw:'#c0392b'};
const NUM=/(\d[\d.,]*-\d[\d.,]*|[-+]?\d[\d.,]*(?:e-?\d+)?)/g;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const f=s=>esc(s).split(NUM).map((x,i)=>i%2?'<span class="num">'+x+'</span>':x).join('');
const st={c:7,r:'whole',l:'storage',on:{tws:true,sm:true,gw:true}};
let MAP=null,LG=null,LANG='en';
function median(a){const b=[...a].sort((x,y)=>x-y),n=b.length;return n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2}
function fmt(v,d){return (v>0?'+':v<0?'-':'')+Math.abs(v).toFixed(d)}
function fp(p){return p===0?'<0.001':p<0.001?p.toExponential(1).replace('e-0','e-'):p.toFixed(3)}
function sc(v){const t=Math.max(-1,Math.min(1,v/1.5));const w=[247,247,247],r=[178,24,43],b=[33,102,172],e=t<0?r:b,a=Math.abs(t);return 'rgb('+w.map((x,i)=>Math.round(x+(e[i]-x)*a)).join(',')+')'}
function lf(cb){if(window.L)return cb(1);if(!document.getElementById('lfcss')){const l=document.createElement('link');l.id='lfcss';l.rel='stylesheet';l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(l)}
 const q=window.__lfq=window.__lfq||[];q.push(cb);if(q.length>1)return;const sc2=document.createElement('script');sc2.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';sc2.onload=()=>q.splice(0).forEach(c=>c(1));sc2.onerror=()=>q.splice(0).forEach(c=>c(0));document.head.appendChild(sc2)}
function nm(o,lang){return o.name[lang]}
function cur(){const D=window.DATA,C=D.countries[st.c];const list=[C.whole].concat(C.regions);let o=st.r==='whole'?C.whole:C.regions.find(r=>r.id===st.r);if(!o){st.r='whole';o=C.whole}return{D,C,o}}
function arrow(v,ar,T,d){return ar?'<span class="num">'+(v<0?'\u25BC ':'\u25B2 ')+Math.abs(v).toFixed(d)+'</span> '+esc(T.cmyr):f(fmt(v,d)+' '+T.cmyr)}
window.initExplorer=function(lang){
 const el=document.getElementById('explorer'); if(!el||!window.DATA)return;
 LANG=lang;const D=window.DATA,T=S[lang],ar=lang==='ar';
 D.countries.forEach(c=>[c.whole].concat(c.regions).forEach(r=>{if(r.series&&!r.months)r.months=D.months}));
 if(MAP){try{MAP.remove()}catch(e){}MAP=null;LG=null}
 el.innerHTML=`<p class="label">${esc(T.title)}</p><h2>${esc(T.title)}</h2><p class="cap">${esc(T.lead)}</p>
 <div class="ctl"><label>${esc(T.country)}<select id="xc"></select></label><label>${esc(T.area)}<select id="xr"></select></label></div>
 <div id="xbadge"></div>
 <div id="xwrap"><div id="xmapw"><div id="xmap" role="application" aria-label="${esc(T.maptitle)}" style="direction:ltr"></div><div class="legend"><span class="lg" style="background:linear-gradient(90deg,${sc(-1.5)},${sc(0)},${sc(1.5)})"></span><span class="num">-1.5</span><span class="num" style="margin-inline-start:auto">+1.5 ${esc(T.cmyr)}</span></div><p class="cap">${esc(T.maplegend)}</p><p class="cap">${esc(T.credit)}</p></div>
 <div id="xbody"></div></div>`;
 const xc=document.getElementById('xc'),xr=document.getElementById('xr');
 xc.innerHTML=D.countries.map((c,i)=>`<option value="${i}">${esc(nm(c,lang))}</option>`).join('');
 xc.onchange=e=>{st.c=+e.target.value;st.r='whole';update()};
 xr.onchange=e=>{st.r=e.target.value;update()};
 lf(ok=>{const mb=document.getElementById('xmap');if(!mb||LANG!==lang)return;if(!ok){document.getElementById('xmapw').innerHTML='<p class="cap">'+esc(T.mapfail)+'</p>';return}
  const mp=L.map(mb,{scrollWheelZoom:false}).setView([25,25],mb.clientWidth<500?2:3);MAP=mp;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:8,attribution:'&copy; OpenStreetMap'}).addTo(mp);
  LG=L.layerGroup().addTo(mp);update()});
 update();
 if(!window.__xr){window.__xr=1;let tm;window.addEventListener('resize',()=>{clearTimeout(tm);tm=setTimeout(()=>{if(window.__lastDraw)window.__lastDraw()},150)})}
};
function drawMap(fit){
 if(!MAP||!LG)return;const T=S[LANG],ar=LANG==='ar',{D,C,o}=cur();LG.clearLayers();
 const area=r=>Math.abs((r.bounds[1][0]-r.bounds[0][0])*(r.bounds[1][1]-r.bounds[0][1]));
 const cs=D.countries.map((c,i)=>({c,i})).sort((a,b)=>area(b.c.whole)-area(a.c.whole));
 const lbl=(r,sv,extra)=>nm(r,LANG)+': '+(ar?'<span class="num">'+(sv<0?'\u25BC ':'\u25B2 ')+Math.abs(sv).toFixed(2)+'</span> '+T.cmyr:fmt(sv,2)+' '+T.cmyr)+(r.approx?' ('+T.approx+')':'');
 cs.forEach(({c,i})=>{const w=c.whole,sv=w.stats.tws.sen,on=i===st.c;
  const rc=L.rectangle(w.bounds,{color:on?'#0c2a2f':'#585254',weight:on?3:.6,opacity:on?1:.45,fillColor:sc(sv),fillOpacity:on?(st.r==='whole'?.55:.18):.15,dashArray:w.approx?'4 3':null}).addTo(LG);
  rc.bindTooltip(lbl(w,sv),{sticky:true});rc.on('click',()=>{st.c=i;st.r='whole';update()})});
 C.regions.forEach(r=>{if(!r.bounds&&!r.box)return;
  let b=r.bounds;if(!b&&r.zone){const B={saq:[[27,37],[32,42.5]],sirhan:[[29,41],[32,44]],ahsa:[[22,48],[26,51]]};b=B[r.id]}if(!b)return;
  const sv=r.stats.tws.sen,on=r.id===st.r;
  const rc=L.rectangle(b,{color:on?'#0c2a2f':'#444',weight:on?3:1,fillColor:sc(sv),fillOpacity:on?.8:.45,dashArray:(r.approx||r.zone)?'4 3':null}).addTo(LG);
  rc.bindTooltip(lbl(r,sv),{sticky:true});rc.on('click',()=>{st.r=r.id;update()})});
 if(fit){const ab=D.countries.map(c=>c.whole.bounds);MAP.fitBounds([[Math.min(...ab.map(b=>b[0][0])),Math.min(...ab.map(b=>b[0][1]))],[Math.max(...ab.map(b=>b[1][0])),Math.max(...ab.map(b=>b[1][1]))]],{padding:[10,10]})}
}
function chart(box,c){
 const W=Math.max(300,box.clientWidth-12||700),H=W<500?260:340,m={l:46,r:12,t:12,b:28};
 const act=c.act,mo=c.mo,n=mo.length;let lo=1e9,hi=-1e9;
 act.forEach(k=>c.ser[k].forEach(v=>{lo=Math.min(lo,v);hi=Math.max(hi,v)}));
 if(!act.length){box.innerHTML='';return}
 const pad=(hi-lo)*.08;lo-=pad;hi+=pad;
 const tt=mo.map(q=>+q.slice(0,4)+(+q.slice(5,7)-.5)/12),t0=tt[0],t1=tt[n-1];const x=i=>m.l+(W-m.l-m.r)*(tt[i]-t0)/(t1-t0),y=v=>m.t+(H-m.t-m.b)*(1-(v-lo)/(hi-lo));
 let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.axis)}" style="width:100%;height:auto;touch-action:pan-y;direction:ltr">`;
 const step=Math.pow(10,Math.floor(Math.log10((hi-lo)/4)));const tk=[1,2,2.5,5,10].map(q=>q*step).find(q=>(hi-lo)/q<=6);
 for(let v=Math.ceil(lo/tk)*tk;v<=hi;v+=tk){s+=`<line x1="${m.l}" x2="${W-m.r}" y1="${y(v)}" y2="${y(v)}" stroke="${Math.abs(v)<1e-9?'#999':'#eae9ea'}"/><text x="${m.l-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="#585254">${(+v.toFixed(5))}</text>`}
 const y0=+mo[0].slice(0,4),y1=+mo[n-1].slice(0,4);
 for(let yr=Math.ceil(y0/4)*4;yr<=y1;yr+=4){const xx=m.l+(W-m.l-m.r)*(yr+.5/12-t0)/(t1-t0);s+=`<text x="${xx}" y="${H-10}" text-anchor="middle" font-size="11" fill="#585254">${yr}</text>`}
 act.forEach(k=>{const v=c.ser[k];s+=`<polyline fill="none" stroke="${c.cols[k]}" stroke-opacity=".45" stroke-width="1.4" points="${v.map((a,i)=>x(i)+','+y(a)).join(' ')}"/>`;
  const sl=c.sl[k],ic=median(v.map((a,i)=>a-sl*(tt[i]-t0)));
  s+=`<line x1="${x(0)}" x2="${x(n-1)}" y1="${y(ic)}" y2="${y(ic+sl*(t1-t0))}" stroke="${c.cols[k]}" stroke-width="3"/>`});
 s+=`<line id="xcur" y1="${m.t}" y2="${H-m.b}" stroke="#251f21" stroke-opacity=".5" visibility="hidden"/></svg>`;
 box.innerHTML=s;box.classList.remove('fx');void box.offsetWidth;box.classList.add('fx');
 const svg=box.querySelector('svg'),cu=svg.querySelector('#xcur'),tip=c.tip;
 function mv(ev){const r=svg.getBoundingClientRect(),px=(ev.clientX-r.left)/r.width*W;const tx=t0+(px-m.l)/(W-m.l-m.r)*(t1-t0);let i=0,bd=1e9;tt.forEach((q,j)=>{const dd=Math.abs(q-tx);if(dd<bd){bd=dd;i=j}});
  cu.setAttribute('x1',x(i));cu.setAttribute('x2',x(i));cu.setAttribute('visibility','visible');
  tip.innerHTML=f(mo[i])+': '+act.map(k=>`<span style="color:${c.cols[k]}">&#9632;</span> ${esc(c.names[k])} <span class="num">${fmt(c.ser[k][i],c.dp||2)}</span>`).join(' &nbsp; ')}
 svg.addEventListener('pointermove',mv);svg.addEventListener('pointerdown',mv);
}
window.openLayer=function(l,opt){const D=window.DATA,CX=window.CTX||{};st.l=l;
 if(l!=='storage'){const k=Object.keys(CX.areas||{});const ok=k.some(a=>{const A=CX.areas[a];return D.countries[st.c].whole.name.en===A.country&&(A.region==='whole'?st.r==='whole':st.r===A.region)});
  if(!ok){const A=CX.areas.Saudi;st.c=D.countries.findIndex(c=>c.whole.name.en===A.country);st.r='whole'}}
 else if(opt&&opt.on){['tws','sm','gw'].forEach(k=>st.on[k]=opt.on.indexOf(k)>=0)}
 update();const e=document.getElementById('explorer');if(e)e.scrollIntoView({behavior:'smooth'})};
function update(){
 const lang=LANG,T=S[lang],ar=lang==='ar',{D,C,o}=cur();
 const xc=document.getElementById('xc'),xr=document.getElementById('xr');if(!xc)return;
 xc.value=st.c;
 xr.innerHTML=`<option value="whole">${esc(T.whole)}</option>`+C.regions.map(r=>`<option value="${r.id}">${esc(nm(r,lang))}${r.zone?'':r.approx?(ar?' (تقريبي)':' (approx.)'):''}</option>`).join('');
 xr.value=st.r;xr.disabled=!C.regions.length;
 const CX=window.CTX||{layers:{}},lids=Object.keys(CX.layers);
 const ckey=oo=>Object.keys(CX.areas||{}).find(k=>CX.areas[k].country===C.whole.name.en&&(CX.areas[k].region==='whole'?oo===C.whole:oo.id===CX.areas[k].region));
 const ck=ckey(o);
 let tabs=`<div class="ltabs" role="tablist" aria-label="${esc(T.lyr)}">`+['storage'].concat(lids).map(id=>`<button type="button" role="tab" class="ltab" data-l="${id}" aria-selected="${st.l===id}">${esc(T['l_'+id])}</button>`).join('')+`</div>`;
 if(st.l!=='storage'&&!CX.layers[st.l])st.l='storage';
 const sub=lids.length&&C.whole.name.en==='Saudi Arabia'?`<div class="chips" role="group" aria-label="${esc(T.subbox)}" style="margin:0 0 14px"><span class="cap" style="margin:0 8px 0 0;align-self:center">${esc(T.subbox)}:</span>`+Object.keys(CX.areas).map(k=>{const a=CX.areas[k],on=k===ck;return `<button type="button" class="chip sbx" data-k="${k}" aria-pressed="${on}" style="${on?'border-color:var(--teal);background:#eaf4f3':''}">${esc(k==='Saudi'?(ar?'السعودية (نطاق)':'Saudi Arabia (box)'):k==='Saq-Disi'?(ar?'الساق / الديسي':'Saq-Disi'):k==='Qassim'?(ar?'القصيم':'Qassim'):(ar?'حائل':'Hail'))}</button>`}).join('')+`</div>`:'';
 document.getElementById('xbadge').innerHTML=tabs+(st.l!=='storage'?sub:'')+(o.approx?`<p class="approx" role="note"><b>${esc(T.approx)}.</b> ${esc(T.approxnote)}</p>`:'');
 document.querySelectorAll('#xbadge .ltab').forEach(b=>b.onclick=()=>{st.l=b.dataset.l;update()});
 document.querySelectorAll('#xbadge .sbx').forEach(b=>b.onclick=()=>{const a=CX.areas[b.dataset.k];st.r=a.region;update()});
 if(st.l!=='storage'){
  const LM=CX.layers[st.l],CC=CL[st.l],D0=LM.data[ck];
  if(!D0){document.getElementById('xbody').innerHTML=`<p class="cap">${esc(T.nodata)}</p><div class="chips">`+Object.keys(CX.areas).map(k=>`<button type="button" class="chip" data-k="${k}">${esc(k==='Saudi'?(ar?'السعودية (نطاق)':'Saudi Arabia (box)'):k)}</button>`).join('')+`</div>`;
   document.querySelectorAll('#xbody .chip').forEach(b=>b.onclick=()=>{const a=CX.areas[b.dataset.k];st.c=D.countries.findIndex(c=>c.whole.name.en===a.country);st.r=a.region;update()});drawMap(false);return}
  const sx=D0.stats,sg=sx.p<=0.05,up=sx.sen>0,nmA=nm(o,lang),dec=CC.dec;
  const hv=ar?(up?'':'-')+Math.abs(sx.sen).toFixed(dec):fmt(sx.sen,dec),hp=sx.p<0.001?'<0.001':sx.p.toFixed(2);
  const hk=CC.k==='rain'?'h_rain_':'h_gr_';
  let head=T[hk+(!sg?'fl':up?'up':'dn')](nmA,hv,hp),extra='';
  if(CC.k==='rain')extra=(sg&&!up)?T.h_rain_xd:T.h_rain_x;
  else{const tws=o.stats&&o.stats.tws;extra=(sg&&up&&tws&&tws.sen<0)?T.h_gr_x:T.h_gr_y}
  const un=CC.k==='rain'?T.rain_u:T.ndvi_u,col=CC.col;
  const st2=T[(!sg?'flat':up?'up':'down')];
  const ln=LM.name?LM.name[lang]:T['l_'+st.l];
  let h2=`<div class="head"><p class="hl"><b>${f(head)}</b></p><p class="cap" style="margin-top:6px">${f(extra)}</p></div>
  <div id="xchart" class="chart"></div><p class="cap" id="xtip">${esc(T.ctxhint)}</p>
  <div class="cards"><div class="card" style="--c:${col}"><div class="cn">${esc(T.trend)}</div><div class="cv">${ar?'<span class="num">'+(up?'\u25B2 ':'\u25BC ')+Math.abs(sx.sen).toFixed(dec)+'</span> ':f(fmt(sx.sen,dec)+' ')}${esc(un)}</div><div class="cd">${esc(st2)}<br>${esc(T.pc)}: <span class="num">${fp(sx.p)}</span><br>${esc(T.pk)}: <span class="num">${fp(sx.pmk)}</span><br>${esc(T.rec)}: <span class="num">${sx.start}</span> ${ar?'إلى':'to'} <span class="num">${sx.end}</span> (<span class="num">${sx.n}</span> ${esc(T.mo)})</div></div></div>
  <div class="warn" style="margin-top:12px"><p style="margin:0">${esc(T.ctxnote)}</p></div>
  <p class="cap" style="margin-top:12px">${esc(T.srcl)}: <bdi dir="ltr">${esc(window.CTX.sources[st.l]||'')}</bdi>. <a href="#sats">${esc(T.aboutsat)}</a></p>`;
  if(o.approx)h2+='';
  document.getElementById('xbody').innerHTML=h2;
  const drawC=()=>{window.__lastDraw=drawC;const box=document.getElementById('xchart');if(!box)return;chart(box,{mo:D0.months,ser:{c:D0.a},sl:{c:sx.sen},cols:{c:col},names:{c:ln},act:['c'],axis:T.anomax,tip:document.getElementById('xtip'),dp:CC.dec+1})};
  drawC();drawMap(false);
  if(MAP){const b=o.bounds||(st.r==='whole'?C.whole.bounds:null);if(b)MAP.fitBounds(b,{padding:[40,40],maxZoom:6})}
  window.initRanking&&window.initRanking(lang);return}
 const keys=o.series?['tws','sm','gw']:['tws'];
 let h='';
 if(o.series){
  h+=`<div class="chips" role="group" aria-label="${esc(T.show)}">${keys.map(k=>`<label class="chip" style="--c:${COL[k]}"><input type="checkbox" data-k="${k}"${st.on[k]?' checked':''}><span class="sw" style="background:${COL[k]}"></span>${esc(T[k])}</label>`).join('')}</div>
  <div id="xchart" class="chart"></div><p class="cap" id="xtip">${esc(T.hint)}</p>`;
 } else {
  h+=`<p class="cap">${esc(T.zonenote)}</p><figure><img src="${(window.IM||{})[o.image]||''}" alt="${esc(nm(o,lang))}"></figure>`;
 }
 {const s0=o.stats.tws,sg0=s0.p!=null?(s0.p>0.05?T.nsig:T.sig):'';const hv0=ar?Math.abs(s0.sen).toFixed(2):Math.abs(s0.sen).toFixed(2);h='<div class="head"><p class="hl"><b>'+f(T.h_st(nm(o,lang),s0.sen<0?T.decl:T.incr,hv0,sg0||T.pper))+'</b></p></div>'+h}
 h+=`<div class="cards">`+keys.map(k=>{const s=o.stats[k];if(!s)return'';const dir=s.sen<0?T.decl:T.incr;
  let line2='';if(k==='tws'&&s.p!=null&&!s.ci){line2=`<br>${esc(T.pcorr)}: <span class="num">${fp(s.p)}</span><br>${esc(s.p>0.05?T.nsig:T.sig)}<br>(${esc(T.pper)})`}
  else if(s.ci){line2=`<br>95% CI: ${ar?'<span class="num">['+s.ci[0]+' , '+s.ci[1]+']</span>':f(s.ci[0]+' to '+s.ci[1])}<br>${esc(T.pcorr)}: <span class="num">${s.p}</span><br>${esc(ar?'الفاصل غير معدّل للارتباط الذاتي':'CI not autocorrelation-adjusted')}`}
  return `<div class="card" style="--c:${COL[k]}"><div class="cn">${esc(T[k])}</div><div class="cv">${arrow(s.sen,ar,T,2)}</div><div class="cd">${esc(dir)}${line2}</div></div>`}).join('')+`</div>`;
 const gr=D.period_grace.replace(' to ',ar?' إلى ':' to ');
 if(o.series){const a=D.months[0],b=D.months[D.months.length-1];h+=`<p class="cap">${T.periodtxt(f(D.period_grace.split(' ')[0]),f(D.period_grace.split(' ')[2]),f(String(261)),f(String(D.months.length)))}</p>`}
 else h+=`<p class="cap">${esc(T.period)}: ${f(o.period.replace(' to ',ar?' إلى ':' to '))} (${f(String(o.n))} ${esc(T.months)}). ${o.box?f(o.box):''}</p>`;
 if(o.series)h+=`<div class="warn"><p style="margin:0">${esc(T.derived)}</p></div>`;
 h+=`<div class="warn" style="margin-top:10px"><p style="margin:0">${esc(T.res)}</p></div><p class="cap" style="margin-top:12px">${f(T.method)}${esc(T.mlab)}${T.mdata}.</p>`;
 document.getElementById('xbody').innerHTML=h;
 document.querySelectorAll('#xbody input[data-k]').forEach(i=>i.onchange=()=>{st.on[i.dataset.k]=i.checked;draw()});
 function draw(){
  if(!o.series)return;window.__lastDraw=draw;
  const box=document.getElementById('xchart');if(!box)return;
  chart(box,{mo:o.months,ser:o.series,sl:{tws:o.stats.tws.sen,sm:o.stats.sm.sen,gw:o.stats.gw.sen},cols:COL,names:{tws:T.tws,sm:T.sm,gw:T.gw},act:keys.filter(k=>st.on[k]),axis:T.axis,tip:document.getElementById('xtip'),dp:2});
 }
 draw();
 const cd=document.querySelector('#xbody .cards');if(cd){cd.classList.remove('fx');void cd.offsetWidth;cd.classList.add('fx')}
 drawMap(false);
 if(MAP){const b=o.bounds||(o.zone?null:null);if(b&&st.r!=='whole')MAP.fitBounds(b,{padding:[40,40],maxZoom:6});else if(st.r==='whole')MAP.fitBounds(C.whole.bounds,{padding:[30,30],maxZoom:6})}
 window.initRanking&&window.initRanking(lang);
}
window.initRanking=function(lang){
 const el=document.getElementById('ranking');if(!el||!window.DATA)return;
 const T=S[lang],ar=lang==='ar',D=window.DATA;
 const rows=D.countries.map((c,i)=>({c,i,s:c.whole.stats.tws})).sort((a,b)=>a.s.sen-b.s.sen);
 const rs=rows.filter(r=>r.s.sen>0&&r.s.p<=0.05).map(r=>nm(r.c,lang));
 const join=a=>a.length>1?a.slice(0,-1).join(ar?'، ':', ')+(ar?' و':' and ')+a[a.length-1]:a.join('');
 el.innerHTML=`<p class="label">${esc(T.rtitle)}</p><h2>${esc(T.rtitle)}</h2><p class="cap">${esc(T.rlead)}</p>
 ${rs.length?`<div class="warn" style="margin:10px 0"><p style="margin:0"><b>${esc(T.rising(join(rs)))}</b> ${esc(T.risingnote)}</p></div>`:''}
 <div class="tw"><table class="rk"><thead><tr><th>${T.rk}</th><th>${esc(T.rc)}</th><th>${esc(T.rt)}</th><th>${esc(T.rp)}</th><th>${esc(T.rn)}</th></tr></thead><tbody>`+
 rows.map((r,k)=>{const note=(r.c.whole.approx?T.approx+'. ':'')+(r.s.p>0.05?T.nsig:'');
  return `<tr tabindex="0" role="button" data-i="${r.i}" class="${r.s.sen>0?'up':''}"><td><span class="num">${k+1}</span></td><td>${esc(nm(r.c,lang))}</td><td>${arrow(r.s.sen,ar,{cmyr:''},2)}</td><td><span class="num">${fp(r.s.p)}</span></td><td>${esc(note)}</td></tr>`}).join('')+`</tbody></table></div>`;
 el.querySelectorAll('tr[data-i]').forEach(tr=>{const go=()=>{st.c=+tr.dataset.i;st.r='whole';update();document.getElementById('explorer').scrollIntoView({behavior:'smooth'})};tr.onclick=go;tr.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
};
})();
