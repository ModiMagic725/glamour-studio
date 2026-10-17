/* =====================================================================
   Glamour Studio — data + local "backend" (replaces Django views)
   Everything is stored in the browser (localStorage). For a real site,
   swap the GlamourAuth / GlamourAPI methods with calls to your server.
   ===================================================================== */
const GLAMOUR_DATA = {
    services:  [{"id": 1, "name": "Signature Haircut & Styling", "category": "hair", "price": 800}, {"id": 2, "name": "Hair Colour & Highlights", "category": "hair", "price": 3500}, {"id": 3, "name": "Keratin Smoothing Treatment", "category": "hair", "price": 5500}, {"id": 4, "name": "Party Makeup", "category": "makeup", "price": 2500}, {"id": 5, "name": "HD Makeup", "category": "makeup", "price": 3500}, {"id": 6, "name": "Engagement Makeup", "category": "makeup", "price": 4500}, {"id": 7, "name": "Gold Radiance Facial", "category": "skin", "price": 2200}, {"id": 8, "name": "Hydrafacial Glow", "category": "skin", "price": 3800}, {"id": 9, "name": "De-Tan Clean-Up", "category": "skin", "price": 1200}, {"id": 10, "name": "Gel Manicure", "category": "nails", "price": 900}, {"id": 11, "name": "Luxury Pedicure", "category": "nails", "price": 1100}, {"id": 12, "name": "Nail Art & Extensions", "category": "nails", "price": 1800}, {"id": 13, "name": "Aromatherapy Massage", "category": "spa", "price": 2800}, {"id": 14, "name": "Deep Tissue Massage", "category": "spa", "price": 3200}, {"id": 15, "name": "Body Polishing Ritual", "category": "spa", "price": 4000}, {"id": 16, "name": "Bridal Makeup Package", "category": "bridal", "price": 25000}, {"id": 17, "name": "Pre-Bridal Glow Package", "category": "bridal", "price": 18000}, {"id": 18, "name": "Engagement Glam Package", "category": "bridal", "price": 12000}],
    employees: [{"id": 1, "name": "Ananya Mehta", "role": "senior_stylist", "expertise": "Senior Stylist", "extra": 300}, {"id": 2, "name": "Rohan Kapoor", "role": "senior_stylist", "expertise": "Senior Stylist", "extra": 200}, {"id": 3, "name": "Kavya Nair", "role": "hair_colorist", "expertise": "Hair Colorist", "extra": 200}, {"id": 4, "name": "Simran Kaur", "role": "makeup_artist", "expertise": "Makeup Artist", "extra": 300}, {"id": 5, "name": "Neha Verma", "role": "bridal_specialist", "expertise": "Bridal Specialist", "extra": 500}, {"id": 6, "name": "Pooja Iyer", "role": "skin_therapist", "expertise": "Skin Therapist", "extra": 200}, {"id": 7, "name": "Isha Malhotra", "role": "nail_artist", "expertise": "Nail Artist", "extra": 100}, {"id": 8, "name": "Meera Joshi", "role": "spa_therapist", "expertise": "Spa Therapist", "extra": 200}],
    roleCats:  {"hair": ["senior_stylist", "hair_colorist"], "makeup": ["makeup_artist", "bridal_specialist"], "skin": ["skin_therapist"], "nails": ["nail_artist"], "spa": ["spa_therapist"], "bridal": ["bridal_specialist", "makeup_artist"]}
};

const GlamourStore = {
    get(key, fallback) {
        try { const v = JSON.parse(localStorage.getItem(key)); return v === null ? fallback : v; }
        catch (e) { return fallback; }
    },
    set(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
    },
    remove(key) { try { localStorage.removeItem(key); } catch (e) {} }
};

