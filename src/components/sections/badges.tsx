

import naturalIcon from "/license/2.webp";
import panjabfoodIcon from "/license/1.webp";
import halalIcon from "/license/3.webp";
import proteinIcon from "/license/4.webp";

export default function BadgesSection() {
    const badges = [
        {
          title: "Punjab Food Authority",
          desc: "Certified & approved quality standards",
          icon: panjabfoodIcon,
        },
        {
          title: "High Protein",
          desc: "Fuel your body with premium protein",
          icon: proteinIcon,
        },
        {
          title: "Halal Food",
          desc: "Prepared with halal-certified ingredients",
          icon: halalIcon,
        },
        {
          title: "100% Natural",
          desc: "No preservatives or artificial flavors",
          icon: naturalIcon,
        },
      ];
    

  return (
    <section className="py-12 text-gray">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg flex flex-col items-center"
            >
              <div className="w-16 h-16 relative mb-4">
                <img
                  src={badge.icon}
                  alt={badge.title}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Title + Desc */}
              <h3 className="text-lg font-bold mb-2">{badge.title}</h3>
              <p className="text-sm opacity-90">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
