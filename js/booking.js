// Customers must be signed in (same behaviour as the Django version)
if (!GlamourAuth.current()) { location.replace('index.html?login_required=1'); }
// ================================================================
// DJANGO DATA
// ================================================================

// All categories + services from Django
const CATEGORIES = [
    
    
    {
        key: "Hair Services",
        services: [
            
            { id: 1, name: "Signature Haircut \u0026 Styling", price: 800, duration: 45 },
            
            { id: 2, name: "Hair Colour \u0026 Highlights", price: 3500, duration: 120 },
            
            { id: 3, name: "Keratin Smoothing Treatment", price: 5500, duration: 150 },
            
        ]
    },
    
    {
        key: "Makeup",
        services: [
            
            { id: 4, name: "Party Makeup", price: 2500, duration: 60 },
            
            { id: 5, name: "HD Makeup", price: 3500, duration: 75 },
            
            { id: 6, name: "Engagement Makeup", price: 4500, duration: 90 },
            
        ]
    },
    
    {
        key: "Skin Care",
        services: [
            
            { id: 7, name: "Gold Radiance Facial", price: 2200, duration: 60 },
            
            { id: 8, name: "Hydrafacial Glow", price: 3800, duration: 60 },
            
            { id: 9, name: "De\u002DTan Clean\u002DUp", price: 1200, duration: 40 },
            
        ]
    },
    
    {
        key: "Nail Care",
        services: [
            
            { id: 10, name: "Gel Manicure", price: 900, duration: 45 },
            
            { id: 11, name: "Luxury Pedicure", price: 1100, duration: 60 },
            
            { id: 12, name: "Nail Art \u0026 Extensions", price: 1800, duration: 90 },
            
        ]
    },
    
    {
        key: "Spa &amp; Massage",
        services: [
            
            { id: 13, name: "Aromatherapy Massage", price: 2800, duration: 60 },
            
            { id: 14, name: "Deep Tissue Massage", price: 3200, duration: 60 },
            
            { id: 15, name: "Body Polishing Ritual", price: 4000, duration: 90 },
            
        ]
    },
    
    {
        key: "Bridal Packages",
        services: [
            
            { id: 16, name: "Bridal Makeup Package", price: 25000, duration: 240 },
            
            { id: 17, name: "Pre\u002DBridal Glow Package", price: 18000, duration: 180 },
            
            { id: 18, name: "Engagement Glam Package", price: 12000, duration: 150 },
            
        ]
    },
    
];
// Quick lookup map
const CAT_MAP = {};
CATEGORIES.forEach(c => { CAT_MAP[c.key] = c.services; });

const LOGGED_CUSTOMER = (function () {
    const c = GlamourAuth.current();
    return c ? { id: c.id, name: c.full_name, mobile: c.mobile, email: c.email || '' } : { id: '', name: '', mobile: '', email: '' };
})();

// ================================================================
// GLOBAL STATE
// ================================================================
let bookingFor    = 'myself';
let someoneType   = 'existing';
let foundCustomer = null;
let blockCounter  = 0;

// Map: blockId → { catKey, selectedSvcs: Map<svcId,svc>, empCache: Map<svcId,[]> }
const catBlocks = new Map();

document.getElementById('appointmentDate').min = new Date().toISOString().split('T')[0];

// ── INIT ─────────────────────────────────────────────────────────
(function init() {
    setBookingFor('myself');
    addCatBlock();          // first block on load
})();

// ================================================================
// FOR WHOM
// ================================================================
function setBookingFor(val) {
    bookingFor = val;
    document.getElementById('hiddenBookingFor').value = val;
    document.getElementById('btnMyself').classList.toggle('active',  val === 'myself');
    document.getElementById('btnSomeone').classList.toggle('active', val === 'someone');
    if (val === 'myself') {
        document.getElementById('someoneTypeRow').classList.remove('visible');
        document.getElementById('existingSearchBox').classList.remove('visible');
        autoFillMyself();
    } else {
        document.getElementById('someoneTypeRow').classList.add('visible');
        clearCustFields(); clearAutoBanner();
        setSomeoneType(someoneType);
    }
}

function setSomeoneType(t) {
    someoneType = t;
    document.getElementById('hiddenCustomerType').value = t;
    document.getElementById('btnExisting').classList.toggle('active', t === 'existing');
    document.getElementById('btnNew').classList.toggle('active',      t === 'new');
    if (t === 'existing') {
        document.getElementById('existingSearchBox').classList.add('visible');
        clearCustFields(); clearAutoBanner(); foundCustomer = null; setRO(true);
    } else {
        document.getElementById('existingSearchBox').classList.remove('visible');
        clearCustFields(); clearAutoBanner(); foundCustomer = null; setRO(false);
    }
}

