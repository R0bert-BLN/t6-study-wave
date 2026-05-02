import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/general/use-debounce.ts";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/lib/utils.ts";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className={cn("group relative w-full", className)}>
      <Search
        size={18}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-base text-zinc-400 transition-colors duration-200 group-focus-within:text-black"
      />

      <Input
        placeholder={placeholder}
        className="w-full rounded-none border-x-0 border-t-0 border-b border-zinc-300 bg-transparent py-2 pr-0 pl-7 text-sm text-zinc-800 shadow-none transition-colors duration-200 placeholder:text-zinc-400 focus-visible:border-blue-600 focus-visible:ring-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
