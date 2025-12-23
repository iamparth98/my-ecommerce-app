'use client';

import { useAppSelector } from '@/store/hooks';
import { useCheckout } from '@/features/checkout/useCheckout';
import { Loader2, CreditCard } from 'lucide-react';
import { formatPrice } from '@/shared/utils/formatPrice';

export default function CartSummary() {
  const { totalAmount, totalQuantity } = useAppSelector((state) => state.cart);
  const { handleCheckout, isProcessing } = useCheckout();

  if (totalQuantity === 0) return null;

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">{formatPrice(totalAmount)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">{formatPrice(totalAmount)}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isProcessing ? (
             <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
             <CreditCard className="h-5 w-5 mr-2" />
          )}
          Checkout
        </button>
      </div>
    </section>
  );
}
