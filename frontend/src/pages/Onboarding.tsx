import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Mail, Calendar, MessageSquare, ArrowRight, ArrowLeft,
  CheckCircle2, Loader2, Download
} from "lucide-react";

const steps = [
  "Welcome", "Connect LMS", "Connect Email", "Connect Calendar",
  "Connect Chat", "Preferences", "Install PWA", "Complete"
];

const PlatformTile = ({ icon: Icon, name, connected, onConnect }: { icon: any; name: string; connected: boolean; onConnect: () => void }) => (
  <button onClick={onConnect}
    className={`border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${connected ? "border-foreground bg-secondary" : "border-border hover:border-foreground/30"}`}>
    <Icon className="h-8 w-8" />
    <span className="text-sm font-medium">{name}</span>
    {connected && <CheckCircle2 className="h-4 w-4" />}
  </button>
);

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [studyHours, setStudyHours] = useState([6]);
  const [wakeTime, setWakeTime] = useState("07:00");
  const [sleepTime, setSleepTime] = useState("23:00");
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const toggleConnect = (name: string) => setConnected(p => ({ ...p, [name]: !p[name] }));

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="border-b border-border px-4 py-4">
        <div className="container mx-auto max-w-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {step + 1} of {steps.length}</span>
            <span className="text-sm text-muted-foreground">{steps[step]}</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 0 && (
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">Welcome to AcadSynk</h1>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">Let's set up your academic command center. We'll connect your platforms and customize your experience in a few quick steps.</p>
                </div>
              )}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Connect your LMS</h2>
                  <p className="text-muted-foreground mb-6">We'll pull assignments and deadlines automatically.</p>
                  <div className="grid grid-cols-3 gap-3">
                    <PlatformTile icon={BookOpen} name="Canvas" connected={!!connected.canvas} onConnect={() => toggleConnect("canvas")} />
                    <PlatformTile icon={BookOpen} name="Moodle" connected={!!connected.moodle} onConnect={() => toggleConnect("moodle")} />
                    <PlatformTile icon={BookOpen} name="Blackboard" connected={!!connected.blackboard} onConnect={() => toggleConnect("blackboard")} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">Or <button className="underline">import via CSV</button></p>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Connect your email</h2>
                  <p className="text-muted-foreground mb-6">We scan for academic deadlines in your inbox.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <PlatformTile icon={Mail} name="Gmail" connected={!!connected.gmail} onConnect={() => toggleConnect("gmail")} />
                    <PlatformTile icon={Mail} name="Outlook" connected={!!connected.outlook} onConnect={() => toggleConnect("outlook")} />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Connect your calendar</h2>
                  <p className="text-muted-foreground mb-6">We'll avoid scheduling over existing commitments.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <PlatformTile icon={Calendar} name="Google Calendar" connected={!!connected.gcal} onConnect={() => toggleConnect("gcal")} />
                    <PlatformTile icon={Calendar} name="MS Calendar" connected={!!connected.mscal} onConnect={() => toggleConnect("mscal")} />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Connect chat (optional)</h2>
                  <p className="text-muted-foreground mb-6">Catch deadlines mentioned in group chats.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <PlatformTile icon={MessageSquare} name="Slack" connected={!!connected.slack} onConnect={() => toggleConnect("slack")} />
                    <PlatformTile icon={MessageSquare} name="Discord" connected={!!connected.discord} onConnect={() => toggleConnect("discord")} />
                  </div>
                </div>
              )}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Set your preferences</h2>
                  <p className="text-muted-foreground mb-6">Help the AI build your ideal schedule.</p>
                  <div className="space-y-6">
                    <div>
                      <Label>Daily study hours cap: {studyHours[0]}h</Label>
                      <Slider value={studyHours} onValueChange={setStudyHours} min={1} max={12} step={1} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Wake time</Label>
                        <Input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="mt-1" />
                      </div>
                      <div>
                        <Label>Sleep time</Label>
                        <Input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 6 && (
                <div className="text-center">
                  <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-bold mb-2">Install AcadSynk</h2>
                  <p className="text-muted-foreground mb-6">Add to your home screen for offline access and push notifications.</p>
                  <Button size="lg" className="mb-3">Install AcadSynk</Button>
                  <p className="text-xs text-muted-foreground">On iOS: tap Share → Add to Home Screen</p>
                </div>
              )}
              {step === 7 && (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-muted-foreground" />
                  <h2 className="text-2xl font-bold mb-2">Setting up your dashboard...</h2>
                  <p className="text-muted-foreground mb-8">AcadSynk is scanning your connected platforms for deadlines.</p>
                  <Button asChild size="lg">
                    <Link to="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      {step < 7 && (
        <div className="border-t border-border px-4 py-4">
          <div className="container mx-auto max-w-lg flex justify-between">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={next}>
              {step === 6 ? "Skip" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
