import type { JSX, ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  name: string;
  component: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export default function Tabs({ tabs, defaultTabId, className }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : ""),
  );

  if (!tabs || tabs.length === 0) {
    return <div className="text-sm text-zinc-500">No tabs available.</div>;
  }

  return (
    <div className={cn("flex min-h-0 w-full flex-col", className)}>
      <div className="flex justify-center gap-10 border-y border-zinc-200/70 pt-4.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative cursor-pointer pb-3 text-[14px] font-semibold transition-all outline-none",
                isActive
                  ? "border-b-2 border-zinc-900 text-zinc-900"
                  : "border-b-2 border-transparent text-zinc-400 hover:text-zinc-700",
              )}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="animate-in fade-in w-full flex-1 overflow-hidden duration-300">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
