import type { JSX } from "react";

interface NotFoundProps {
  message: string;
}

export default function NotFound({ message }: NotFoundProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-zinc-400">
      <p className="text-[14px] font-medium">{message}</p>
    </div>
  );
}
