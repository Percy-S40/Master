import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Cpu, ShieldCheck, ShoppingCart, Mail, Phone, MapPin, Clock, MonitorSmartphone, HardDrive, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * PC Parts & IT Solutions – Single‑file interactive site
 * Framework: React + Tailwind + shadcn/ui + Framer Motion
 *
 * How to customize quickly:
 * 1) Replace LOGO_URL with your logo/banner asset (PNG/JPG/SVG).
 * 2) Update CONTACT_EMAIL/CONTACT_PHONE and city/region copy.
 * 3) Deploy on Vercel/Netlify as a single page app, or drop into Next.js.
 */

const LOGO_URL = "/brand-logo.png"; // TODO: replace with your uploaded logo path
const BANNER_URL = "/brand-banner.png"; // TODO: replace with your uploaded banner path
const CONTACT_EMAIL = "csingletonDFWdeals@gmail.com"; 
const CONTACT_PHONE = "(214) 709-5078"; // TODO: replace with screener #

export default function Site() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const services = [
    {
      icon: <Cpu className="h-6 w-6" />, title: "Custom PCs & Upgrades",
      desc: "Gaming rigs, creator workstations, and honest upgrade paths tailored to your budget."
    },
    {
      icon: <HardDrive className="h-6 w-6" />, title: "Diagnostics & Repairs",
      desc: "Blue screens, slowdowns, noisy fans—fast troubleshooting with clear pricing."
    },
    {
      icon: <Network className="h-6 w-6" />, title: "Home & Office Networking",
      desc: "Wi‑Fi optimization, mesh installs, cabling, and printer/file sharing that just works."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />, title: "Backup & Security",
      desc: "Backups, antivirus, and best‑practice hardening for peace of mind."
    },
    {
      icon: <MonitorSmartphone className="h-6 w-6" />, title: "IT Setup & Consulting",
      desc: "Email, Microsoft/Google, device onboarding, and ongoing support plans."
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />, title: "Parts Sourcing",
      desc: "New, used, and refurbished components—tested and warranted locally."
    }
  ];

  const faqs = [
    { q: "Do you make house calls?", a: "Yes—DFW area. We also offer pickup/dropoff and remote help when possible." },
    { q: "Do you sell complete PCs?", a: "Absolutely. We offer prebuilt and custom configurations with local warranty." },
    { q: "What about businesses?", a: "We help small businesses with network setups, device deployments, and support retainers." }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("PC Parts & IT Solutions – New Inquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-600/90 to-blue-800 text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-blue-900/40 bg-blue-900/20">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="PC Parts & IT Solutions" className="h-9 w-auto rounded" onError={(e)=>{(e.target).style.display='none';}} />
            <div className="leading-tight">
              <p className="font-semibold tracking-wide">PC Parts & IT Solutions</p>
              <p className="text-xs text-white/80">Get Your Gear in Gear</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:opacity-90">Services</a>
            <a href="#why-us" className="hover:opacity-90">Why Us</a>
            <a href="#pricing" className="hover:opacity-90">Pricing</a>
            <a href="#contact" className="hover:opacity-90">Contact</a>
            <a href="#cta"><Button className="bg-white text-blue-700 hover:bg-white/90">Get a Quote</Button></a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={BANNER_URL} alt="Brand Banner" className="h-full w-full object-cover" onError={(e)=>{(e.target).style.display='none';}} />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Get Your <span className="text-blue-200">Gear</span> In Gear</h1>
            <p className="mt-4 text-blue-100/90 text-lg max-w-prose">Fast, friendly PC help for gamers, creators, and small businesses in DFW. Custom builds, upgrades, repairs, and IT solutions—done right the first time.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#contact"><Button size="lg" className="bg-white text-blue-700 hover:bg-white/90">Request Service</Button></a>
              <a href="#services"><Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">Explore Services</Button></a>
            </div>
            <div className="mt-6 flex items-center gap-5 text-sm text-white/90">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> 30‑Day Workmanship Warranty</div>
              <div className="hidden sm:flex items-center gap-2"><Clock className="h-4 w-4"/> Same‑Week Turnaround</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="bg-white/5 rounded-2xl p-6 shadow-xl ring-1 ring-white/10">
            <p className="text-white/90 font-semibold mb-4">Quick Quote</p>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input placeholder="Your name" required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
              <Input type="email" placeholder="Email" required value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
              <Input placeholder="Phone (optional)" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} />
              <Textarea placeholder="Tell us what you need (e.g., GPU upgrade, slow PC, office Wi‑Fi)" required value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} />
              <Button type="submit" className="mt-1 bg-white text-blue-700 hover:bg-white/90">Send</Button>
            </form>
            <div className="mt-4 text-sm text-blue-100/80 flex flex-col gap-1">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4"/> {CONTACT_EMAIL}</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4"/> {CONTACT_PHONE}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Dallas–Fort Worth, TX</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">Services</h2>
        <p className="text-blue-100/90 mt-2">Transparent pricing, dependable support, local warranty.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <Card className="bg-white/10 border-white/10 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10 ring-1 ring-white/15">{s.icon}</div>
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-blue-100/90 text-sm leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="mx-auto max-w-7xl px-4 pb-4">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-white/10 text-white"><CardContent className="p-6"><h3 className="font-semibold text-lg flex items-center gap-2"><Wrench className="h-5 w-5"/> Honest Repairs</h3><p className="mt-2 text-blue-100/90 text-sm">No upsell fluff. We explain options clearly and let you decide.</p></CardContent></Card>
          <Card className="bg-white/10 border-white/10 text-white"><CardContent className="p-6"><h3 className="font-semibold text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Local Warranty</h3><p className="mt-2 text-blue-100/90 text-sm">30‑day workmanship warranty and verified parts.</p></CardContent></Card>
          <Card className="bg-white/10 border-white/10 text-white"><CardContent className="p-6"><h3 className="font-semibold text-lg flex items-center gap-2"><Clock className="h-5 w-5"/> Fast Turnaround</h3><p className="mt-2 text-blue-100/90 text-sm">Same‑week service in most cases; rush options available.</p></CardContent></Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">Simple Pricing</h2>
        <p className="text-blue-100/90 mt-2">Flat rates for common jobs. Parts priced at market with receipts.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-white/10 text-white"><CardContent className="p-6"><h3 className="font-semibold text-xl">Diagnostics</h3><p className="text-4xl font-extrabold mt-2">$39</p><p className="text-sm text-blue-100/90 mt-2">Waived if you approve the repair.</p></CardContent></Card>
          <Card className="bg-white/10 border-white/10 text-white"><CardContent className="p-6"><h3 className="font-semibold text-xl">Tune‑Up / OS Refresh</h3><p className="text-4xl font-extrabold mt-2">$89</p><p className="text-sm text-blue-100/90 mt-2">Cleanup, updates, drivers, thermal check.</p></CardContent></Card>
          <Card className="bg-white/10 border-white/10 text-white"><CardContent className="p-6"><h3 className="font-semibold text-xl">Build & Setup</h3><p className="text-4xl font-extrabold mt-2">$129</p><p className="text-sm text-blue-100/90 mt-2">Assembly, BIOS, cable mgmt, Windows install & stress‑test.</p></CardContent></Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {["Fast and professional. My FPS doubled after the upgrade.", "Set up our shop Wi‑Fi and shared drives in one afternoon.", "Transparent quotes and great prices on used parts."].map((t, i) => (
            <Card key={i} className="bg-white/10 border-white/10 text-white"><CardContent className="p-6 text-blue-100/90">“{t}”</CardContent></Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl px-4 py-16">
        <div className="bg-white/10 border border-white/10 rounded-2xl p-8 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to get your gear in gear?</h3>
          <p className="mt-2 text-blue-100/90">Tell us what you need. We'll follow up with clear options and a fair price.</p>
          <div className="mt-6 flex justify-center">
            <a href="#contact"><Button size="lg" className="bg-white text-blue-700 hover:bg-white/90">Start a Request</Button></a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white/5 rounded-2xl p-6 ring-1 ring-white/10">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p className="text-blue-100/90 mt-1">We usually reply same‑day during business hours.</p>
            <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
              <Input placeholder="Your name" required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
              <Input type="email" placeholder="Email" required value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
              <Input placeholder="Phone (optional)" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} />
              <Textarea placeholder="How can we help?" required value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} />
              <Button type="submit" className="mt-1 bg-white text-blue-700 hover:bg-white/90">Send</Button>
            </form>
          </div>
          <div className="space-y-4 text-blue-100/90">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5"/> {CONTACT_PHONE}</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5"/> {CONTACT_EMAIL}</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5"/> Dallas–Fort Worth, TX</div>
            <p className="text-sm">Hours: Mon–Sat 9am–6pm • Sun by appointment</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-blue-950/40">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm flex flex-col md:flex-row gap-3 md:items-center justify-between text-blue-100/80">
          <p>© {new Date().getFullYear()} PC Parts & IT Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#pricing">Pricing</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
