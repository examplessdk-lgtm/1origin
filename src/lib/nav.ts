export const NAV = [
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/deployments", label: "Deployments", icon: "deployments" },
  { href: "/env", label: "Environment", icon: "env" },
  { href: "/domains", label: "Domains", icon: "domains" },
  { href: "/logs", label: "Logs", icon: "logs" },
  { href: "/team", label: "Team", icon: "team" },
  { href: "/settings", label: "Settings", icon: "settings" },
] as const;

export type NavIcon = (typeof NAV)[number]["icon"];

export function sectionOf(pathname: string) {
  return NAV.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}
