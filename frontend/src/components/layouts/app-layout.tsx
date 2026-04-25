import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layouts/app-sidebar.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-[#fafafa]">
          <AppSidebar />

          <div className="relative min-w-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
