# Expo WebBrowser Blocked Popup Reproduction (With Fix)

This repository serves as a minimal reproduction of a bug in `expo-web-browser` and includes the pre-packaged fix for verification.

**The Issue:**
On the web, when `WebBrowser.openBrowserAsync()` is blocked by the browser (e.g., inside in-app browsers like Instagram/Facebook or when triggered without a user gesture), it incorrectly resolves with `{ type: "opened" }` instead of throwing an error.

**The Fix:**
This repository includes a local build (`.tgz`) of the modified `expo-web-browser` package that correctly checks for blocked popups and throws `ERR_WEB_BROWSER_BLOCKED`.

## Repository Contents

- **App Code:** A minimal Expo app that triggers `openBrowserAsync` on mount (simulating a blocked popup).
- **Patched Package:** `expo-web-browser-xx.x.x.tgz` (Located in the root). This contains the fix applied in the PR.

## How to Test the Fix

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/expo-web-browser-blocked-popup-repro.git
   cd expo-web-browser-blocked-popup-repro
   ```

2. **Install dependencies:**
   This will automatically install the included patched version of `expo-web-browser` from the local `.tgz` file.
   ```bash
   npm install
   ```

3. **Run on web:**
   ```bash
   npx expo start --web
   ```

4. **Verify the Fix:**
   - Open the URL in an Incognito window (or an environment that blocks popups).
   - The app will automatically try to open a popup.
   - **Expected Result:** The browser blocks the popup, and the app displays **"SUCCESS! Error Caught: ERR_WEB_BROWSER_BLOCKED"**.
   - **Note:** Without this fix, the app would display "FAILED TO BLOCK" as it would receive a false success signal.

