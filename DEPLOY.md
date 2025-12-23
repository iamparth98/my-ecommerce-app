# How to Deploy ShopMaster to Vercel (Free)

Your app is fully configured for Vercel. Follow these steps:

## Prerequisites
1.  A GitHub account.
2.  A Vercel account (Login with GitHub).

## Step 1: Push Code to GitHub
(If you haven't already)
1.  Create a new repository on GitHub.
2.  Run these commands in your terminal:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

## Step 2: Deploy on Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.

## Step 3: Configure Environment Variables
In the "Configure Project" screen:
1.  Expand the **"Environment Variables"** section.
2.  Add your Razorpay Key:
    *   **Name:** `NEXT_PUBLIC_RAZORPAY_KEY_ID`
    *   **Value:** `rzp_test_your_actual_key` (Or keep the default mock key if you just want to test simulation).

## Step 4: Click Deploy!
Vercel will build your app. In about 1 minute, you will get a live URL (e.g., `https://shopmaster.vercel.app`).

## Troubleshooting
*   **Images not loading?**
    Ensure `next.config.ts` includes `fakestoreapi.com` (We already did this!).
*   **Payment failed?**
    Check that your Environment Variable name matches exactly: `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
