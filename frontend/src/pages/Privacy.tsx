import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 26, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Overview</h2>
            <p className="text-muted-foreground">AcadSynk is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data in compliance with GDPR (EU), FERPA (US), and other applicable regulations.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Data We Collect</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Account information (name, email, university)</li>
              <li>Connected platform data (LMS assignments, email subjects, calendar events)</li>
              <li>Usage analytics (task completion, study patterns)</li>
              <li>Device information for PWA functionality</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">3. How We Process Data</h2>
            <p className="text-muted-foreground">Email content is processed client-side by default. Only extracted deadline metadata is sent to our servers. You can toggle this in Settings → Privacy.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">4. FERPA Compliance</h2>
            <p className="text-muted-foreground">AcadSynk does not access student education records directly. We only process assignment metadata and deadlines that students choose to share through OAuth connections.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Data Retention</h2>
            <p className="text-muted-foreground">Your data is retained for the duration of your account. Cached offline data is retained based on your PWA settings (default: 7 days). You may request complete data deletion at any time.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Your Rights</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Right to access all stored data</li>
              <li>Right to export data (JSON/CSV)</li>
              <li>Right to deletion (account and all associated data)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Contact</h2>
            <p className="text-muted-foreground">For privacy inquiries, contact privacy@acadsynk.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
