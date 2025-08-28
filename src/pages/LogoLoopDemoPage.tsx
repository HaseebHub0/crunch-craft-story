import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LogoLoopDemo from "@/components/LogoLoopDemo";

const LogoLoopDemoPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            LogoLoop Component Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This page demonstrates various configurations of the LogoLoop component, 
            showing how it can be used with both React icons and image sources.
          </p>
        </div>
        
        <LogoLoopDemo />
        
        <div className="mt-16 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to Use LogoLoop
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-2">With React Icons:</h3>
              <pre className="bg-background p-3 rounded border overflow-x-auto">
{`const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
];

<LogoLoop
  logos={techLogos}
  speed={120}
  direction="left"
  logoHeight={48}
  pauseOnHover
  scaleOnHover
/>`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">With Images:</h3>
              <pre className="bg-background p-3 rounded border overflow-x-auto">
{`const imageLogos = [
  { src: "/logo.png", alt: "Company", href: "https://company.com" },
];

<LogoLoop
  logos={imageLogos}
  speed={80}
  direction="right"
  logoHeight={40}
  fadeOut
  fadeOutColor="#ffffff"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LogoLoopDemoPage;
