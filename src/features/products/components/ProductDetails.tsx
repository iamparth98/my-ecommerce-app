'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Star, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { fetchProductById } from '@/services/products.api';
import { Product } from '@/types';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import { formatPrice } from '@/shared/utils/formatPrice';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const data = await fetchProductById(id as string);
          setProduct(data);
        } catch (error) {
          console.error('Failed to load product', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
     return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product Image */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <div className="relative h-[300px] sm:h-[400px] w-full">
                <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain object-center"
                priority
                />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="mb-4">
             <Link href="/" className="text-sm text-blue-600 hover:underline flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to products
             </Link>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl font-medium">{formatPrice(product.price)}</p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 flex-shrink-0 ${
                          product.rating.rate > rating ? 'fill-current' : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{product.rating.count} reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>
            
            <div className="mt-6">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 uppercase">
                    {product.category}
                </span>
            </div>
          </section>

          <div className="mt-10">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
