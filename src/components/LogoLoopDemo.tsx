import React from 'react';
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiNetlify } from 'react-icons/si';

// Technology logos using React icons
const techLogos = [
  { node: <SiReact className="text-blue-500" size={48} />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-black dark:text-white" size={48} />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-blue-600" size={48} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-cyan-500" size={48} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVite className="text-purple-500" size={48} />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiNetlify className="text-teal-500" size={48} />, title: "Netlify", href: "https://netlify.com" },
];

// Alternative with image sources (you can replace these with actual image paths)
const imageLogos = [
  { src: "/logo.webp", alt: "Company 1", href: "https://company1.com" },
  { src: "/logo.webp", alt: "Company 2", href: "https://company2.com" },
  { src: "/logo.webp", alt: "Company 3", href: "https://company3.com" },
];

export const LogoLoopDemo: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      {/* Technology Partners Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-foreground">
          Technology Partners
        </h2>
        <div className="h-24 relative overflow-hidden bg-gradient-to-r from-muted to-background rounded-lg border">
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="hsl(var(--background))"
            ariaLabel="Technology partners"
          />
        </div>
      </div>

      {/* Company Partners Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-foreground">
          Company Partners
        </h2>
        <div className="h-24 relative overflow-hidden bg-gradient-to-r from-muted to-background rounded-lg border">
          <LogoLoop
            logos={imageLogos}
            speed={80}
            direction="right"
            logoHeight={40}
            gap={32}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="hsl(var(--background))"
            ariaLabel="Company partners"
          />
        </div>
      </div>

      {/* Fast Scrolling Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-foreground">
          Fast Scrolling
        </h2>
        <div className="h-20 relative overflow-hidden bg-gradient-to-r from-muted to-background rounded-lg border">
          <LogoLoop
            logos={techLogos}
            speed={200}
            direction="left"
            logoHeight={32}
            gap={24}
            pauseOnHover={false}
            scaleOnHover
            ariaLabel="Fast scrolling logos"
          />
        </div>
      </div>

      {/* Custom Styling Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-foreground">
          Custom Styling
        </h2>
        <div className="h-28 relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={56}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="hsl(var(--primary) / 0.1)"
            ariaLabel="Custom styled logos"
            className="py-4"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoLoopDemo;
