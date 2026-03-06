import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Layers, Brain, Calendar, Gauge,
  WifiOff, Zap, Mail, BookOpen, MessageSquare, Star, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  }),
};

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold tracking-tight">AcadSynk</Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#compare" className="hover:text-foreground transition-colors">Compare</a>
          <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
          <Button asChild size="sm"><Link to="/signup">Get Started</Link></Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-3 text-sm">
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#compare" onClick={() => setOpen(false)}>Compare</a>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Button asChild size="sm"><Link to="/signup">Get Started</Link></Button>
        </div>
      )}
    </nav>
  );
};

const features = [
  { icon: Layers, title: "Platform Aggregation", desc: "Unify Canvas, Gmail, Slack, and calendars into a single feed." },
  { icon: Brain, title: "NLP Extraction", desc: "AI automatically detects deadlines from emails and LMS announcements." },
  { icon: Zap, title: "Smart Priority", desc: "Multi-factor scoring ranks tasks by urgency, effort, and credit weight." },
  { icon: Calendar, title: "Adaptive Scheduler", desc: "RL-powered study blocks that adapt to your energy and pace." },
  { icon: Gauge, title: "Cognitive Load Gauge", desc: "Real-time burnout prevention with a 0–100 load index." },
  { icon: WifiOff, title: "Offline-First", desc: "Works without internet. Syncs when you're back online." },
];

const comparison = [
  { feature: "Multi-platform aggregation", acadsynk: true, notion: false, todoist: false, reclaim: false, myhomework: false },
  { feature: "AI deadline extraction from email", acadsynk: true, notion: false, todoist: false, reclaim: false, myhomework: false },
  { feature: "Cognitive load monitoring", acadsynk: true, notion: false, todoist: false, reclaim: false, myhomework: false },
  { feature: "Adaptive RL scheduling", acadsynk: true, notion: false, todoist: false, reclaim: true, myhomework: false },
  { feature: "Offline-first PWA", acadsynk: true, notion: false, todoist: false, reclaim: false, myhomework: true },
  { feature: "Student-focused design", acadsynk: true, notion: false, todoist: false, reclaim: false, myhomework: true },
];

const testimonials = [
  { name: "Priya S.", role: "Computer Science, 3rd Year", quote: "I stopped missing deadlines the week I started using AcadSynk. It's like having a personal academic assistant." },
  { name: "Marcus T.", role: "Engineering, Postgrad", quote: "The cognitive load gauge actually helped me realize I was overloading Tuesdays. Game changer." },
  { name: "Elena K.", role: "Biology, 2nd Year", quote: "Connecting Canvas and Gmail in 30 seconds and seeing all my deadlines in one view — incredible." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNavbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Your Academic Command Center</p>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Stop juggling platforms.<br />Start acing deadlines.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            AcadSynk pulls tasks from Gmail, Canvas, Slack, and your calendar into one AI-powered dashboard
            that prioritizes, schedules, and prevents burnout.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/signup">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-base px-8">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Animated visual - platform icons converging */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="relative border border-border rounded-2xl bg-secondary/30 p-8 sm:p-12 flex items-center justify-center min-h-[200px]">
            <div className="flex items-center gap-4 sm:gap-8">
              {[Mail, BookOpen, MessageSquare, Calendar].map((Icon, i) => (
                <motion.div key={i} initial={{ x: (i - 1.5) * 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-14 h-14 rounded-xl border border-border bg-background flex items-center justify-center shadow-sm">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }} viewport={{ once: true }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
              → AcadSynk Dashboard
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem stats */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="border border-border rounded-2xl bg-background p-8 text-center">
              <p className="text-5xl sm:text-6xl font-bold mb-2">67%</p>
              <p className="text-muted-foreground">of students miss at least one deadline per semester</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="border border-border rounded-2xl bg-background p-8 text-center">
              <p className="text-5xl sm:text-6xl font-bold mb-2">23 min</p>
              <p className="text-muted-foreground">lost daily to context-switching between platforms</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">Three steps to academic clarity.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Connect Platforms", desc: "Link Gmail, Canvas, Google Calendar, Slack in seconds." },
              { step: "2", title: "AI Extracts Deadlines", desc: "NLP scans your emails and LMS for every assignment and due date." },
              { step: "3", title: "Get Your Schedule", desc: "An adaptive RL agent builds your optimal study timetable." },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="border border-border rounded-2xl p-6 bg-background">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Six Core Pillars</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Everything a student needs, nothing they don't.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="border border-border rounded-2xl p-6 bg-background hover:shadow-md transition-shadow">
                <f.icon className="h-8 w-8 mb-4 text-foreground" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="compare" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Why AcadSynk?</h2>
          <p className="text-muted-foreground text-center mb-12">See what the competition is missing.</p>
          <div className="overflow-x-auto border border-border rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="p-4 font-bold">AcadSynk</th>
                  <th className="p-4 font-medium text-muted-foreground">Notion</th>
                  <th className="p-4 font-medium text-muted-foreground">Todoist</th>
                  <th className="p-4 font-medium text-muted-foreground">Reclaim</th>
                  <th className="p-4 font-medium text-muted-foreground">myHomework</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium">{row.feature}</td>
                    {[row.acadsynk, row.notion, row.todoist, row.reclaim, row.myhomework].map((v, j) => (
                      <td key={j} className="p-4 text-center">
                        {v ? <CheckCircle2 className="h-5 w-5 mx-auto text-foreground" /> : <span className="text-muted-foreground">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PWA Banner */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <WifiOff className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Works on any device. No app store needed.</h2>
          <p className="text-muted-foreground mb-6">Install AcadSynk as a PWA directly from your browser. Works offline, syncs when you're back.</p>
          <Button asChild size="lg"><Link to="/signup">Install AcadSynk <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What Beta Students Say</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="border border-border rounded-2xl p-6 bg-background">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-foreground text-foreground" />)}
                </div>
                <p className="text-sm mb-4 leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-lg">AcadSynk</p>
              <p className="text-sm text-muted-foreground">Your Academic Command Center</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-8 text-center">© 2026 AcadSynk. GDPR & FERPA compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
