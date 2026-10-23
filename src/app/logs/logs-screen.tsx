"use client";

import { useMemo, useRef, useState } from "react";
import { logLines, type LogLevel } from "@/lib/sample";
import { controlClass, ghostClass } from "@/components/ui";

const levels: Array<LogLevel | "all"> = ["all", "info", "warn", "error"];

const tone: Record<LogLevel, string> = {
  info: "text-ink",
  warn: "text-wait",
  error: "text-fail",
};

export function LogsScreen() {
  const [level, setLevel] = useState<LogLevel | "all">("all");
  const [query, setQuery] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return logLines.filter((line) => {
      if (level !== "all" && line.level !== level) return false;
      if (!needle) return true;
      return `${line.project} ${line.message} ${line.level}`.toLowerCase().includes(needle);
    });
  }, [level, query]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="border-b border-line px-3 py-3 sm:px-4">
        <h1 className="text-[15px] font-medium">Logs</h1>
        <p className="mt-1 max-w-[68ch] text-[13px] leading-5 text-muted">
          Sample log lines. This is not a live runtime stream.
        </p>
      </header>
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-2 sm:px-4">
        {levels.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={level === item}
            className={controlClass(level === item)}
            onClick={() => setLevel(item)}
          >
            {item === "all" ? "All" : item}
          </button>
        ))}
        <label className="sr-only" htmlFor="log-search">
          Filter sample logs
        </label>
        <input
          id="log-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter sample lines"
          className="h-8 min-w-0 flex-1 border border-line bg-ground px-2 text-[13px] sm:max-w-xs"
        />
        <button
          type="button"
          className={ghostClass()}
          onClick={() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight })}
        >
          Jump to end
        </button>
      </div>
      <div ref={scroller} className="min-h-0 flex-1 overflow-auto font-mono text-[12px] leading-5">
        {rows.length === 0 ? (
          <p className="px-4 py-6 font-sans text-[13px] text-muted">No sample lines match.</p>
        ) : (
          <ol>
            {rows.map((line) => (
              <li key={line.id} className="grid grid-cols-[4.5rem_3.2rem_minmax(0,1fr)] gap-2 border-b border-line px-3 py-1 sm:px-4">
                <span className="text-muted">{line.time}</span>
                <span className={tone[line.level]}>{line.level}</span>
                <span className="min-w-0 break-words">
                  <span className="text-muted">{line.project}</span> {line.message}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
