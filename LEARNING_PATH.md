# Learning Path: Mastering the ShopMaster Stack

This roadmap covers every concept used to build this e-commerce application, organized by technology. Mastering these topics will allow you to build similar production-ready apps from scratch.

---

## 1. TypeScript (The Language)
*   **Basic Types & Interfaces**
    *   Defining data shapes (`interface Product`, `interface User`).
    *   Optional properties (`token?: string` in User).
    *   *Used in:* `src/types/index.ts`.
*   **Generics**
    *   Understanding `Promise<T>` for async functions.
    *   Using `PayloadAction<T>` in Redux reducers.
    *   Axios Response types: `axios.get<T[]>`.
*   **React Specific Types**
    *   `React.ReactNode` (typing `children` props in Providers/Layouts).
    *   `React.FormEvent` (typing form submissions in Login).
    *   `React.HTMLAttributes<HTMLDivElement>` (passing props to Skeleton wrapper).
*   **Module Augmentation**
    *   Extending the global `window` object (adding `Razorpay`).
    *   *Used in:* `src/features/checkout/useCheckout.ts`.

## 2. React (The UI Library)
*   **Functional Components**
    *   Creating reusable components (`ProductCard`, `Navbar`).
    *   Props destructuring.
*   **Hooks (Core)**
    *   `useState`: Managing local UI state (inputs, loading flags).
    *   `useEffect`: Triggering side effects (fetching data on mount).
    *   *Used in:* `ProductList.tsx`, `ProductDetails.tsx`.
*   **Event Handling**
    *   `onClick`, `onChange` (Inputs), `onSubmit` (Forms).
    *   **Event Propagation:** `e.stopPropagation()` (preventing parent clicks on "Add to Cart").
    *   `e.preventDefault()` (stopping form reload).
*   **Conditional Rendering**
    *   Ternary operators (`isLoading ? <Skeleton /> : <Content />`).
    *   Short-circuit evaluation (`user && <span>Hi {user}</span>`).
    *   Rendering Lists (`items.map(...)`).
*   **Custom Hooks**
    *   Encapsulating complex logic (`useCheckout`).

## 3. Next.js 14+ (The Framework)
*   **App Router Structure**
    *   File-system routing (`app/page.tsx` vs `app/cart/page.tsx`).
    *   `app/layout.tsx`: Root layout and wrapping providers.
*   **Navigation**
    *   `<Link>` component: Declarative navigation (Navbar).
    *   `useRouter()` hook: Programmatic navigation (Redirecting after login).
*   **Client vs. Server Components**
    *   `'use client'`: When to use it (Hooks, State, Event Listeners).
    *   Default Server Components (Metadata, Initial Load).
*   **Dynamic Routing**
    *   Using `[id]` folders for wildcards.
    *   `useParams()` hook to read URL parameters (Product ID).
*   **Assets & Optimization**
    *   **Images:** `next/image` (`fill`, `priority`, `sizes`, `remotePatterns`).
    *   **Fonts:** `next/font/google` (Variable fonts setup in `layout.tsx`).
*   **Configuration**
    *   Path Aliases (`@/features/...` configured in `tsconfig.json`).

## 4. Redux Toolkit (State Management)
*   **Store Configuration**
    *   `configureStore`: Combining reducers.
    *   `Provider`: Wrapping the app in `src/app/providers.tsx`.
*   **Slices (`createSlice`)**
    *   Initial state definition.
    *   Reducers: Synchronous actions (`addToCart`).
    *   **Immer Library:** Mutating state directly (`state.items.push`).
*   **Async Logic (`createAsyncThunk`)**
    *   Handling API calls within Redux.
    *   Lifecycle actions: `.pending`, `.fulfilled`, `.rejected`.
    *   *Used in:* `productSlice.ts` (fetching products).
*   **Typed Hooks**
    *   `TypedUseSelectorHook`: Creating `useAppSelector` for type safety.
    *   `useDispatch` with `AppDispatch`.

## 5. JavaScript / ES6+ Fundamentals (Crucial Logic)
*   **Array Methods**
    *   `.map()`: Transforming data to JSX.
    *   `.filter()`: Removing items from Cart.
    *   `.reduce()`: Calculating Cart Totals (Price * Quantity).
    *   `.find()`: Checking if an item already exists in the Cart.
    *   `.includes()`: Search filter logic.
*   **Sets**
    *   `new Set()`: Extracting unique categories from the product list.
*   **Browser APIs**
    *   `localStorage`: Persisting User login state.
    *   `Intl.NumberFormat`: Formatting currency (`formatPrice` utility).
    *   `setTimeout`: Simulating API delays.
    *   `window`: Accessing global objects.

## 6. HTTP & APIs
*   **Axios Library**
    *   Creating instances (`axios.create` with `baseURL`).
    *   HTTP Methods: `GET`.
*   **Service Layer Pattern**
    *   Decoupling API calls (`services/products.api.ts`) from components.
*   **Script Loading**
    *   Dynamically loading external SDKs (Razorpay) using `document.createElement('script')`.

## 7. CSS & Styling (Tailwind + Design)
*   **Tailwind CSS v4**
    *   **Directives:** `@import "tailwindcss"`.
    *   **Theme Configuration:** `@theme` blocks in CSS.
    *   **Utility Classes:** Flexbox, Grid, Spacing, Typography.
*   **CSS Variables**
    *   Defining `:root` variables (`--background`, `--foreground`).
    *   Using variables in Tailwind (`bg-[var(--background)]`).
*   **Responsive Design**
    *   Breakpoints: `sm:`, `md:`, `lg:`.
    *   Display toggles: `hidden sm:block`.
*   **Animations**
    *   `animate-pulse` (Skeleton loading), `animate-spin` (Spinners).
*   **Helpers**
    *   `clsx` & `tailwind-merge`: Merging classes conditionally (`cn` utility).
*   **Iconography**
    *   `lucide-react`: Using SVG icons as React components (`<ShoppingCart />`).

## 8. Semantic HTML & Accessibility (A11y)
*   **Semantic Structure**
    *   `<nav>`, `<main>`, `<footer>`: High-level structure.
    *   `<section>`: Grouping content.
    *   `<dl>`, `<dt>`, `<dd>`: Description Lists (Used in Cart Summary).
*   **Screen Readers**
    *   `sr-only`: Hiding text visually but keeping it for screen readers.
    *   `aria-label`: Describing icon-only links.
    *   `aria-labelledby`: associating headings with sections.

## 9. Tooling & Testing
*   **Jest & React Testing Library**
    *   Unit Testing Reducers & Components.
    *   Mocking (`jest.mock`) external modules.
    *   Queries (`getByText`, `getByRole`).
*   **Package Management**
    *   `package.json`: Scripts (`dev`, `build`, `test`) and Dependencies.
*   **Linting**
    *   ESLint configuration (implicit in `next.config.ts`).
