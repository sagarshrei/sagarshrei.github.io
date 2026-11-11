/* Sher Wine Shop: interactions and Google Analytics 4 event tracking */

// true  = demonstration mode: forms send "demo_form_submit" events.
// false = only if you connect a real form service: forms send "generate_lead" and "sign_up".
const DEMO_MODE = true;

// Safe wrapper: the site still works if GA is blocked or the ID is a placeholder.
function track(name, params) {
  if (typeof gtag === 'function') { gtag('event', name, params || {}); }
}

document.addEventListener('DOMContentLoaded', () => {

  /* Age gate (21+) */
  const gate = document.getElementById('age-gate');
  let verified = false;
  try { verified = sessionStorage.getItem('ageOk') === '1'; } catch (e) {}
  if (gate && !verified) {
    gate.hidden = false;
    document.getElementById('age-yes').focus();
    document.getElementById('age-yes').addEventListener('click', () => {
      gate.hidden = true;
      try { sessionStorage.setItem('ageOk', '1'); } catch (e) {}
    });
  }

  /* Mobile menu */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* Call-to-action and social link clicks */
  document.querySelectorAll('[data-cta]').forEach(el =>
    el.addEventListener('click', () => track('cta_click', { cta_name: el.dataset.cta })));
  document.querySelectorAll('[data-social]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); track('social_click', { network: el.dataset.social }); }));

  /* Product filters */
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('#product-grid .card');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    cards.forEach(card => { card.hidden = !(f === 'all' || card.dataset.category === f); });
  }));

  /* Product details + select_item event */
  const dlg = document.getElementById('detail');
  document.querySelectorAll('.card .btn[data-id]').forEach(btn => btn.addEventListener('click', () => {
    const d = btn.dataset;
    track('select_item', {
      item_list_name: 'Wine catalogue',
      items: [{ item_id: d.id, item_name: d.name, item_category: d.category, price: Number(d.price) }]
    });
    if (dlg && dlg.showModal) {
      document.getElementById('d-cat').textContent = d.category;
      document.getElementById('d-name').textContent = d.name;
      document.getElementById('d-origin').textContent = d.origin;
      document.getElementById('d-notes').textContent = d.notes;
      document.getElementById('d-price').textContent = '$' + Number(d.price).toFixed(2);
      dlg.showModal();
    }
  }));

  /* Forms */
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  function setErr(input, msg) {
    document.getElementById(input.id + '-err').textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  function validate(form) {
    let ok = true;
    form.querySelectorAll('input,textarea').forEach(f => {
      const v = f.value.trim();
      let msg = '';
      if (!v) msg = 'This field is required.';
      else if (f.type === 'email' && !emailOk(v)) msg = 'Enter an email like name@example.com.';
      else if (f.name === 'message' && v.length < 10) msg = 'Write at least 10 characters.';
      if (!setErr(f, msg)) ok = false;
    });
    return ok;
  }
  function handle(formId, okId, okText, realEvent) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate(form)) return;           // events fire only after validation passes
      if (DEMO_MODE) track('demo_form_submit', { form_name: form.dataset.form });
      else track(realEvent, { form_name: form.dataset.form });
      document.getElementById(okId).textContent = okText;
      form.reset();
    });
  }
  handle('contact-form', 'contact-ok', 'Demo form received. No message was sent.', 'generate_lead');
  handle('news-form', 'news-ok', 'Demo sign-up received. No email was saved.', 'sign_up');
});
