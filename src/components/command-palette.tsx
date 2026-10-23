"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { paletteCommands, type PaletteCommand } from "@/lib/sample";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const commands = useMemo(() => paletteCommands(), []);
  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.group} ${command.label} ${command.hint ?? ""}`.toLowerCase().includes(needle),
    );
  }, [commands, query]);
  const index = items.length === 0 ? 0 : Math.min(active, items.length - 1);

  useEffect(() => {
    if (!open) return;
    const previously = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previously?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`palette-opt-${index}`)?.scrollIntoView({ block: "nearest" });
  }, [index, open, query]);

  if (!open) return null;

  function run(command: PaletteCommand) {
    router.push(command.href);
    onClose();
  }

  function onInputKey(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(Math.min(index + 1, Math.max(items.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(Math.max(index - 1, 0));
    } else if (event.key === "PageDown") {
      event.preventDefault();
      setActive(Math.min(index + 5, Math.max(items.length - 1, 0)));
    } else if (event.key === "PageUp") {
      event.preventDefault();
      setActive(Math.max(index - 5, 0));
    } else if (event.key === "Enter" && items[index]) {
      event.preventDefault();
      run(items[index]);
    }
  }

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center px-3 pt-[10vh]">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-label"
        className="origin-palette relative z-10 flex w-full max-w-lg flex-col border border-line bg-sidebar shadow-[0_16px_40px_rgb(0_0_0/0.45)]"
      >
        <h2 id="palette-label" className="sr-only">
          Command palette
        </h2>
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={items[index] ? `palette-opt-${index}` : undefined}
          aria-autocomplete="list"
          value={query}
          placeholder="Jump to a sample project, deploy, or page"
          className="h-10 border-b border-line bg-transparent px-3 text-[13px] text-ink outline-none"
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
        />
        <ul
          id="palette-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-[min(18rem,40dvh)] overflow-auto py-1"
        >
          {items.length === 0 ? (
            <li className="px-3 py-3 text-[13px] text-muted">No commands match.</li>
          ) : (
            items.map((command, itemIndex) => {
              const showGroup = command.group !== lastGroup;
              lastGroup = command.group;
              const selected = itemIndex === index;
              return (
                <li key={`${command.href}-${command.label}`} role="presentation">
                  {showGroup ? (
                    <p className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">{command.group}</p>
                  ) : null}
                  <div className={selected ? "bg-selection text-ink" : "text-ink"}>
                    <button
                      id={`palette-opt-${itemIndex}`}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      tabIndex={-1}
                      className="flex w-full items-baseline justify-between gap-3 px-3 py-1.5 text-left"
                      onMouseEnter={() => setActive(itemIndex)}
                      onClick={() => run(command)}
                    >
                      <span>{command.label}</span>
                      {command.hint ? (
                        <span className="truncate font-mono text-[11px] text-muted">{command.hint}</span>
                      ) : null}
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <p className="flex gap-3 border-t border-line px-3 py-1.5 font-mono text-[11px] text-muted">
          <span>Up/Down select</span>
          <span>Enter open</span>
          <span>Esc close</span>
        </p>
      </div>
    </div>
  );
}
