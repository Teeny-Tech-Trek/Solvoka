/**
 * LenisContext.ts
 *
 * Shared React context + hook for accessing the global Lenis instance.
 * Separated from SmoothScroll.tsx to satisfy react-refresh/only-export-components.
 */

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

/** Access the global Lenis instance from any descendant component. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Module-level Lenis instance holder.
 * SmoothScroll writes to this during initialization; the context
 * provider reads from it synchronously during first render so we
 * avoid calling setState inside useEffect.
 */
let _lenisInstance: Lenis | null = null;
export function _setLenisInstance(l: Lenis | null) {
  _lenisInstance = l;
}
export function _getLenisInstance(): Lenis | null {
  return _lenisInstance;
}
