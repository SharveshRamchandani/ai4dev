import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Clock, Bell, Brain, Shield, Smartphone } from "lucide-react";

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="profile" className="gap-1"><User className="h-3 w-3" /> Profile</TabsTrigger>
            <TabsTrigger value="study" className="gap-1"><Clock className="h-3 w-3" /> Study</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1"><Bell className="h-3 w-3" /> Notifications</TabsTrigger>
            <TabsTrigger value="ai" className="gap-1"><Brain className="h-3 w-3" /> AI & Scheduler</TabsTrigger>
            <TabsTrigger value="privacy" className="gap-1"><Shield className="h-3 w-3" /> Privacy</TabsTrigger>
            <TabsTrigger value="pwa" className="gap-1"><Smartphone className="h-3 w-3" /> PWA</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-lg font-semibold">Profile</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="Arjun Patel" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="arjun@university.edu" type="email" /></div>
              <div className="space-y-2"><Label>University</Label><Input defaultValue="Stanford University" /></div>
              <div className="space-y-2"><Label>Role</Label><Input defaultValue="Undergraduate" disabled /></div>
            </div>
            <Button>Save Profile</Button>
          </TabsContent>

          <TabsContent value="study" className="space-y-4">
            <h2 className="text-lg font-semibold">Study Preferences</h2>
            <div className="space-y-6">
              <div><Label>Max daily study hours: 6h</Label><Slider defaultValue={[6]} min={1} max={12} step={1} className="mt-2" /></div>
              <div><Label>Preferred study block duration: 90 min</Label><Slider defaultValue={[90]} min={25} max={180} step={5} className="mt-2" /></div>
              <div><Label>Break frequency: Every 90 min</Label><Slider defaultValue={[90]} min={25} max={120} step={5} className="mt-2" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Wake Time</Label><Input type="time" defaultValue="07:00" /></div>
                <div className="space-y-2"><Label>Sleep Time</Label><Input type="time" defaultValue="23:00" /></div>
              </div>
              <div className="flex items-center gap-2"><Switch id="weekend" /><Label htmlFor="weekend">Study on weekends</Label></div>
            </div>
            <Button>Save Preferences</Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
            <div className="space-y-4">
              {["Deadline reminders", "Schedule nudges", "Cognitive load alerts", "New task extracted", "Sync status updates"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <Label>{item}</Label><Switch defaultChecked />
                </div>
              ))}
              <Separator />
              <div><Label>Reminder lead time: 24h before</Label><Slider defaultValue={[24]} min={1} max={48} step={1} className="mt-2" /></div>
            </div>
            <Button>Save Notification Settings</Button>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <h2 className="text-lg font-semibold">AI & Scheduler Settings</h2>
            <div className="space-y-6">
              <div><Label>Fatigue sensitivity: Medium</Label><Slider defaultValue={[50]} min={0} max={100} className="mt-2" /></div>
              <div>
                <Label>Scheduler aggressiveness</Label>
                <div className="flex gap-2 mt-2">
                  {["Conservative", "Balanced", "Intensive"].map((mode) => (
                    <Button key={mode} variant={mode === "Balanced" ? "default" : "outline"} size="sm" className="flex-1">{mode}</Button>
                  ))}
                </div>
              </div>
              <div><Label>Daily study hour hard cap: 8h</Label><Slider defaultValue={[8]} min={2} max={14} step={1} className="mt-2" /></div>
              <div className="flex items-center gap-2"><Switch id="autoregen" defaultChecked /><Label htmlFor="autoregen">Auto-regenerate schedule on new tasks</Label></div>
            </div>
            <Button>Save AI Settings</Button>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <h2 className="text-lg font-semibold">Privacy & Data</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between"><Label>Client-side email preprocessing</Label><Switch defaultChecked /></div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline">Export All Data (GDPR)</Button>
                <p className="text-xs text-muted-foreground">Download all your data in JSON format</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline" className="text-destructive">Delete Account</Button>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pwa" className="space-y-4">
            <h2 className="text-lg font-semibold">PWA Settings</h2>
            <div className="space-y-4">
              <div>
                <Label>Storage Usage</Label>
                <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-foreground rounded-full" style={{ width: "34%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">12 MB of 50 MB used (34%)</p>
              </div>
              <Button variant="outline" size="sm">Clear Cache</Button>
              <Separator />
              <div className="flex items-center justify-between"><Label>Background sync</Label><Switch defaultChecked /></div>
              <div><Label>Offline data retention: 7 days</Label><Slider defaultValue={[7]} min={1} max={30} step={1} className="mt-2" /></div>
              <Button variant="outline" size="sm">Re-install PWA</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
