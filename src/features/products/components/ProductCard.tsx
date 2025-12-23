'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/cartSlice';

import { formatPrice } from '@/shared/utils/formatPrice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="relative h-64 w-full p-4 block bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-4">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600 font-medium">
            {product.rating.rate}
          </span>
          <span className="mx-1 text-gray-300">|</span>
          <span className="text-sm text-gray-400">
            {product.rating.count} reviews
          </span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold shadow-sm cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
