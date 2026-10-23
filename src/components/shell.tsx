"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { CommandPalette } from "@/components/command-palette";
import { Icon, Mark } from "@/components/icons";
import { ShellContext } from "@/components/shell-context";
import { NAV, sectionOf } from "@/lib/nav";
import { domains, latestFor, projects } from "@/lib/sample";
import { StatusMark } from "@/components/ui";

type SidebarMode = "auto" | "open" | "closed";

function tabLabel(pathname: string) {
  if (pathname === "/") return null;
  if (pathname.startsWith("/projects/")) return `${pathname.split("/")[2]}.project`;
  if (pathname.startsWith("/deployments/")) return pathname.split("/")[2];
  if (pathname === "/env") return "environment";
  return pathname.slice(1);
}

function sectionLabel(pathname: string) {
  if (pathname === "/") return "session.origin";
  return sectionOf(pathname)?.label ?? "Origin";
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [palette, setPalette] = useState(false);
  const [sidebar, setSidebar] = useState<SidebarMode>("auto");
  const closePalette = useCallback(() => setPalette(false), []);
  const openPalette = useCallback(() => setPalette(true), []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && (key === "k" || event.code === "KeyK")) {
        event.preventDefault();
        setPalette((open) => !open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleSidebar() {
    setSidebar((mode) => {
      if (mode === "closed") return "open";
      if (mode === "open") return "closed";
      return window.matchMedia("(min-width: 768px)").matches ? "closed" : "open";
    });
  }

  function onSidebarNavigate() {
    if (!window.matchMedia("(min-width: 768px)").matches) setSidebar("closed");
  }

  const current = tabLabel(pathname);
  const activeHref = sectionOf(pathname)?.href;

  return (
    <ShellContext.Provider value={{ openPalette }}>
      <div className="flex h-dvh flex-col overflow-hidden bg-ground text-ink">
        <div className="flex min-h-0 flex-1 flex-col" inert={palette ? true : undefined}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-focus focus:px-3 focus:py-2 focus:text-focus-ink"
        >
          Skip to content
        </a>
        <div className="relative flex min-h-0 flex-1">
          <nav aria-label="Sections" className="flex w-12 shrink-0 flex-col items-center border-r border-line bg-sidebar">
            <Link href="/" aria-label="Origin session" className="flex h-12 w-12 items-center justify-center text-ink">
              <Mark />
            </Link>
            {NAV.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex h-10 w-10 items-center justify-center bg-selection text-focus"
                      : "flex h-10 w-10 items-center justify-center text-muted hover:bg-raised hover:text-ink"
                  }
                >
                  <Icon name={item.icon} />
                  <span className="sr-only">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          {sidebar === "open" ? (
            <button
              type="button"
              className="absolute inset-0 z-20 bg-black/60 md:hidden"
              aria-label="Close sidebar"
              onClick={() => setSidebar("closed")}
            />
          ) : null}
          <aside
            id="workspace-sidebar"
            aria-label="Workspace"
            className={
              sidebar === "closed"
                ? "hidden"
                : sidebar === "open"
                  ? "absolute bottom-0 left-12 top-0 z-30 flex w-60 flex-col border-r border-line bg-sidebar md:static"
                  : "hidden w-60 shrink-0 flex-col border-r border-line bg-sidebar md:flex"
            }
          >
            <p className="flex h-8 items-center border-b border-line px-3 text-[13px] font-medium">Origin</p>
            <div className="min-h-0 flex-1 overflow-auto" onClick={onSidebarNavigate}>
              <Suspense fallback={<Sidebar pathname={pathname} search="" />}>
                <SidebarSearch pathname={pathname} />
              </Suspense>
            </div>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-8 shrink-0 items-stretch border-b border-line bg-sidebar">
              <button
                type="button"
                className="flex w-8 shrink-0 items-center justify-center text-muted hover:bg-raised hover:text-ink"
                aria-controls="workspace-sidebar"
                aria-expanded={sidebar === "auto" ? undefined : sidebar === "open"}
                onClick={toggleSidebar}
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M3 4.5h10M3 8h10M3 11.5h10" />
                </svg>
              </button>
              <nav aria-label="Open editors" className="flex min-w-0 items-stretch">
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={
                    pathname === "/"
                      ? "flex max-w-[10rem] items-center truncate border-t border-t-focus bg-ground px-3 font-mono text-[12px] text-ink"
                      : "flex max-w-[10rem] items-center truncate px-3 font-mono text-[12px] text-muted hover:text-ink"
                  }
                >
                  session.origin
                </Link>
                {current ? (
                  <Link
                    href={pathname}
                    aria-current="page"
                    className="flex max-w-[12rem] items-center truncate border-t border-t-focus bg-ground px-3 font-mono text-[12px] text-ink"
                  >
                    {current}
                  </Link>
                ) : null}
              </nav>
            </div>
            <main id="main" className="flex min-h-0 min-w-0 flex-1 flex-col">
              {children}
            </main>
          </div>
        </div>
        <footer className="flex h-7 shrink-0 items-center gap-3 overflow-x-auto border-t border-line bg-sidebar px-2 font-mono text-[11px] whitespace-nowrap text-muted">
          <span className="text-ink">Origin</span>
          <span className="text-wait">SAMPLE</span>
          <span className="hidden sm:inline">{sectionLabel(pathname)}</span>
          <span className="ml-auto">Singapore</span>
          <span>AWS not connected</span>
          <button
            type="button"
            className="text-ink hover:text-focus"
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={openPalette}
          >
            Ctrl K
          </button>
        </footer>
        </div>
        <CommandPalette open={palette} onClose={closePalette} />
      </div>
    </ShellContext.Provider>
  );
}

function SidebarSearch({ pathname }: { pathname: string }) {
  const search = useSearchParams().toString();
  return <Sidebar pathname={pathname} search={search} />;
}

function Sidebar({ pathname, search }: { pathname: string; search: string }) {
  if (pathname === "/deployments" || pathname.startsWith("/deployments/")) {
    return (
      <nav aria-label="Deployment states" className="py-2">
        <h2 className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">States</h2>
        <SideLink href="/deployments" pathname={pathname} search={search} label="All deploys" />
        <SideLink href="/deployments?status=ready" pathname={pathname} search={search} label="Ready" />
        <SideLink href="/deployments?status=failed" pathname={pathname} search={search} label="Failed" />
        <SideLink href="/deployments?status=building" pathname={pathname} search={search} label="Building" />
        <SideLink href="/deployments?status=queued" pathname={pathname} search={search} label="Queued" />
      </nav>
    );
  }

  if (pathname === "/env") {
    const envSearch = search.includes("project=") ? search : `project=${projects[0].slug}`;
    return (
      <nav aria-label="Sample projects" className="py-2">
        <h2 className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">Variables for</h2>
        {projects.map((project) => (
          <SideLink
            key={project.slug}
            href={`/env?project=${project.slug}`}
            pathname={pathname}
            search={envSearch}
            label={project.name}
          />
        ))}
      </nav>
    );
  }

  if (pathname === "/domains") {
    return (
      <nav aria-label="Domains" className="py-2">
        <h2 className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">Hosts</h2>
        {domains.map((domain) => (
          <SideLink key={domain.id} href={`/domains#domain-${domain.id}`} pathname={pathname} search={search} label={domain.host} />
        ))}
      </nav>
    );
  }

  if (pathname === "/settings") {
    return (
      <nav aria-label="Settings" className="py-2">
        <h2 className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">Plan</h2>
        <SideLink href="/settings#plan" pathname={pathname} search={search} label="Infrastructure" />
        <SideLink href="/settings#region" pathname={pathname} search={search} label="Singapore" />
      </nav>
    );
  }

  return (
    <div className="py-2">
      <nav aria-label="Workspace files">
        <h2 className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">Workspace</h2>
        <SideLink href="/" pathname={pathname} search={search} label="session.origin" />
        {NAV.map((item) => (
          <SideLink key={item.href} href={item.href} pathname={pathname} search={search} label={item.label} />
        ))}
      </nav>
      <nav aria-label="Sample projects" className="mt-3">
        <h2 className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted">Sample projects</h2>
        {projects.map((project) => {
          const latest = latestFor(project.slug);
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={
                pathname === `/projects/${project.slug}`
                  ? "flex items-center justify-between gap-2 bg-selection px-3 py-1 text-[13px] text-ink"
                  : "flex items-center justify-between gap-2 px-3 py-1 text-[13px] text-muted hover:bg-raised hover:text-ink"
              }
            >
              <span className="truncate">{project.name}</span>
              {latest ? <StatusMark status={latest.status} /> : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function SideLink({
  href,
  pathname,
  search,
  label,
}: {
  href: string;
  pathname: string;
  search: string;
  label: string;
}) {
  const url = new URL(href, "http://origin.local");
  const actual = new URLSearchParams(search);
  let active = url.pathname === pathname && !url.hash;
  if (active) {
    const expected = [...url.searchParams.entries()];
    if (expected.length === 0) {
      active = actual.toString() === "";
    } else {
      active = expected.every(([key, value]) => actual.get(key) === value);
    }
  }
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "block truncate bg-selection px-3 py-1 text-[13px] text-ink"
          : "block truncate px-3 py-1 text-[13px] text-muted hover:bg-raised hover:text-ink"
      }
    >
      {label}
    </Link>
  );
}
