import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Mic, Podcast, Award } from "lucide-react";

export default function Speaking() {
  const speakingEngagements = [
    {
      title: "NVDA Investor Presentation",
      type: "Conference Presentation",
      date: "April 2026",
      description: "Professional presentation on market insights and strategic analysis for NVIDIA investor relations.",
      link: "https://nvdapresen-cehp3wfn.manus.space",
      icon: "🎯",
    },
  ];

  const mediaAppearances = [
    {
      title: "Finance & Growth Podcast",
      type: "Podcast Guest",
      date: "Coming Soon",
      description: "Discussion on navigating finance careers, international study, and building side businesses as a young professional.",
      link: "#",
      icon: "🎙️",
    },
    {
      title: "Young Professionals in Finance",
      type: "Panel Discussion",
      date: "Coming Soon",
      description: "Panel discussion on internship strategies, career development, and breaking into competitive finance roles.",
      link: "#",
      icon: "👥",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                Speaking & Media
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Dekena Wade
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Presentations, podcast appearances, and media features exploring finance, career development, and personal growth.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Speaking Engagements */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Mic className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">Speaking Engagements</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Professional presentations and keynote addresses on finance, strategy, and market insights.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {speakingEngagements.map((engagement, idx) => (
              <a
                key={idx}
                href={engagement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:shadow-lg transition-all duration-300 h-full hover:border-primary cursor-pointer">
                  <CardHeader>
                    <div className="text-4xl mb-3">{engagement.icon}</div>
                    <CardTitle className="text-xl">{engagement.title}</CardTitle>
                    <CardDescription>{engagement.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{engagement.description}</p>
                    <p className="text-xs font-medium text-primary">{engagement.date}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Media & Podcast */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Podcast className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">Media & Podcast</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Guest appearances and interviews discussing career growth, finance, and navigating your 20s.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {mediaAppearances.map((appearance, idx) => (
              <div key={idx} className="block">
                <Card className="h-full opacity-75 hover:opacity-100 transition-opacity">
                  <CardHeader>
                    <div className="text-4xl mb-3">{appearance.icon}</div>
                    <CardTitle className="text-xl">{appearance.title}</CardTitle>
                    <CardDescription>{appearance.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{appearance.description}</p>
                    <p className="text-xs font-medium text-primary">{appearance.date}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Speaking Topics */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">Speaking Topics</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Areas of expertise and topics I'm available to speak about:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Finance Careers & Internship Strategy",
              "Building Side Businesses While in School",
              "International Study & Career Development",
              "AI & Automation in Finance",
              "Personal Finance & Wealth Building",
              "Navigating Grief & Professional Growth",
            ].map((topic, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <p className="font-medium text-foreground">{topic}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 text-center border border-border">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
            Interested in Having Me Speak?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm available for conferences, panels, podcasts, and speaking engagements. Get in touch to discuss opportunities.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Get in Touch
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
