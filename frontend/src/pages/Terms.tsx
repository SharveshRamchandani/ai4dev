import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 26, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">By using AcadSynk, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Description of Service</h2>
            <p className="text-muted-foreground">AcadSynk is a progressive web application that aggregates academic tasks from connected platforms, applies AI-powered prioritization, and generates adaptive study schedules.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">3. User Responsibilities</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must have authorization to connect third-party platforms</li>
              <li>You agree not to misuse the service or attempt to access data of other users</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">4. AI-Generated Content</h2>
            <p className="text-muted-foreground">AcadSynk's AI features (priority scoring, schedule generation, deadline extraction) are provided as recommendations. Users should verify critical deadlines independently.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">AcadSynk is not liable for missed deadlines, incorrect task extraction, or scheduling conflicts. The platform is a tool to assist — not replace — personal academic responsibility.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Termination</h2>
            <p className="text-muted-foreground">You may delete your account at any time through Settings. We reserve the right to suspend accounts that violate these terms.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Contact</h2>
            <p className="text-muted-foreground">For questions about these terms, contact legal@acadsynk.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
