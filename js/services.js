// ══════════════════════════════════════════════════════════════
// 1. DJANGO DATA
// ══════════════════════════════════════════════════════════════
const ALL_SERVICES = [
    {
        id:    1,
        name:  `Signature Haircut \u0026 Styling`,
        cat:   `hair`,
        cLbl:  `Hair Services`,
        desc:  `A personalised cut and blow\u002Ddry designed around your face shape, hair texture and lifestyle by our senior stylists.`,
        price: `800`,
        dur:   `45`,
        img:   `https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&amp;q=80`
    },{
        id:    2,
        name:  `Hair Colour \u0026 Highlights`,
        cat:   `hair`,
        cLbl:  `Hair Services`,
        desc:  `Balayage, global colour and highlights using premium ammonia\u002Dfree colour for rich, dimensional, long\u002Dlasting shine.`,
        price: `3500`,
        dur:   `120`,
        img:   `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&amp;q=80`
    },{
        id:    3,
        name:  `Keratin Smoothing Treatment`,
        cat:   `hair`,
        cLbl:  `Hair Services`,
        desc:  `A smoothing treatment that tames frizz, restores softness and leaves hair silky and manageable for months.`,
        price: `5500`,
        dur:   `150`,
        img:   `https://images.unsplash.com/photo-1470259078422-826894b933aa?w=700&amp;q=80`
    },{
        id:    4,
        name:  `Party Makeup`,
        cat:   `makeup`,
        cLbl:  `Makeup`,
        desc:  `Flawless glam for parties and celebrations, using long\u002Dwear, skin\u002Dfriendly products tailored to your outfit.`,
        price: `2500`,
        dur:   `60`,
        img:   `https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=700&amp;q=80`
    },{
        id:    5,
        name:  `HD Makeup`,
        cat:   `makeup`,
        cLbl:  `Makeup`,
        desc:  `Camera\u002Dready, high\u002Ddefinition makeup with an airbrushed finish that stays fresh through photos and long events.`,
        price: `3500`,
        dur:   `75`,
        img:   `https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=700&amp;q=80`
    },{
        id:    6,
        name:  `Engagement Makeup`,
        cat:   `makeup`,
        cLbl:  `Makeup`,
        desc:  `A soft, radiant look crafted for your engagement day, blending elegance with your personal style.`,
        price: `4500`,
        dur:   `90`,
        img:   `https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&amp;q=80`
    },{
        id:    7,
        name:  `Gold Radiance Facial`,
        cat:   `skin`,
        cLbl:  `Skin Care`,
        desc:  `A luxurious 24K gold facial that deeply nourishes, brightens and revives dull, tired skin.`,
        price: `2200`,
        dur:   `60`,
        img:   `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&amp;q=80`
    },{
        id:    8,
        name:  `Hydrafacial Glow`,
        cat:   `skin`,
        cLbl:  `Skin Care`,
        desc:  `Cleanse, exfoliate and hydrate in one session for instantly smoother, plumper, glowing skin.`,
        price: `3800`,
        dur:   `60`,
        img:   `https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&amp;q=80`
    },{
        id:    9,
        name:  `De\u002DTan Clean\u002DUp`,
        cat:   `skin`,
        cLbl:  `Skin Care`,
        desc:  `A quick refresh that removes tan and impurities, leaving skin clear, even\u002Dtoned and bright.`,
        price: `1200`,
        dur:   `40`,
        img:   `https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=700&amp;q=80`
    },{
        id:    10,
        name:  `Gel Manicure`,
        cat:   `nails`,
        cLbl:  `Nail Care`,
        desc:  `Chip\u002Dfree gel polish with careful nail shaping and cuticle care for a glossy, lasting finish.`,
        price: `900`,
        dur:   `45`,
        img:   `https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&amp;q=80`
    },{
        id:    11,
        name:  `Luxury Pedicure`,
        cat:   `nails`,
        cLbl:  `Nail Care`,
        desc:  `A soothing foot soak, scrub, massage and polish that leaves your feet soft and beautifully groomed.`,
        price: `1100`,
        dur:   `60`,
        img:   `https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=700&amp;q=80`
    },{
        id:    12,
        name:  `Nail Art \u0026 Extensions`,
        cat:   `nails`,
        cLbl:  `Nail Care`,
        desc:  `Custom nail extensions and hand\u002Dpainted art, from minimal chic to statement designs.`,
        price: `1800`,
        dur:   `90`,
        img:   `https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=700&amp;q=80`
    },{
        id:    13,
        name:  `Aromatherapy Massage`,
        cat:   `spa`,
        cLbl:  `Spa \u0026 Massage`,
        desc:  `A calming full\u002Dbody massage with essential oils to melt away stress and restore balance.`,
        price: `2800`,
        dur:   `60`,
        img:   `https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&amp;q=80`
    },{
        id:    14,
        name:  `Deep Tissue Massage`,
        cat:   `spa`,
        cLbl:  `Spa \u0026 Massage`,
        desc:  `Firm, targeted pressure that releases muscle tension and knots, ideal after long, busy weeks.`,
        price: `3200`,
        dur:   `60`,
        img:   `https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&amp;q=80`
    },{
        id:    15,
        name:  `Body Polishing Ritual`,
        cat:   `spa`,
        cLbl:  `Spa \u0026 Massage`,
        desc:  `An indulgent scrub, wrap and moisturising ritual that leaves skin velvety smooth and glowing.`,
        price: `4000`,
        dur:   `90`,
        img:   `https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=700&amp;q=80`
    },{
        id:    16,
        name:  `Bridal Makeup Package`,
        cat:   `bridal`,
        cLbl:  `Bridal Packages`,
        desc:  `Complete bridal makeup, hair styling and draping for your big day, with a trial session included.`,
        price: `25000`,
        dur:   `240`,
        img:   `https://images.unsplash.com/photo-1595476479599-a83c23cf5c14?w=700&amp;q=80`
    },{
        id:    17,
        name:  `Pre\u002DBridal Glow Package`,
        cat:   `bridal`,
        cLbl:  `Bridal Packages`,
        desc:  `A curated pre\u002Dwedding programme of facials, hair spa and body care for radiant skin on the day.`,
        price: `18000`,
        dur:   `180`,
        img:   `https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&amp;q=80`
    },{
        id:    18,
        name:  `Engagement Glam Package`,
        cat:   `bridal`,
        cLbl:  `Bridal Packages`,
        desc:  `Makeup, hairstyling and finishing touches for a picture\u002Dperfect engagement celebration.`,
        price: `12000`,
        dur:   `150`,
        img:   `https://images.unsplash.com/photo-1597327898046-b5de74e8a19a?w=700&amp;q=80`
    },
];

