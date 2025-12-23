'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as ICartItem } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { updateQuantity, removeFromCart } from '@/features/cart/cartSlice';
import { formatPrice } from '@/shared/utils/formatPrice';

interface CartItemRowProps {
  item: ICartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center py-6 border-b border-gray-200 last:border-0">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="h-full w-full object-contain object-center p-2"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="line-clamp-1 mr-4">{item.title}</h3>
            <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm flex-wrap gap-2 mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              disabled={item.quantity <= 1}
              className="p-1 px-2 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 font-medium">{item.quantity}</span>
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              className="p-1 px-2 hover:bg-gray-100 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.id))}
            className="font-medium text-red-600 hover:text-red-500 flex items-center space-x-1 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
