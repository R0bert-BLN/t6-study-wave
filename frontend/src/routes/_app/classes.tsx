import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";

export const Route = createFileRoute("/_app/classes")({
  component: ClassesPage,
});

function ClassesPage(): JSX.Element {
  return (
    <div className="animate-in fade-in mx-auto w-full max-w-7xl p-8 duration-500 lg:p-12">
      <header className="mb-10 flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Active Classes</h1>
          <p className="mt-2 text-[14px] text-zinc-500">
            Manage your ongoing courses and students.
          </p>
        </div>
      </header>

      <div className="rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-center text-zinc-400">
        Class grid will be implemented here.
      </div>
    </div>
  );
}
