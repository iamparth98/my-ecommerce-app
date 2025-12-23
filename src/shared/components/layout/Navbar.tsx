'use client';

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogOut, Package } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';

export default function Navbar() {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ShopMaster</span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link href="/" className="hidden sm:block text-gray-700 hover:text-blue-600 font-semibold transition-colors cursor-pointer">
              Home
            </Link>
            
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" aria-label="View Cart">
              <ShoppingCart className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
                <span className="hidden md:inline text-sm font-semibold text-gray-700">Hi, {user.username}</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold cursor-pointer"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
