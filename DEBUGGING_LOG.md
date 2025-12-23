# Debugging Log & Error Analysis

This document serves as a technical retrospective of the errors encountered during the development of the ShopMaster application. It explains the root causes, the debugging process, and the final resolutions.

---

## 1. Next.js Image Security Restriction

### The Error
```text
Error: Invalid src prop (https://fakestoreapi.com/img/...) on `next/image`, 
hostname "fakestoreapi.com" is not configured under images in your `next.config.js`
```

### What It Means
Next.js optimizes images (resizing, format conversion) on the server. To prevent your server from being used as an open proxy to fetch and optimize malicious or huge images from anywhere on the internet, Next.js requires an **allowlist** of external domains.

### Debugging & Resolution
1.  **Analysis:** The error explicitly stated the missing configuration.
2.  **Fix:** We modified `next.config.ts` to include `remotePatterns`.

```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'fakestoreapi.com',
    },
  ],
}
```

---

## 2. Jest Test Regression (Currency Change)

### The Error
```text
TestingLibraryElementError: Unable to find an element with the text: $99.99.
```

### What It Means
This is a **Regression**. We modified the application code to display prices in INR (`₹8,299`), but the test code was still looking for the hardcoded USD string (`$99.99`). This proves the value of automated testing: it caught a discrepancy between expected behavior and actual output.

### Debugging & Resolution
1.  **Analysis:** Ran `npx jest` after implementing the INR feature. The test failed.
2.  **Root Cause:** Hardcoded values in tests make them brittle.
3.  **Fix:** We imported the exact same logic used in the component (`formatPrice`) into the test.

```typescript
// BEFORE (Brittle)
expect(screen.getByText('$99.99')).toBeInTheDocument();

// AFTER (Robust)
import { formatPrice } from '@/shared/utils/formatPrice';
expect(screen.getByText(formatPrice(99.99))).toBeInTheDocument();
```

---

## 3. TypeScript Build Error (Next.js Config)

### The Error
```text
Type error: Object literal may only specify known properties, 
and 'appIsrStatus' does not exist in type ...
```

### What It Means
We tried to disable the development indicators (the little toast notifications like "Compiling...") using `devIndicators` in `next.config.ts`.
However, because we are using `next.config.ts` (TypeScript) instead of `next.config.js` (JavaScript), Next.js performs **Strict Type Checking** on the configuration object. The properties `appIsrStatus` and `buildActivity` were either not present in the type definition for the installed version of Next.js or are considered internal/unstable API surfaces not exposed in the public `NextConfig` type.

### Debugging & Resolution
1.  **Analysis:** The build failed during the `npm run build` step specifically at the Type Checking phase.
2.  **Action:** We removed the `devIndicators` block.
3.  **Lesson:** When using TypeScript config files, you cannot pass arbitrary or undocumented flags; they must match the interface defined by the framework exactly.

---

## 4. UI/UX "Silent" Bugs

These weren't console errors, but they were critical usability failures.

### A. Non-Responsive Layout
*   **Issue:** Tables and grids looked broken on mobile.
*   **Fix:**
    *   Used `hidden sm:block` to hide text on small screens.
    *   Used `flex-wrap` to allow buttons to drop to a new line.
    *   Changed fixed heights `h-[400px]` to responsive heights `h-[300px] sm:h-[400px]`.

### B. "Invisible" Inputs
*   **Issue:** The default border color of inputs was too light against the white background, failing accessibility standards.
*   **Fix:** Forced `border-gray-400` and added `focus:ring-blue-600` to provide clear visual feedback to the user.

---

## Summary of Debugging Strategy

1.  **Read the Error Message:** 90% of the solution is usually in the error text (e.g., the Next.js image error).
2.  **Isolate the Change:** When the test failed, we knew it was because we *just* added the currency feature.
3.  **Verify via Build:** Running `npm run build` is the ultimate truth test. It catches type errors that might be ignored in development mode.
