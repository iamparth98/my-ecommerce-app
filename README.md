# ShopMaster - Next.js E-commerce Application

A professional e-commerce application built with Next.js 14+, Redux Toolkit, and TypeScript.

## Features

- **Product Catalog**: Fetches real-time data from FakeStoreAPI.
- **Cart Management**: Global state management with Redux (Add, Remove, Update Quantity).
- **Authentication**: Mock login flow with persistent user state.
- **Payment**: Razorpay integration (Test Mode).
- **Architecture**: Domain-Driven Design (Feature-based folder structure).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **Testing**: Jest & React Testing Library
- **Icons**: Lucide React

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000)

3.  **Run Tests**
    ```bash
    npm test
    ```

## Project Structure

```
src/
├── app/                  # Routing Layer
├── features/             # Business Logic (Auth, Cart, Products)
├── shared/               # Reusable Components & Hooks
├── store/                # Redux Store Configuration
└── services/             # API Integration
```