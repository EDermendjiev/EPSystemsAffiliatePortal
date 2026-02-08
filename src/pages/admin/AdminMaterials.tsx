import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Upload, Trash2, Edit, FileImage, Plus } from "lucide-react";

const DEMO_MATERIALS = [
  { id: "1", title: "E&P Systems Banner 1200x628", category: "banners", file_type: "png", downloads: 42, tier_requirement: null, created_at: "2025-01-10" },
  { id: "2", title: "Email Welcome Template", category: "email_templates", file_type: "html", downloads: 28, tier_requirement: null, created_at: "2025-01-08" },
  { id: "3", title: "Instagram Story Template", category: "social_graphics", file_type: "png", downloads: 35, tier_requirement: null, created_at: "2025-01-05" },
  { id: "4", title: "Product Demo Video Script", category: "social_graphics", file_type: "pdf", downloads: 12, tier_requirement: "pro", created_at: "2024-12-20" },
  { id: "5", title: "Co-branded Landing Page", category: "landing_pages", file_type: "html", downloads: 8, tier_requirement: "pro", created_at: "2024-12-15" },
];

export default function AdminMaterials() {
  const { lang, t } = useLanguage();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.admin.materialsTitle[lang]}</h1>
          <p className="text-muted-foreground mt-2">{t.admin.materialsSubtitle[lang]}</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity"
        >
          <Upload className="w-4 h-4" />
          {t.admin.uploadMaterial[lang]}
        </button>
      </div>

      {/* Materials Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.materialTitle[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.materials.category[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.fileType[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.downloads[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.tier[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.actions[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_MATERIALS.map((material) => (
                <tr key={material.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">{material.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm capitalize">{material.category.replace("_", " ")}</td>
                  <td className="p-4 text-sm uppercase text-muted-foreground">{material.file_type}</td>
                  <td className="p-4 text-sm">{material.downloads}</td>
                  <td className="p-4">
                    {material.tier_requirement ? (
                      <span className="inline-flex px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded capitalize">
                        {material.tier_requirement}+
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">{t.admin.allTiers[lang]}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-muted rounded transition-colors">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 hover:bg-destructive/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowUpload(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-6 w-full max-w-md border border-border shadow-card mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">{t.admin.uploadMaterial[lang]}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.admin.materialTitle[lang]}</label>
                <input type="text" className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.materials.category[lang]}</label>
                <select className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="banners">Banners</option>
                  <option value="email_templates">Email Templates</option>
                  <option value="social_graphics">Social Graphics</option>
                  <option value="landing_pages">Landing Pages</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.admin.file[lang]}</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t.admin.dragDrop[lang]}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                {t.common.cancel[lang]}
              </button>
              <button className="flex-1 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity">
                {t.admin.upload[lang]}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
