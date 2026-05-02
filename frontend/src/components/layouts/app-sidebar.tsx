import { Link } from "@tanstack/react-router";
import {
  Book,
  Calendar,
  CheckCircle,
  Notebook,
  Archive,
  Settings,
  Waves,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/auth/use-auth-mutation.ts";
import type { JSX } from "react";

type SidebarItem = {
  title: string;
  icon: LucideIcon;
  to: "/courses" | "/schedule" | "/evaluate" | "/todo" | "/notes" | "/archived" | "/settings";
};

const itemButtonClass =
  "text-zinc-400 hover:bg-zinc-800 hover:text-white py-5 transition-colors cursor-pointer";
const itemActiveClass =
  "bg-zinc-800/50 text-white font-semibold !text-blue-400 border-l-2 border-blue-500 rounded-l-none";

export function AppSidebar(): JSX.Element {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const menuItems: SidebarItem[] = [
    { title: "Courses", icon: Book, to: "/courses" },
    { title: "Schedule", icon: Calendar, to: "/schedule" },
    { title: "To Evaluate", icon: CheckCircle, to: "/evaluate" },
    { title: "To Do", icon: CheckCircle, to: "/todo" },
    { title: "Notes", icon: Notebook, to: "/notes" },
  ];

  const systemItems: SidebarItem[] = [
    { title: "Archived", icon: Archive, to: "/archived" },
    { title: "Settings", icon: Settings, to: "/settings" },
  ];

  const renderNavItems = (items: SidebarItem[]) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title} className={itemButtonClass}>
            <Link
              to={item.to}
              activeProps={{ className: itemActiveClass }}
              inactiveProps={{ className: "text-zinc-400" }}
              activeOptions={{ exact: true }}
            >
              <item.icon className="shrink-0 text-lg" aria-hidden="true" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-[#111] text-zinc-400">
      <SidebarHeader className="mb-4 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/50">
            <Waves className="text-lg" />
          </div>

          <span className="truncate text-lg font-bold tracking-tight text-white">StudyWave</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-none gap-6 px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
            Menu
          </SidebarGroupLabel>

          {renderNavItems(menuItems)}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
            System
          </SidebarGroupLabel>

          {renderNavItems(systemItems)}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-6 px-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                className={itemButtonClass}
                onClick={() => logout()}
                disabled={isLoggingOut}
                aria-label="Logout"
              >
                <LogOut className="shrink-0 text-lg" aria-hidden="true" />
                <span>{"Logout"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
