# Expo WebBrowser Blocked Popup Reproduction (With Fix)

[![expo](https://img.shields.io/badge/Expo-WebBrowser-blue.svg)](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
[![status](https://img.shields.io/badge/Fix-Patched%20Build%20Included-brightgreen.svg)](#)


This repository serves as a minimal reproduction of a bug in `expo-web-browser` and includes the pre-packaged fix for verification.

> **Related PR:** [expo/expo#41179](https://github.com/expo/expo/pull/41179)

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
   cd expo-web-browser-blocked-popup-repro/test-app
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
   - The included `.tgz` (`expo-web-browser-15.0.7.tgz`) will not be automatically installed by `npm install` when running in the `test-app` folder. 

   Install it manually using one of the commands below from the `test-app` directory:
     - `npm install ./expo-web-browser-15.0.7.tgz`
     - `npm install /full/path/to/expo-web-browser-15.0.7.tgz`
     - Or run `npm install ` then drag-and-drop the `expo-web-browser-15.0.7.tgz` file into your terminal to paste the path, then press Enter.

   - To reproduce a blocked popup you can either enable your browser's popup blocking or run the app in Incognito/Private mode (which often blocks automatic popups). 
   
   Steps to Block Popups in Common Browsers

   | Browser        | Steps to Block Popups                                                                                  |
   |----------------|-------------------------------------------------------------------------------------------------------|
   | Chrome         | Settings → Privacy and security → Site Settings → Pop-ups and redirects → set to Blocked               |
   | Safari (macOS) | Safari → Settings → Websites → Pop-up Windows → choose Block for the site or When visiting other websites: Block |
   | Firefox        | Preferences → Privacy & Security → Permissions → check Block pop-up windows                            |

   **Note:** You can also test inside in-app browsers (Instagram/Facebook), where popups are often blocked by design.  
   The test app triggers `WebBrowser.openBrowserAsync()` automatically on mount to simulate the condition.

   - Expected Result: The popup is blocked and the app displays `"BLOCKED! Error caught: ERR_WEB_BROWSER_BLOCKED"` (or shows an error alert), indicating the patched `expo-web-browser` correctly detects blocked popups.|
   

     https://github.com/user-attachments/assets/75894291-60b5-4fd8-9f84-46a0fbe7ea5c



   - Without the fix, the app will often display `"FAILED TO BLOCK"` because the library incorrectly returns a success result even when the browser blocked the popup.
 


     https://github.com/user-attachments/assets/2b51f444-4946-4913-8ae2-b2c5a0985915

 ## The Problem vs. The Fix

| Feature | Without Fix (Current Behavior) | With Fix (Patched) |
| :--- | :--- | :--- |
| **Scenario** | `window.open()` is blocked by the browser (e.g., inside Instagram/Facebook or no user gesture). | `window.open()` is blocked by the browser. |
| **Result** | **Silent Failure.** <br> Resolves with `{ type: "opened" }` as if it succeeded. | **Error Thrown.** <br> Rejects with `ERR_WEB_BROWSER_BLOCKED`. |
| **User Exp** | App thinks popup opened; User sees nothing. | App catches error; User gets a fallback/alert. |
