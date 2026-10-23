"use client";

import { createContext, useContext } from "react";

type ShellActions = {
  openPalette: () => void;
};

export const ShellContext = createContext<ShellActions>({
  openPalette: () => {},
});

export function useShell() {
  return useContext(ShellContext);
}