function autoFillMyself() {
    if (LOGGED_CUSTOMER.id) {
        document.getElementById('fieldFullName').value    = LOGGED_CUSTOMER.name;
        document.getElementById('fieldMobile').value      = LOGGED_CUSTOMER.mobile;
        document.getElementById('fieldEmail').value       = LOGGED_CUSTOMER.email;
        document.getElementById('hiddenCustomerId').value = LOGGED_CUSTOMER.id;
        setRO(true);
        showBanner('Details filled from your profile.');
    } else { setRO(false); }
}

// ================================================================
// CUSTOMER SEARCH
// ================================================================
function searchCustomer() {
    const mobile = document.getElementById('searchMobileInput').value.trim();
    const card   = document.getElementById('searchResultCard');
    const nf     = document.getElementById('searchNotFound');
    card.classList.remove('visible'); nf.classList.remove('visible');

    if (!/^\d{10}$/.test(mobile)) {
        nf.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i> Please enter a valid 10-digit mobile number.';
        nf.classList.add('visible'); return;
    }
    const btn = document.getElementById('searchBtn');
    btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';

    GlamourAPI.searchCustomer(mobile)
        .then(data => {
            btn.disabled = false; btn.innerHTML = '<i class="bi bi-search me-1"></i> Find';
            if (data.found) {
                foundCustomer = data.customer;
                document.getElementById('hiddenCustomerId').value = data.customer.id;
                document.getElementById('fieldFullName').value    = data.customer.name;
                document.getElementById('fieldMobile').value      = data.customer.mobile;
                document.getElementById('fieldEmail').value       = data.customer.email || '';
                setRO(true);
                document.getElementById('searchResultAvatar').textContent = data.customer.name.charAt(0).toUpperCase();
                document.getElementById('searchResultName').textContent   = data.customer.name;
                document.getElementById('searchResultSub').textContent    = data.customer.mobile + (data.customer.email ? ' · ' + data.customer.email : '');
                card.classList.add('visible');
                showBanner('Customer found and details filled automatically.');
            } else {
                foundCustomer = null;
                nf.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i> No customer found. Switch to "New Person" to add them.';
                nf.classList.add('visible'); clearCustFields(); clearAutoBanner();
            }
        })
        .catch(() => {
            btn.disabled = false; btn.innerHTML = '<i class="bi bi-search me-1"></i> Find';
            nf.innerHTML = '<i class="bi bi-wifi-off me-1"></i> Network error. Please try again.';
            nf.classList.add('visible');
        });
}

document.getElementById('searchMobileInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); searchCustomer(); }
});

function clearCustomerSearch() {
    foundCustomer = null;
    document.getElementById('hiddenCustomerId').value = '';
    document.getElementById('searchResultCard').classList.remove('visible');
    document.getElementById('searchNotFound').classList.remove('visible');
    document.getElementById('searchMobileInput').value = '';
    clearCustFields(); clearAutoBanner();
}