const CATEGORIES = [{val:`hair`,label:`Hair Services`},{val:`makeup`,label:`Makeup`},{val:`skin`,label:`Skin Care`},{val:`nails`,label:`Nail Care`},{val:`spa`,label:`Spa \u0026 Massage`},{val:`bridal`,label:`Bridal Packages`},];

const META = {
    hair:   { icon:'✂', desc:'From cuts to colour — every strand crafted with expert precision and premium products.', img:'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80' },
    makeup: { icon:'✦', desc:'From everyday glow to bridal perfection — every face is a canvas, every look is a masterpiece.', img:'https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=700&q=80' },
    skin:   { icon:'◈', desc:'Glow-boosting facials and treatments for every skin type, using medical-grade products.', img:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80' },
    nails:  { icon:'◆', desc:'Precision nail care, vibrant gel colours and artistic nail designs that last.', img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=80' },
    spa:    { icon:'❋', desc:'Surrender to serenity — holistic therapies that restore body, mind and soul.', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&q=80' },
    bridal: { icon:'♔', desc:'Complete bridal beauty journeys, from pre-wedding glow prep to walking down the aisle.', img:'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=700&q=80' },
};

function esc(s){ return String(s).replace(/`/g,"'").replace(/\\/g,'\\\\'); }

// ══════════════════════════════════════════════════════════════
// 2. PAGE BUILDERS
// ══════════════════════════════════════════════════════════════

/* ── Cover left ── */
function pgCover(){
    const total = ALL_SERVICES.length;
    return `<div class="pg pg-cover">
        <div class="cover-watermark">G</div>
        <div class="cover-ornament">✦ ✦ ✦</div>
        <div class="cover-title">SERVICE</div>
        <div class="cover-brand">LOOKBOOK</div>
        <div class="cover-sub">Where Beauty Meets Perfection</div>
        <div class="cover-line"></div>
        <div class="cover-stats">
            <div><span class="cover-stat-val">${total}+</span><span class="cover-stat-lbl">Services</span></div>
            <div><span class="cover-stat-val">10+</span><span class="cover-stat-lbl">Years</span></div>
            <div><span class="cover-stat-val">1200+</span><span class="cover-stat-lbl">Clients</span></div>
        </div>
        <span class="pg-num pg-num-l">01</span>
    </div>`;
}

/* ── Chapter index (TOC) — right page of cover spread ── */
function pgIndex(){
    const rows = CATEGORIES.map((c,i)=>{
        const m   = META[c.val] || {icon:'✦'};
        const cnt = ALL_SERVICES.filter(s=>s.cat===c.val).length;
        const spreadIdx = 1 + i*2; // spread number this chapter opens at
        return `<div class="ch-index-item" onclick="bkJumpToSpread(${spreadIdx+1})">
            <span class="ch-icon">${m.icon}</span>
            <span class="ch-num-pill">${String(i+1).padStart(2,'0')}</span>
            <span class="ch-index-name">${esc(c.label)}</span>
            <span class="ch-index-count">${cnt} services</span>
            <span class="ch-index-arrow">›</span>
        </div>`;
    }).join('');

    return `<div class="pg pg-index">
        <div class="pg-index-header">
            <span class="pg-index-label">What We Offer</span>
            <div class="pg-index-title">Our Chapters</div>
        </div>
        ${rows}
        <span class="pg-num pg-num-r">02</span>
    </div>`;
}

/* ── Chapter divider (left page, alternates dark/light) ── */
function pgChapterDivider(num, cat, pgN){
    const m    = META[cat.val] || {icon:'✦', desc:''};
    const svcs = ALL_SERVICES.filter(s=>s.cat===cat.val);
    const cls  = num%2===0 ? 'pg-ch-light' : 'pg-ch-dark';
    return `<div class="pg ${cls}">
        <div class="ch-wm">${String(num).padStart(2,'0')}</div>
        <div class="ch-label">Chapter ${num}</div>
        <div class="ch-icon-big">${m.icon}</div>
        <div class="ch-title">${esc(cat.label)}</div>
        <div class="ch-divider"></div>
        <p class="ch-desc">${esc(m.desc)}</p>
        <div class="ch-count">${svcs.length} Signature Services</div>
        <span class="pg-num pg-num-l">${pgN}</span>
    </div>`;
}

/* ── Image intro right page ── */
function pgImgIntro(cat, pgN){
    const m = META[cat.val] || {};
    return `<div class="pg pg-img-split">
        <img src="${m.img||''}" alt="${esc(cat.label)}" loading="lazy">
        <div class="pg-img-split-overlay"></div>
        <div class="pg-img-split-body">
            <span class="svc-cat-tag">${esc(cat.label)} · Signature Collection</span>
            <div class="svc-title" style="font-size:clamp(.95rem,1.8vw,1.15rem);">${esc(cat.label)} Services</div>
            <p style="font-size:.72rem;color:var(--text-mid);line-height:1.75;margin:0;">${esc(m.desc||'')}</p>
        </div>
        <span class="pg-num pg-num-r">${pgN}</span>
    </div>`;
}

/* ── Service detail page ── */
function pgService(svc, pgN, variant){
    const cls = variant==='cream' ? 'pg-svc-cream' : 'pg-svc-white';
    // Up to 4 dummy highlights (real ones would come from DB; here we generate from desc)
    const words   = esc(svc.desc).split(' ');
    const snippet = words.slice(0,18).join(' ') + (words.length>18?'…':'');

    return `<div class="pg pg-svc ${cls}">
        <span class="svc-cat-tag">${esc(svc.cLbl)}</span>
        <div class="svc-title">${esc(svc.name)}</div>
        <div class="svc-divider"></div>
        <p class="svc-desc">${snippet}</p>
        <ul class="svc-hl">
            <li>Professional consultation included</li>
            <li>Premium certified products used</li>
            <li>Expert stylist / therapist assigned</li>
            <li>${esc(svc.dur)}-minute dedicated session</li>
        </ul>
        <div class="svc-footer">
            <div>
                <span class="svc-price-lbl">Starting From</span>
                <span class="svc-price-val">₹${esc(svc.price)}</span>
            </div>
            <div class="svc-dur-wrap">
                <span class="svc-dur-lbl">Duration</span>
                <span class="svc-dur-val">${esc(svc.dur)} min</span>
            </div>
            <button class="svc-book-btn"
                onclick="openServiceModal(${svc.id},'${esc(svc.name)}','${esc(svc.desc)}','${esc(svc.price)}','${esc(svc.dur)}')">
                Details
            </button>
        </div>
        <span class="pg-num ${pgN%2===0?'pg-num-l':'pg-num-r'}">${pgN}</span>
    </div>`;
}

/* ── Back cover ── */
function pgBackCover(){
    return `<div class="pg pg-back">
        <div class="cover-watermark" style="color:rgba(247,231,206,.03);">★</div>
        <div class="cover-ornament">✦</div>
        <div style="font-family:var(--font-deco);font-size:clamp(1.2rem,2.5vw,1.8rem);color:var(--champagne);letter-spacing:7px;margin-bottom:14px;position:relative;z-index:1;">GLAMOUR</div>
        <div style="font-family:var(--font-serif);font-style:italic;font-size:clamp(.82rem,1.4vw,.96rem);color:rgba(196,139,159,.65);margin-bottom:22px;position:relative;z-index:1;">Where Beauty Meets Perfection</div>
        <div class="cover-line"></div>
        <div style="font-size:.62rem;letter-spacing:2px;color:rgba(247,231,206,.35);line-height:2.2;position:relative;z-index:1;">
            123, Glamour Street, Bandra West<br>
            Mumbai – 400050 · Mon–Sat 10AM–8PM<br>
            +91 98765 43210
        </div>
        <div style="font-size:.66rem;letter-spacing:3px;color:var(--rose-gold);margin-top:16px;position:relative;z-index:1;">glamourstudio.in</div>
    </div>`;
}

/* ── Empty chapter placeholder ── */
function pgEmpty(label){
    return `<div class="pg pg-svc pg-svc-white" style="display:flex;align-items:center;justify-content:center;text-align:center;">
        <div>
            <div style="font-size:2rem;color:var(--rose-gold);margin-bottom:12px;">✂</div>
            <p style="font-size:.82rem;color:var(--text-mid);">No ${esc(label)} services added yet.</p>
        </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════════
// 3. ASSEMBLE ALL PAGES
//    Layout:
//    0  Cover (left)         1  Index/TOC (right)
//    2  Ch1 divider (left)   3  Ch1 img   (right)
//    4  Svc 1 (left)         5  Svc 2 (right)
//    6  Svc 3 (left) …etc
//    (then next chapter, and so on until back cover)
// ══════════════════════════════════════════════════════════════
const PAGES = [];
let globalPgN = 1;

PAGES.push(pgCover());          // 0
PAGES.push(pgIndex());          // 1
globalPgN = 3;

CATEGORIES.forEach((cat, idx)=>{
    const svcs = ALL_SERVICES.filter(s=>s.cat===cat.val);
    const chNum = idx+1;

    PAGES.push(pgChapterDivider(chNum, cat, globalPgN));   globalPgN++;
    PAGES.push(pgImgIntro(cat, globalPgN));                globalPgN++;

    if(!svcs.length){
        PAGES.push(pgEmpty(cat.label)); globalPgN++;
        PAGES.push(`<div class="pg" style="background:#faf6f2;"></div>`); globalPgN++;
    } else {
        svcs.forEach((svc,i)=>{
            PAGES.push(pgService(svc, globalPgN, i%2===0?'white':'cream'));
            globalPgN++;
        });
    }

    // Pad to even page count within chapter (so chapters always start on left)
    if(PAGES.length % 2 !== 0){
        // filler right page with ornament
        PAGES.push(`<div class="pg" style="background:${idx%2===0?'#f7e7ce':'#faf6f2'};display:flex;align-items:center;justify-content:center;">
            <div style="text-align:center;opacity:.25;">
                <div style="font-family:var(--font-deco);font-size:4rem;color:var(--plum);">${META[cat.val]?.icon||'✦'}</div>
            </div>
        </div>`);
        globalPgN++;
    }
});

// Back cover (must be last 2)
if(PAGES.length%2!==0){
    PAGES.push(`<div class="pg" style="background:#faf6f2;"></div>`);
}
PAGES.push(`<div class="pg" style="background:#1e0818;display:flex;align-items:center;justify-content:center;"><div style="text-align:center;opacity:.15;font-family:var(--font-deco);font-size:5rem;color:var(--champagne);">G</div></div>`);
PAGES.push(pgBackCover());

// ══════════════════════════════════════════════════════════════
// 4. BOOK ENGINE  (exact same math as original standalone)
// ══════════════════════════════════════════════════════════════
const book       = document.getElementById('book');
const bkFlap     = document.getElementById('bkFlap');
const bkFlapC    = document.getElementById('bkFlapContent');
const bkFoldG    = document.getElementById('bkFoldGradient');

const bk = {
    W:0, H:0, PW:0, SX:0, diag:0,
    li: 0,                 // leftIndex
    side:null, corner:null,
    drag:false,
    TH: 90,                // corner threshold px
};

// ── resize ──
function bkResize(){
    const r=book.getBoundingClientRect();
    bk.W=r.width; bk.H=r.height;
    bk.PW=r.width/2; bk.SX=bk.PW;
    bk.diag=Math.sqrt(bk.PW**2+bk.H**2);
    if(!bk.drag) bkRender();
}
new ResizeObserver(bkResize).observe(book);

// ── render ──
function bkRender(){
    const lf=document.getElementById('bk-left-front');
    const rf=document.getElementById('bk-right-front');
    lf.innerHTML = PAGES[bk.li]   ||'';
    rf.innerHTML = PAGES[bk.li+1] ||'';
    lf.style.display = bk.li<0          ?'none':'';
    rf.style.display = bk.li+1>=PAGES.length?'none':'';
    bkUpdateUI();
}
bkRender();

// ── UI ──
function bkUpdateUI(){
    document.getElementById('bkPrevBtn').disabled = bk.li<=0;
    document.getElementById('bkNextBtn').disabled = bk.li+1>=PAGES.length-1;
    const total=Math.ceil(PAGES.length/2);
    const cur  =Math.floor(bk.li/2)+1;
    document.getElementById('bkSpreadTxt').textContent=`${cur} / ${total}`;
    document.querySelectorAll('.bk-dot').forEach((d,i)=>d.classList.toggle('active',i===Math.floor(bk.li/2)));
}
function bkBuildDots(){
    const el=document.getElementById('bkDots'); el.innerHTML='';
    const n=Math.ceil(PAGES.length/2);
    for(let i=0;i<n;i++){
        const d=document.createElement('div');
        d.className='bk-dot'+(i===0?' active':'');
        d.title=`Spread ${i+1}`;
        d.onclick=(()=>{const idx=i;return()=>{if(!bk.drag){bk.li=idx*2;bkRender();}};})();
        el.appendChild(d);
    }
}
bkBuildDots();

// ── jump to spread (used by TOC) ──
function bkJumpToSpread(spreadIdx){
    const targetLi = spreadIdx*2;
    if(bk.drag||targetLi===bk.li) return;
    const forward = targetLi > bk.li;
    // Show quick turn then jump
    bkAnimChapter(forward, ()=>{ bk.li=targetLi; bkRender(); });
}

// ── clip math ──
function clipPoly(pts,a,b,c,keep){
    let r=[];
    for(let i=0;i<pts.length;i++){
        let p1=pts[i],p2=pts[(i+1)%pts.length];
        let d1=a*p1[0]+b*p1[1]+c,d2=a*p2[0]+b*p2[1]+c;
        let in1=keep?d1<=0:d1>0,in2=keep?d2<=0:d2>0;
        if(in1)r.push(p1);
        if(in1!==in2){let t=d1/(d1-d2);r.push([p1[0]+t*(p2[0]-p1[0]),p1[1]+t*(p2[1]-p1[1])]);}
    }return r;
}
function refPt(p,a,b,c){let d=(a*p[0]+b*p[1]+c)/(a*a+b*b);return[p[0]-2*d*a,p[1]-2*d*b];}
function toCP(pts){if(!pts.length)return'polygon(0 0)';return'polygon('+pts.map(p=>`${p[0]}px ${p[1]}px`).join(',')+')';}
function constrPt(mx,my){
    const{PW,H,diag,corner:ac}=bk;
    for(let i=0;i<3;i++){
        let dx=mx-bk.SX,dy=my-ac[1],d=Math.sqrt(dx*dx+dy*dy);
        if(d>PW){mx=bk.SX+(dx/d)*PW;my=ac[1]+(dy/d)*PW;}
        let c2y=ac[1]===0?H:0,dx2=mx-bk.SX,dy2=my-c2y,d2=Math.sqrt(dx2*dx2+dy2*dy2);
        if(d2>diag){mx=bk.SX+(dx2/d2)*diag;my=c2y+(dy2/d2)*diag;}
    }return[mx,my];
}

// ── fold ──
function fold(X,Y){
    if(X===bk.corner[0]&&Y===bk.corner[1])return;
    const{W,H,PW,corner:AC,side}=bk;
    let[mx,my]=constrPt(X,Y);
    const fp=document.getElementById(`bk-${side}-front`);
    let a=AC[0]-mx,b=AC[1]-my,midx=(AC[0]+mx)/2,midy=(AC[1]+my)/2,c=-(a*midx+b*midy);
    let base,p1f,p2f,shX;
    if(side==='right'){base=[[PW,0],[PW,H],[W,H],[W,0]];p1f=[W,0];p2f=[PW,0];shX=PW;}
    else{base=[[0,0],[0,H],[PW,H],[PW,0]];p1f=[PW,0];p2f=[0,0];shX=0;}
    fp.style.clipPath=toCP(clipPoly(base,a,b,c,true).map(p=>[p[0]-shX,p[1]]));
    bkFlap.style.clipPath=toCP(clipPoly(base,a,b,c,false).map(p=>refPt(p,a,b,c)));
    let p1r=refPt(p1f,a,b,c),p2r=refPt(p2f,a,b,c);
    let ang=Math.atan2(p2r[1]-p1r[1],p2r[0]-p1r[0]);
    bkFlapC.style.transformOrigin='0 0';
    bkFlapC.style.transform=`translate(${p1r[0]}px,${p1r[1]}px) rotate(${ang}rad)`;
    let angG=Math.atan2(my-AC[1],mx-AC[0]);
    bkFoldG.style.transform=`translate(${midx}px,${midy}px) rotate(${angG}rad)`;
    bkFoldG.style.opacity=Math.sin(Math.abs(mx-AC[0])/W*Math.PI).toFixed(3);
}

// ── start drag ──
function startDrag(side,corner,x,y){
    bk.side=side;bk.corner=corner;bk.drag=true;
    bkFlap.style.display='block';
    if(side==='right'){
        document.getElementById('bk-right-under').innerHTML=PAGES[bk.li+3]||'';
        bkFlapC.innerHTML=PAGES[bk.li+2]||'';
        bkFlapC.className='bk-flap-content is-left';
    }else{
        document.getElementById('bk-left-under').innerHTML=PAGES[bk.li-2]||'';
        bkFlapC.innerHTML=PAGES[bk.li-1]||'';
        bkFlapC.className='bk-flap-content is-right';
    }
    fold(x,y);
}

// ── pointer events ──
book.addEventListener('pointerdown',e=>{
    const r=book.getBoundingClientRect();
    let x=e.clientX-r.left,y=e.clientY-r.top;
    const{W,H,TH,li}=bk;
    book.setPointerCapture(e.pointerId);
    if(x>W-TH&&y<TH    &&li+1<PAGES.length-1) startDrag('right',[W,0],x,y);
    else if(x>W-TH&&y>H-TH&&li+1<PAGES.length-1) startDrag('right',[W,H],x,y);
    else if(x<TH&&y<TH &&li>0)                 startDrag('left',[0,0],x,y);
    else if(x<TH&&y>H-TH&&li>0)                startDrag('left',[0,H],x,y);
});
book.addEventListener('pointermove',e=>{
    if(!bk.drag)return;
    const r=book.getBoundingClientRect();
    fold(e.clientX-r.left,e.clientY-r.top);
});
book.addEventListener('pointerup',e=>{
    if(!bk.drag)return;
    bk.drag=false;
    const r=book.getBoundingClientRect();
    let x=e.clientX-r.left,y=e.clientY-r.top;
    const done=(bk.side==='right'&&x<bk.W/2)||(bk.side==='left'&&x>bk.W/2);
    const tX=done?(bk.side==='right'?0:bk.W):bk.corner[0];
    const tY=bk.corner[1];
    let sX=x,sY=y,t0=performance.now();
    function anim(t){
        let p=Math.min((t-t0)/280,1),ease=1-Math.pow(1-p,3);
        fold(sX+(tX-sX)*ease,sY+(tY-sY)*ease);
        if(p<1){requestAnimationFrame(anim);}
        else{
            bkFlap.style.display='none';
            document.getElementById(`bk-${bk.side}-front`).style.clipPath='none';
            if(done){bk.li+=bk.side==='right'?2:-2;bkRender();}
            bk.side=null;
        }
    }
    requestAnimationFrame(anim);
});
// If the browser takes over for a vertical page scroll, finish the flip cleanly
book.addEventListener('pointercancel',e=>{
    if(!bk.drag)return;
    book.dispatchEvent(new PointerEvent('pointerup',{clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId}));
});

// ── button nav ──
function bkNavNext(){if(bk.drag||bk.li+1>=PAGES.length-1)return;bkTurn('right');}
function bkNavPrev(){if(bk.drag||bk.li<=0)return;bkTurn('left');}
function bkTurn(side){
    const{W,H}=bk;
    const corner=side==='right'?[W,H]:[0,H];
    startDrag(side,corner,corner[0],corner[1]);
    const tX=side==='right'?0:W;
    let sX=corner[0],t0=performance.now();
    bk.drag=true;
    function anim(t){
        let p=Math.min((t-t0)/400,1),ease=1-Math.pow(1-p,3);
        fold(sX+(tX-sX)*ease,H*.5);
        if(p<1){requestAnimationFrame(anim);}
        else{
            bk.drag=false;
            bkFlap.style.display='none';
            document.getElementById(`bk-${bk.side}-front`).style.clipPath='none';
            bk.li+=side==='right'?2:-2;
            bk.side=null;
            bkRender();
        }
    }
    requestAnimationFrame(anim);
}

// ── Chapter jump animation (quick sweep) ──
function bkAnimChapter(forward, cb){
    const{W,H}=bk;
    const side=forward?'right':'left';
    const corner=forward?[W,H]:[0,H];
    const tX=forward?0:W;
    bkFlap.style.display='block';
    // show next chapter's first page on flap
    const nextLi = forward ? Math.min(bk.li+2,PAGES.length-2) : Math.max(bk.li-2,0);
    bkFlapC.innerHTML = PAGES[forward?nextLi:nextLi+1]||'';
    bkFlapC.className = forward?'bk-flap-content is-left':'bk-flap-content is-right';
    bk.side=side; bk.corner=corner;
    let sX=corner[0], t0=performance.now();
    function anim(t){
        let p=Math.min((t-t0)/420,1),ease=1-Math.pow(1-p,3);
        const mx=sX+(tX-sX)*ease,my=H*.5;
        const fp=document.getElementById(`bk-${side}-front`);
        const PW=bk.PW;
        let a=corner[0]-mx,b=corner[1]-my,midx=(corner[0]+mx)/2,midy=(corner[1]+my)/2,c=-(a*midx+b*midy);
        let base,p1f,p2f,shX;
        if(side==='right'){base=[[PW,0],[PW,H],[W,H],[W,0]];p1f=[W,0];p2f=[PW,0];shX=PW;}
        else{base=[[0,0],[0,H],[PW,H],[PW,0]];p1f=[PW,0];p2f=[0,0];shX=0;}
        fp.style.clipPath=toCP(clipPoly(base,a,b,c,true).map(q=>[q[0]-shX,q[1]]));
        bkFlap.style.clipPath=toCP(clipPoly(base,a,b,c,false).map(q=>refPt(q,a,b,c)));
        let p1r=refPt(p1f,a,b,c),p2r=refPt(p2f,a,b,c);
        let ang=Math.atan2(p2r[1]-p1r[1],p2r[0]-p1r[0]);
        bkFlapC.style.transformOrigin='0 0';
        bkFlapC.style.transform=`translate(${p1r[0]}px,${p1r[1]}px) rotate(${ang}rad)`;
        let angG=Math.atan2(my-corner[1],mx-corner[0]);
        bkFoldG.style.transform=`translate(${midx}px,${midy}px) rotate(${angG}rad)`;
        bkFoldG.style.opacity=Math.sin(Math.abs(mx-corner[0])/W*Math.PI).toFixed(3);
        if(p<1){requestAnimationFrame(anim);}
        else{
            bkFlap.style.display='none';
            fp.style.clipPath='none';
            bk.side=null;
            cb();
        }
    }
    requestAnimationFrame(anim);
}

// ══════════════════════════════════════════════════════════════
// 5. SERVICE MODAL (unchanged)
// ══════════════════════════════════════════════════════════════
function openServiceModal(serviceId,name,desc,price,duration){
    document.getElementById('modalServiceName').textContent=name;
    document.getElementById('modalServiceDesc').textContent=desc;
    document.getElementById('modalPrice').textContent=price;
    document.getElementById('modalDuration').textContent=duration;
    document.getElementById('modalBookBtn').href="booking.html?service="+serviceId;
    const el=document.getElementById('expertsList');
    el.innerHTML='<div class="text-center py-4"><div class="spinner-border spinner-border-sm" style="color:var(--rose-gold);"></div><span class="ms-2">Loading experts...</span></div>';
    GlamourAPI.employees(serviceId)
        .then(data=>{
            if(!data.employees.length){
                el.innerHTML='<p style="color:var(--text-mid);font-size:.88rem;padding:12px 0;">All our team members are trained for this service.</p>';
                return;
            }
            el.innerHTML=data.employees.map(emp=>`
                <div class="expert-card">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80" class="expert-avatar" alt="${emp.name}">
                    <div><div class="expert-name">${emp.name}</div><span class="expert-badge">${emp.expertise} Expert</span></div>
                    <div class="expert-price">₹${emp.price}</div>
                </div>`).join('');
        })
        .catch(()=>{el.innerHTML='<p style="color:var(--text-mid);font-size:.88rem;">Could not load expert details.</p>';});
    new bootstrap.Modal(document.getElementById('serviceModal')).show();
}
