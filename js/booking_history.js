// Customers must be signed in (same behaviour as the Django version)
if (!GlamourAuth.current()) { location.replace('index.html?login_required=1'); }
function switchHistoryTab(tab) {
    document.querySelectorAll('.history-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.history-panel').forEach(p => p.classList.remove('active'));
    if (tab === 'appointments') {
        document.getElementById('aptTabBtn').classList.add('active');
        document.getElementById('appointmentsPanel').classList.add('active');
    } else {
        document.getElementById('billTabBtn').classList.add('active');
        document.getElementById('billsPanel').classList.add('active');
    }
}

// ================================================================
// Render bookings & bills from browser storage (was: Django loops)
// ================================================================
(function () {
    const me = GlamourAuth.current();
    if (!me) return;
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const STATUS = { pending: 'Pending', confirmed: 'Confirmed', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' };
    const PAY = { paid: 'Paid', partial: 'Partial', pending: 'Pending' };
    const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const fmtDate = s => { const d = new Date(s + 'T00:00:00'); return isNaN(d) ? esc(s) : DAY[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(); };
    const fmtTime = t => { const m = /^(\d{1,2}):(\d{2})/.exec(t || ''); if (!m || /[ap]m/i.test(t)) return esc(t); let h = +m[1]; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return String(h).padStart(2, '0') + ':' + m[2] + ' ' + ap; };
    const trunc = (s, n) => { const w = String(s).split(/\s+/); return w.length > n ? w.slice(0, n).join(' ') + '…' : s; };

    const apts = GlamourAPI.bookings(), bills = GlamourAPI.bills();
    document.getElementById('hCustInitial').textContent = (me.full_name || '?').charAt(0).toUpperCase();
    document.getElementById('hCustName').textContent = me.full_name;
    document.getElementById('hCustMobile').textContent = me.mobile;
    document.querySelectorAll('.js-apt-count').forEach(e => e.textContent = apts.length);
    document.querySelectorAll('.js-bill-count').forEach(e => e.textContent = bills.length);

    const aptBox = document.getElementById('aptList');
    aptBox.innerHTML = apts.length ? apts.map(a => `
        <div class="apt-card">
            <div class="apt-card-header">
                <span class="apt-id-badge">${esc(a.appointment_id)}</span>
                <span class="apt-date-info"><i class="bi bi-calendar3"></i> ${fmtDate(a.appointment_date)}</span>
                <span class="apt-date-info"><i class="bi bi-clock"></i> ${fmtTime(a.appointment_time)}</span>
                <span class="apt-date-info"><i class="bi bi-bookmark"></i> ${esc(a.booking_type)}</span>
                <span class="apt-status-badge status-${esc(a.status)}">${esc(STATUS[a.status] || a.status)}</span>
            </div>
            <div class="apt-card-body">
                ${(a.items || []).map(i => `
                <div class="apt-service-row">
                    <div class="apt-service-icon"><i class="bi bi-scissors"></i></div>
                    <div><div class="apt-service-name">${esc(i.service_name)}</div><div class="apt-service-by">by ${esc(i.employee)}</div></div>
                    <div class="apt-service-price">₹${esc(i.price)}</div>
                </div>`).join('') || '<p style="font-size:0.85rem; color:var(--text-mid); padding:8px 0;">No services recorded.</p>'}
            </div>
            <div class="apt-card-footer">
                <div class="apt-total"><small>Total Amount</small>₹${esc(a.total_amount)}</div>
                ${a.advance_paid > 0 ? `<div style="font-size:0.8rem; color:var(--text-mid);"><i class="bi bi-check-circle" style="color:#4caf50;"></i> Advance: ₹${esc(a.advance_paid)}</div>` : ''}
                ${a.special_notes ? `<div style="font-size:0.78rem; color:var(--text-mid); margin-left:auto; max-width:240px; text-align:right;"><i class="bi bi-chat-text" style="color:var(--rose-gold);"></i> ${esc(trunc(a.special_notes, 8))}</div>` : ''}
            </div>
        </div>`).join('') : `
        <div class="empty-history">
            <div class="empty-history-icon"><i class="bi bi-calendar-x"></i></div>
            <h3>No Appointments Yet</h3>
            <p>You haven't booked any appointments. Start your glamour journey today!</p>
            <a href="booking.html" class="btn-glamour-primary mt-4" style="font-size:0.7rem; padding:12px 28px;"><span>Book Your First Appointment</span></a>
        </div>`;

    const billBox = document.getElementById('billList');
    billBox.innerHTML = bills.length ? bills.map(b => `
        <div class="bill-card">
            <div class="bill-icon-box"><i class="bi bi-receipt"></i></div>
            <div>
                <div class="bill-id">${esc(b.bill_id)}</div>
                <div class="bill-date">${esc(b.bill_date)}</div>
                <div style="font-size:0.78rem; color:var(--text-mid); margin-top:4px;">${esc(b.item_count)} service${b.item_count == 1 ? '' : 's'} · Apt: ${esc(b.appointment_id)}</div>
            </div>
            <div style="margin-left:auto; display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                <div style="font-size:0.72rem; color:var(--text-mid);">via ${esc(b.payment_method)}</div>
                ${b.discount > 0 ? `<div style="font-size:0.78rem; color:#2e7d32;"><i class="bi bi-tag-fill"></i> Discount: ₹${esc(b.discount)}</div>` : ''}
            </div>
            <div class="bill-amount">
                <div class="bill-amount-num">₹${esc(b.total_amount)}</div>
                <div><span class="bill-payment-badge bill-${esc(b.payment_status)}">${esc(PAY[b.payment_status] || b.payment_status)}</span></div>
                ${b.balance_amount > 0 ? `<div style="font-size:0.72rem; color:#b00020; margin-top:3px;">Balance: ₹${esc(b.balance_amount)}</div>` : ''}
            </div>
        </div>`).join('') : `
        <div class="empty-history">
            <div class="empty-history-icon"><i class="bi bi-receipt"></i></div>
            <h3>No Bills Yet</h3>
            <p>Your billing history will appear here after your first visit.</p>
        </div>`;
})();
