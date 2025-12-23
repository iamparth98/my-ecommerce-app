'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import CartItemRow from '@/features/cart/components/CartItemRow';
import CartSummary from '@/features/cart/components/CartSummary';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          {items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding some items.</p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {items.map((item) => (
                <li key={item.id}>
                    <CartItemRow item={item} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <CartSummary />
      </div>
    </div>
  );
}
