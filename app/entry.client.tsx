import { ThemeProvider } from "@material-tailwind/react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { theme } from "./common/themeSetting";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ThemeProvider value={theme}>
        <RemixBrowser />
      </ThemeProvider>
    </StrictMode >
  );
});
