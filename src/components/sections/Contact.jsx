import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { contact, profile } from '../../content/content';
import { EASE, Reveal } from '../ui/Reveal';

const emptyForm = { name: '', email: '', message: '' };

// Soft animated gradient blobs behind the card. Still for reduced motion.
// They use radial gradients instead of blur filters (blur is expensive to animate).
function Blobs() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <m.div
        className="absolute -top-24 -left-20 size-[380px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute -right-24 -bottom-24 size-[340px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--accent) 22%, transparent), transparent)' }}
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function Contact() {
  const [toast, setToast] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast('Copied!');
    } catch {
      showToast('Copy failed. Email: ' + profile.email);
    }
  };

  // Sends the message to Web3Forms, which emails it to the inbox of the account the key belongs to.
  const sendForm = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!contact.accessKey) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.accessKey,
          // Sender shows as the visitor's name, and replying goes straight to their address.
          from_name: form.name,
          replyto: form.email,
          subject: `${form.name} <${form.email}>`,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Send failed');
      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="container-x">
        <Reveal className="glass relative overflow-hidden rounded-[28px] px-6 py-16 text-center md:px-16 md:py-20">
          <Blobs />

          <div className="relative">
            <p className="eyebrow mb-4">Contact</p>
            <m.h2
              className="sweep-text mx-auto max-w-[760px] text-[clamp(36px,5.5vw,64px)] leading-[1.05] font-bold"
              initial={{ backgroundPosition: '100% 0%' }}
              whileInView={{ backgroundPosition: '0% 0%' }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
            >
              {contact.heading}
            </m.h2>
            <p className="mx-auto mt-6 max-w-[540px] text-[18px] text-text">{contact.text}</p>

            <div className="relative mt-10 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${profile.email}`} className="btn btn-primary arrow-slide">
                Send an email <ArrowUpRight size={17} />
              </a>
              <button type="button" onClick={copyEmail} className="btn btn-outline">
                <Copy size={16} /> Copy email
              </button>
              <AnimatePresence>
                {toast && (
                  <m.span
                    key="toast"
                    role="status"
                    className="absolute -top-14 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2 text-[14px] font-medium whitespace-nowrap text-bg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {toast.startsWith('Copied') && <Check size={15} />}
                    {toast}
                  </m.span>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[15px] text-muted">
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <Github size={17} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <Linkedin size={17} /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                <Mail size={17} /> {profile.email}
              </a>
            </div>

            {/* Optional contact form: opens the visitor's mail app, nothing is stored or sent by the site */}
            <form onSubmit={sendForm} className="mx-auto mt-14 grid max-w-[640px] gap-4 text-left sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-[14px] font-medium text-ink">
                Name
                <input className="field" name="name" autoComplete="name" required value={form.name} onChange={update('name')} />
              </label>
              <label className="flex flex-col gap-2 text-[14px] font-medium text-ink">
                Email
                <input className="field" type="email" name="email" autoComplete="email" required value={form.email} onChange={update('email')} />
              </label>
              <label className="flex flex-col gap-2 text-[14px] font-medium text-ink sm:col-span-2">
                Message
                <textarea className="field" name="message" rows={5} required value={form.message} onChange={update('message')} />
              </label>
              <div className="flex flex-col items-center gap-3 sm:col-span-2">
                <button type="submit" className="btn btn-outline arrow-slide" disabled={status === 'sending'}>
                  <Send size={16} /> {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <p role="status" className="min-h-[1.5em] text-center text-[15px]">
                  {status === 'success' && <span className="font-medium text-emerald-700">Thanks, your message has been sent.</span>}
                  {status === 'error' && (
                    <span className="font-medium text-red-700">
                      Sorry, your message could not be sent. Please try again or email me at{' '}
                      <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
