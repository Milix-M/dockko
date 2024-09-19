import { ThemeProvider } from "@material-tailwind/react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ThemeProvider>
        <RemixBrowser />
      </ThemeProvider>
    </StrictMode>
  );
});
