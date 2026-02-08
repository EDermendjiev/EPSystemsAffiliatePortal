import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Download, Eye, FileImage, Image, Mail, Share2, Globe } from "lucide-react";

const DEMO_MATERIALS = [
  { id: "1", title: "E&P Systems Banner 1200x628", description: "Social media banner for Facebook/LinkedIn", category: "banners", file_type: "png", dimensions: "1200x628", tier_requirement: null },
  { id: "2", title: "Email Welcome Template", description: "Pre-written welcome email for your audience", category: "email_templates", file_type: "html", dimensions: null, tier_requirement: null },
  { id: "3", title: "Instagram Story Template", description: "Vertical story template with product highlights", category: "social_graphics", file_type: "png", dimensions: "1080x1920", tier_requirement: null },
  { id: "4", title: "Product Demo Video Script", description: "Video script for YouTube product demonstrations", category: "social_graphics", file_type: "pdf", dimensions: null, tier_requirement: "pro" },
  { id: "5", title: "Co-branded Landing Page", description: "Customizable landing page with your branding", category: "landing_pages", file_type: "html", dimensions: null, tier_requirement: "pro" },
  { id: "6", title: "Twitter/X Ad Creatives Pack", description: "Set of 5 ad creatives optimized for Twitter/X", category: "banners", file_type: "zip", dimensions: "1200x675", tier_requirement: null },
];

const categoryIcons = {
  banners: Image,
  email_templates: Mail,
  social_graphics: Share2,
  landing_pages: Globe,
};

export default function Materials() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "banners", "email_templates", "social_graphics", "landing_pages"];
  const filtered = activeCategory === "all"
    ? DEMO_MATERIALS
    : DEMO_MATERIALS.filter((m) => m.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t.materials.title[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.materials.subtitle[lang]}</p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.materials[cat as keyof typeof t.materials][lang]}
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((material, index) => {
          const IconComponent = categoryIcons[material.category as keyof typeof categoryIcons] || FileImage;
          return (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-glow transition-shadow">
                {/* Thumbnail */}
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  <IconComponent className="w-12 h-12 text-muted-foreground/50" />
                  {material.tier_requirement && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded-full capitalize">
                      {material.tier_requirement}
                    </span>
                  )}
                  {material.dimensions && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                      {material.dimensions}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm">{material.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="uppercase font-medium">{material.file_type}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                      <Eye className="w-4 h-4" />
                      {t.materials.preview[lang]}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      <Download className="w-4 h-4" />
                      {t.materials.download[lang]}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