const GlamourAuth = {
    customers() { return GlamourStore.get('glamour_customers', []); },
    current() {
        const id = GlamourStore.get('glamour_session', null);
        return this.customers().find(c => c.id === id) || null;
    },
    login(mobile, password) {
        return Promise.resolve().then(() => {
            if (!/^\d{10}$/.test(mobile)) return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
            const c = this.customers().find(x => x.mobile === mobile);
            if (!c || c.password !== password) return { success: false, error: 'Mobile number ya password galat hai.' };
            GlamourStore.set('glamour_session', c.id);
            return { success: true, customer_name: c.full_name };
        });
    },
    register(d) {
        return Promise.resolve().then(() => {
            if (!/^\d{10}$/.test(d.mobile)) return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
            if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return { success: false, error: 'Please enter a valid email address.' };
            if (d.password.length < 6) return { success: false, error: 'Password kam se kam 6 characters ka hona chahiye.' };
            if (d.password !== d.confirm_password) return { success: false, error: 'Dono passwords match nahi karte.' };
            const list = this.customers();
            if (list.some(c => c.mobile === d.mobile)) return { success: false, error: 'Is mobile number se account pehle se hai. Sign in karein.' };
            const c = { id: 'C' + Date.now(), full_name: d.full_name, mobile: d.mobile, email: d.email || '', password: d.password };
            list.push(c);
            GlamourStore.set('glamour_customers', list);
            GlamourStore.set('glamour_session', c.id);
            return { success: true, customer_name: c.full_name };
        });
    },
    logout() { GlamourStore.remove('glamour_session'); }
};

const GlamourAPI = {
    /* Experts who can perform a service (was: ajax_employees) */
    employees(serviceId) {
        const svc = GLAMOUR_DATA.services.find(s => s.id === Number(serviceId));
        const roles = svc ? (GLAMOUR_DATA.roleCats[svc.category] || []) : [];
        const list = GLAMOUR_DATA.employees.filter(e => roles.includes(e.role)).map(e => ({
            id: e.id, name: e.name, expertise: e.expertise, price: svc.price + e.extra
        }));
        return Promise.resolve({ employees: list });
    },
    /* Find a registered customer by mobile (was: ajax_customer_search) */
    searchCustomer(mobile) {
        const c = GlamourAuth.customers().find(x => x.mobile === mobile);
        return Promise.resolve(c
            ? { found: true, customer: { id: c.id, name: c.full_name, mobile: c.mobile, email: c.email } }
            : { found: false });
    },
    bookings() {
        const me = GlamourAuth.current();
        return me ? GlamourStore.get('glamour_bookings', []).filter(b => b.owner_id === me.id) : [];
    },
    bills() {
        const me = GlamourAuth.current();
        return me ? GlamourStore.get('glamour_bills', []).filter(b => b.owner_id === me.id) : [];
    },
    /* Save a booking (was: POST to the booking view) */
    submitBooking(fd) {
        return Promise.resolve().then(() => {
            const me = GlamourAuth.current();
            if (!me) return { login_required: true };
            const ids = fd.getAll('service_ids[]'), emps = fd.getAll('employee_ids[]');
            const items = ids.map((sid, i) => {
                const s = GLAMOUR_DATA.services.find(x => x.id === Number(sid));
                const e = GLAMOUR_DATA.employees.find(x => x.id === Number(emps[i]));
                return { service_name: s ? s.name : 'Service', employee: e ? e.name : 'Any available expert', price: s ? s.price + (e ? e.extra : 0) : 0 };
            });
            if (!items.length) return { success: false, error: 'Please select at least one service.' };
            const seq = GlamourStore.get('glamour_apt_seq', 0) + 1;
            GlamourStore.set('glamour_apt_seq', seq);
            const aptId = 'APT-' + String(seq).padStart(4, '0');
            const list = GlamourStore.get('glamour_bookings', []);
            list.unshift({
                appointment_id: aptId, owner_id: me.id,
                customer_name: fd.get('full_name'), customer_mobile: fd.get('mobile'),
                appointment_date: fd.get('appointment_date'), appointment_time: fd.get('appointment_time'),
                booking_type: 'Website Booking', status: 'pending', items: items,
                total_amount: items.reduce((t, i) => t + i.price, 0),
                advance_paid: Number(fd.get('advance_paid')) || 0,
                special_notes: fd.get('special_notes') || ''
            });
            if (!GlamourStore.set('glamour_bookings', list)) return { success: false, error: 'Could not save booking in this browser.' };
            return { success: true, appointment_id: aptId };
        });
    }
};
