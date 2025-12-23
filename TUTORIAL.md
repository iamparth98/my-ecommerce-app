# Ultimate Guide to Building the "ShopMaster" E-commerce App

This tutorial breaks down exactly how this application was built, explaining the *why* behind every decision. It covers Next.js internals, Redux state management, and professional best practices.

---

## 1. Project Architecture: Domain-Driven Design (DDD)

Instead of grouping files by type (putting all components in `components/`, all hooks in `hooks/`), we grouped them by **Feature**.

**Structure:**
```text
src/
├── features/             # The "Brain" of your app
│   ├── auth/             # Login logic, state, and forms
│   ├── cart/             # Cart calculations, state, and UI
│   └── products/         # Product fetching, filtering, and listing
├── shared/               # Dumb UI components used everywhere (Buttons, Navbar)
└── app/                  # The "Router" (Next.js App Router)
```

**Why?**
*   **Scalability:** If you need to fix the "Cart", you only look in `features/cart`. You don't have to jump between 5 different folders.
*   **Maintenance:** Deleting a feature is easy; just delete its folder.

---

## 2. Next.js Core Concepts Used

### A. App Router (`src/app`)
We used the modern **App Router**, where file paths become URLs.
*   `src/app/page.tsx` -> `http://localhost:3000/`
*   `src/app/cart/page.tsx` -> `http://localhost:3000/cart`

### B. Server-Side Rendering (SSR) vs. Static Site Generation (SSG)

*   **Static (SSG) - The Home Page (`/`):**
    By default, Next.js tries to render pages at **build time**. Our Home page uses client-side fetching inside `useEffect`, effectively making it a **Client-Side Rendered (CSR)** shell that is statically served.
    
    *Professional Tip:* Ideally, for better SEO, we should fetch products *directly in the component* (making it an Async Server Component). We used CSR here to easily integrate with Redux, which lives on the client.

*   **Dynamic (SSR) - Product Page (`/product/[id]`):**
    The `[id]` folder tells Next.js this is dynamic.
    ```tsx
    // src/app/product/[id]/page.tsx
    export default function ProductPage({ params }: { params: { id: string } }) { ... }
    ```
    Every time a user visits `/product/5`, Next.js on the server figures out what "5" is and renders the page.

### C. Image Optimization
We used `<Image />` from `next/image` instead of `<img>`.
*   **Why?** It automatically resizes images for mobile/desktop, converts them to modern formats (WebP), and lazy loads them to speed up the page.

---

## 3. Redux Toolkit (Global State)

We used **Redux Toolkit (RTK)** to manage data that needs to be accessed everywhere (like the Cart count in the Navbar).

### Key Concepts
1.  **Slices (`createSlice`):** A bundle of the initial state and the functions (reducers) to change it.
    *   *Example:* `cartSlice.ts` handles `addToCart`, `removeFromCart`.
2.  **Immutability:** Redux Toolkit uses a library called `Immer` internally.
    *   *Old Redux:* `return { ...state, count: state.count + 1 }` (Hard to read)
    *   *RTK:* `state.count += 1` (Easy! It looks mutable, but it's safe).
3.  **Thunks (`createAsyncThunk`):** Used for Async logic (fetching API data) inside Redux.
    *   See `productSlice.ts`: It has `pending`, `fulfilled`, and `rejected` states to handle loading spinners automatically.

---

## 4. Best Practices We Followed

1.  **Typed Hooks:**
    We didn't use `useSelector` directly. We created `useAppSelector` in `store/hooks.ts`.
    *   *Why?* So TypeScript knows exactly what your state looks like without you having to type `(state: RootState)` every single time.

2.  **Service Layer Pattern:**
    We didn't call `axios.get()` inside our components. We made a separate file `services/products.api.ts`.
    *   *Why?* If the API URL changes, you only fix it in one place, not in 50 components.

3.  **Strict TypeScript Interfaces:**
    We defined `Product` and `CartItem` types in `types/index.ts`. We never used `any`.

---

## 5. Common Anti-Patterns (Mistakes to Avoid)

### ❌ 1. The "Prop Drilling" Trap
**Bad:** Passing `user` from `Layout` -> `Navbar` -> `ProfileDropdown` -> `Avatar`.
**Good:** Using Redux (or Context) to access `user` directly in `Avatar`.

### ❌ 2. Putting Everything in Global State
**Bad:** Storing `isDropdownOpen` or `searchInputValue` in Redux.
**Good:** Keep UI state (like open/close menus) inside the component using `useState`. Only put *data* (Products, User, Cart) in Redux.

### ❌ 3. Fetching Data in `useEffect` (Waterfall)
**Bad:**
```tsx
useEffect(() => {
  fetchUser().then(() => {
    fetchOrders(); // Waits for user to finish! Slower.
  })
}, [])
```
**Good:** Use `Promise.all` or Server Components to fetch in parallel.

### ❌ 4. Not Handling Loading/Error States
**Bad:** Assuming the API always works. The screen goes blank if it fails.
**Good:** We added `isLoading` and `error` flags in our Redux slices and showed a `<Loader2 />` spinner in the UI.

---

## 6. How to Recreate This Yourself

1.  **Scaffold:** `npx create-next-app@latest my-shop --typescript --tailwind --redux`
2.  **Plan:** Draw your features on paper (Auth, Cart, Shop).
3.  **Structure:** Create the `features/` folders first.
4.  **Data:** Write your `types` and `api` services.
5.  **State:** Build your Redux Slices.
6.  **UI:** Build dumb components (`ProductCard`), then connect them to Redux.
