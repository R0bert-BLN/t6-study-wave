import type { JSX } from "react";

interface ErrorPageProps {
  code?: number;
  title?: string;
  message?: string;
}

export function ErrorPage({
  code = 404,
  title = "Page not found",
  message = "The page you are looking for doesn't exist or has been moved.",
}: ErrorPageProps): JSX.Element {
  return (
    <div className="animate-in fade-in flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#FAFAFA] p-6 text-center duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-rose-500 opacity-20 blur-3xl"></div>
      </div>

      <h1 className="mb-4 text-6xl font-black tracking-tighter text-zinc-900">{code}</h1>
      <h2 className="mb-2 text-2xl font-bold text-zinc-800">{title}</h2>
      <p className="mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-zinc-500">{message}</p>
    </div>
  );
}
