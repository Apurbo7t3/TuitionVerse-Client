import { puter } from "@heyputer/puter.js";

const TOKEN = import.meta.env.VITE_PUTER_TOKEN;

if (!TOKEN) {
  console.error("Missing VITE_PUTER_TOKEN environment variable");
} else {
  puter.auth.autoConfiguredToken = TOKEN;

  window.__puterSignInPromise = puter.auth
    .signInWithToken(TOKEN)
    .catch((err) => {
      console.error("Puter sign-in failed:", err);
    });
}
