import { Sidebar } from "./Sidebar";

interface MobileSidebarProps {
  isAdmin: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({
  isAdmin,
  open,
  onOpenChange,
}: MobileSidebarProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        onClick={() => onOpenChange(false)}
      />

      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden animate-in slide-in-from-left duration-300">
        <Sidebar isAdmin={isAdmin} onNavigate={() => onOpenChange(false)} />
      </div>
    </>
  );
}