function clearCustFields() {
    ['fieldFullName','fieldMobile','fieldEmail'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('hiddenCustomerId').value = '';
}
function setRO(ro) {
    ['fieldFullName','fieldMobile','fieldEmail'].forEach(id => {
        const el = document.getElementById(id);
        ro ? el.setAttribute('readonly', true) : el.removeAttribute('readonly');
    });
}
function showBanner(msg) {
    document.getElementById('autofilledMsg').textContent = msg;
    document.getElementById('autofilledBanner').classList.add('visible');
}
function clearAutoBanner() {
    document.getElementById('autofilledBanner').classList.remove('visible');
}

// ================================================================
// ADD CATEGORY BLOCK
// ================================================================
function addCatBlock() {
    const bid = ++blockCounter;
    catBlocks.set(bid, { catKey: null, selectedSvcs: new Map(), empCache: new Map() });

    // Build category <option> list
    let opts = '<option value="">— Choose a Category —</option>';
    CATEGORIES.forEach(c => { opts += `<option value="${c.key}">${c.key}</option>`; });

    const wrap = document.getElementById('categoryBlocksWrap');
    const el   = document.createElement('div');
    el.className    = 'cat-block';
    el.dataset.bid  = bid;
    el.innerHTML = `
        <div class="cat-block-header">
            <div class="cat-block-num" id="cbn_${bid}">${bid}</div>
            <span class="cat-block-lbl" id="cbl_${bid}">Category ${bid}</span>
            ${bid > 1 ? `<button type="button" class="cat-block-remove" onclick="removeCatBlock(${bid})"><i class="bi bi-x-lg"></i></button>` : ''}
        </div>
        <div class="cat-block-body">
            <!-- Category dropdown -->
            <select class="form-control-glamour cat-sel" id="catSel_${bid}" onchange="onCatChange(${bid}, this.value)">
                ${opts}
            </select>
            <!-- Service cards (hidden until cat selected) -->
            <div id="svcWrap_${bid}" style="display:none;">
                <div class="form-label-glamour" style="margin-bottom:8px;">
                    Select Services
                    <span style="color:rgba(247,231,206,0.38);font-size:0.6rem;letter-spacing:1px;">(multiple allowed)</span>
                </div>
                <div class="svc-cards-grid" id="svcGrid_${bid}"></div>
                <div class="svc-pill" id="svcPill_${bid}"></div>
            </div>
            <!-- Employee rows (shown when services selected) -->
            <div id="empWrap_${bid}" style="display:none;">
                <span class="emp-section-label">Assign Expert Per Service</span>
                <div id="empRows_${bid}"></div>
            </div>
        </div>
    `;
    wrap.appendChild(el);
    renumberBlocks();
}

// ================================================================
// REMOVE CATEGORY BLOCK
// ================================================================
function removeCatBlock(bid) {
    catBlocks.delete(bid);
    const el = document.querySelector(`.cat-block[data-bid="${bid}"]`);
    if (el) {
        el.style.opacity = '0'; el.style.transform = 'translateY(-4px)';
        setTimeout(() => { el.remove(); renumberBlocks(); updateGrandSummary(); }, 200);
    }
}

function renumberBlocks() {
    document.querySelectorAll('.cat-block').forEach((el, i) => {
        const bid = el.dataset.bid;
        const num = document.getElementById(`cbn_${bid}`);
        const lbl = document.getElementById(`cbl_${bid}`);
        if (num) num.textContent = i + 1;
        if (lbl) lbl.textContent = `Category ${i + 1}`;
    });
}

// ================================================================
// CATEGORY CHANGE → render service cards
// ================================================================
function onCatChange(bid, catKey) {
    const state = catBlocks.get(bid);
    if (!state) return;

    // Reset block
    state.catKey = catKey;
    state.selectedSvcs.clear();
    state.empCache.clear();

    const svcWrap = document.getElementById(`svcWrap_${bid}`);
    const empWrap = document.getElementById(`empWrap_${bid}`);
    const svcGrid = document.getElementById(`svcGrid_${bid}`);
    const empRows = document.getElementById(`empRows_${bid}`);
    const pill    = document.getElementById(`svcPill_${bid}`);

    empRows.innerHTML = ''; empWrap.style.display = 'none';
    pill.classList.remove('visible');

    if (!catKey) { svcWrap.style.display = 'none'; updateGrandSummary(); return; }

    const svcs = CAT_MAP[catKey] || [];
    svcGrid.innerHTML = '';
    svcWrap.style.display = 'block';

    if (svcs.length === 0) {
        svcGrid.innerHTML = '<div class="svc-empty"><i class="bi bi-slash-circle me-2"></i>No services in this category</div>';
        updateGrandSummary(); return;
    }

    svcs.forEach(svc => {
        const card = document.createElement('div');
        card.className = 'svc-card';
        card.innerHTML = `
            <div class="svc-card-check"><i class="bi bi-check"></i></div>
            <div class="svc-card-name">${svc.name}</div>
            <div class="svc-card-meta">
                <span class="svc-card-price">₹${svc.price}</span>
                <span class="svc-card-dur"><i class="bi bi-clock"></i>${svc.duration} min</span>
            </div>
        `;
        card.addEventListener('click', () => toggleSvc(bid, card, svc));
        svcGrid.appendChild(card);
    });

    updateGrandSummary();
}

// ================================================================
// TOGGLE SERVICE CARD
// ================================================================
function toggleSvc(bid, card, svc) {
    const state = catBlocks.get(bid);
    if (!state) return;

    if (state.selectedSvcs.has(svc.id)) {
        state.selectedSvcs.delete(svc.id);
        card.classList.remove('selected');
        // Remove emp row
        const r = document.getElementById(`er_${bid}_${svc.id}`);
        if (r) r.remove();
    } else {
        state.selectedSvcs.set(svc.id, svc);
        card.classList.add('selected');
        addEmpRow(bid, svc);
    }

    const empWrap = document.getElementById(`empWrap_${bid}`);
    empWrap.style.display = state.selectedSvcs.size > 0 ? 'block' : 'none';

    updatePill(bid);
    updateGrandSummary();
}

// ================================================================
// EMP ROW
// ================================================================
function addEmpRow(bid, svc) {
    const empRows = document.getElementById(`empRows_${bid}`);
    const rowId   = `er_${bid}_${svc.id}`;
    if (document.getElementById(rowId)) return;

    const row = document.createElement('div');
    row.className = 'emp-row'; row.id = rowId;
    row.innerHTML = `
        <div class="emp-row-label">
            <div class="emp-row-dot"></div>
            <span class="emp-row-svcname">${svc.name}</span>
            <span class="emp-row-price" id="erp_${bid}_${svc.id}">₹${svc.price}</span>
        </div>
        <select class="form-control-glamour" id="es_${bid}_${svc.id}" onchange="onEmpChange(${bid},${svc.id})" disabled>
            <option value="">Loading experts…</option>
        </select>
        <div id="esl_${bid}_${svc.id}" style="display:none;font-size:0.75rem;color:var(--rose-gold);margin-top:5px;">
            <span class="spinner-border spinner-border-sm me-1"></span> Loading…
        </div>
    `;
    empRows.appendChild(row);
    loadEmps(bid, svc.id, svc.price);
}

function loadEmps(bid, svcId, basePrice) {
    const state = catBlocks.get(bid);
    if (!state) return;
    if (state.empCache.has(svcId)) { fillEmpSel(bid, svcId, state.empCache.get(svcId)); return; }

    const loader = document.getElementById(`esl_${bid}_${svcId}`);
    if (loader) loader.style.display = 'block';

    GlamourAPI.employees(svcId)
        .then(data => {
            if (loader) loader.style.display = 'none';
            const emps = data.employees || [];
            state.empCache.set(svcId, emps);
            fillEmpSel(bid, svcId, emps);
        })
        .catch(() => {
            if (loader) loader.style.display = 'none';
            const sel = document.getElementById(`es_${bid}_${svcId}`);
            if (sel) sel.innerHTML = '<option value="">Could not load experts</option>';
        });
}

function fillEmpSel(bid, svcId, emps) {
    const sel = document.getElementById(`es_${bid}_${svcId}`);
    if (!sel) return;
    if (emps.length === 0) { sel.innerHTML = '<option value="">Any available expert</option>'; sel.disabled = true; return; }
    sel.innerHTML = '<option value="">— Select an Expert —</option>';
    emps.forEach(emp => {
        const o = document.createElement('option');
        o.value = emp.id; o.dataset.price = emp.price; o.dataset.name = emp.name;
        o.textContent = `${emp.name} — ${emp.expertise} (₹${emp.price})`;
        sel.appendChild(o);
    });
    sel.disabled = false;
}

function onEmpChange(bid, svcId) {
    const sel = document.getElementById(`es_${bid}_${svcId}`);
    const opt = sel.options[sel.selectedIndex];
    if (opt && opt.dataset.price) {
        const tag = document.getElementById(`erp_${bid}_${svcId}`);
        if (tag) tag.textContent = `₹${opt.dataset.price}`;
    }
    updateGrandSummary();
}

function updatePill(bid) {
    const state = catBlocks.get(bid);
    const pill  = document.getElementById(`svcPill_${bid}`);
    if (!state || !pill) return;
    const n = state.selectedSvcs.size;
    if (n === 0) { pill.classList.remove('visible'); return; }
    pill.textContent = n === 1 ? '1 service selected' : `${n} services selected`;
    pill.classList.add('visible');
}

// ================================================================
// GRAND SUMMARY
// ================================================================
function updateGrandSummary() {
    const summary = document.getElementById('grandSummary');
    const rowsEl  = document.getElementById('grandSummaryRows');
    const amtEl   = document.getElementById('gtAmt');
    const durEl   = document.getElementById('gtDur');

    let total = 0, dur = 0, html = '', any = false;

    catBlocks.forEach((state, bid) => {
        state.selectedSvcs.forEach((svc, svcId) => {
            any = true;
            const sel = document.getElementById(`es_${bid}_${svcId}`);
            let price = parseFloat(svc.price), emp = '—';
            if (sel) {
                const o = sel.options[sel.selectedIndex];
                if (o && o.dataset.price) price = parseFloat(o.dataset.price);
                if (o && o.dataset.name)  emp   = o.dataset.name;
            }
            total += price; dur += svc.duration;
            html += `
                <div class="gs-row">
                    <div>
                        <div class="gs-name">${svc.name}</div>
                        <div class="gs-sub"><i class="bi bi-clock me-1"></i>${svc.duration} min · ${emp}</div>
                    </div>
                    <div class="gs-price">₹${price}</div>
                </div>`;
        });
    });

    if (!any) { summary.classList.remove('visible'); return; }
    rowsEl.innerHTML = html;
    amtEl.textContent = total;
    durEl.textContent = `Est. ${dur} min total`;
    summary.classList.add('visible');
}

// ================================================================
// FORM SUBMIT
// ================================================================
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const err = document.getElementById('formErrorMsg');
    err.style.display = 'none';
    const fd = new FormData(this);

    // Customer checks
    if (!fd.get('full_name') || !fd.get('mobile')) {
        err.textContent = 'Customer name and mobile number are required.';
        err.style.display = 'block'; return;
    }
    if (!/^\d{10}$/.test(fd.get('mobile'))) {
        err.textContent = 'Please enter a valid 10-digit mobile number.';
        err.style.display = 'block'; return;
    }
    if (bookingFor === 'someone' && someoneType === 'existing' && !foundCustomer) {
        err.textContent = 'Please search and select an existing customer first.';
        err.style.display = 'block'; return;
    }

    // Collect services
    let totalSvcs = 0, missingEmp = false;
    catBlocks.forEach((state, bid) => {
        state.selectedSvcs.forEach((svc, svcId) => {
            totalSvcs++;
            const sel = document.getElementById(`es_${bid}_${svcId}`);
            if (sel && !sel.disabled && !sel.value) missingEmp = true;
            fd.append('service_ids[]',  svcId);
            fd.append('employee_ids[]', sel ? (sel.value || '') : '');
        });
    });

    if (totalSvcs === 0) {
        err.textContent = 'Please select at least one service.';
        err.style.display = 'block'; return;
    }
    if (missingEmp) {
        err.textContent = 'Please select an expert for each service.';
        err.style.display = 'block'; return;
    }
    if (!fd.get('appointment_date') || !fd.get('appointment_time')) {
        err.textContent = 'Please select appointment date and time.';
        err.style.display = 'block'; return;
    }

    const btn = this.querySelector('button[type="submit"]');
    btn.innerHTML = '<span><span class="spinner-border spinner-border-sm me-2"></span>Booking...</span>';
    btn.disabled  = true;

    GlamourAPI.submitBooking(fd)
    .then(resp => {
        if (resp.success) {
            populateSuccessModal(resp.appointment_id);
            new bootstrap.Modal(document.getElementById('successModal')).show();
        } else if (resp.login_required) {
            window.location.href = 'index.html?login_required=1';
        } else {
            err.textContent = resp.error || 'Something went wrong. Please try again.';
            err.style.display = 'block';
            btn.innerHTML = '<span>Confirm My Appointment</span>'; btn.disabled = false;
        }
    })
    .catch(() => {
        err.textContent = 'Network error. Please try again.';
        err.style.display = 'block';
        btn.innerHTML = '<span>Confirm My Appointment</span>'; btn.disabled = false;
    });
});

// ================================================================
// SUCCESS MODAL
// ================================================================
function populateSuccessModal(aptId) {
    document.getElementById('aptIdDisplay').textContent = aptId;
    let total = 0, html = '';
    catBlocks.forEach((state, bid) => {
        state.selectedSvcs.forEach((svc, svcId) => {
            const sel = document.getElementById(`es_${bid}_${svcId}`);
            let price = parseFloat(svc.price), emp = 'Any available expert';
            if (sel) {
                const o = sel.options[sel.selectedIndex];
                if (o && o.dataset.price) price = parseFloat(o.dataset.price);
                if (o && o.value && o.dataset.name) emp = o.dataset.name;
            }
            total += price;
            html += `
                <div class="ss-item">
                    <div><div class="ss-item-name">${svc.name}</div><div class="ss-item-emp"><i class="bi bi-person me-1"></i>${emp}</div></div>
                    <div class="ss-item-price">₹${price}</div>
                </div>`;
        });
    });
    document.getElementById('successServicesBody').innerHTML = html;
    document.getElementById('successTotalAmt').textContent   = total;
}
