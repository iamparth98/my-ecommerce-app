'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProducts, filterByCategory } from '@/features/products/productSlice';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { filteredItems, isLoading, error, selectedCategory, items } = useAppSelector(
    (state) => state.products
  );

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(items.map((p) => p.category)))];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 w-20 bg-gray-200 animate-pulse rounded-full" />
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        <p>Error loading products: {error}</p>
        <button 
            onClick={() => dispatch(getProducts())}
            className="mt-4 text-blue-600 underline"
        >
            Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(filterByCategory(cat))}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
