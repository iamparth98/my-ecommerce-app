'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/features/cart/cartSlice';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    setIsProcessing(true);

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890';
    const isMockKey = key === 'rzp_test_1234567890';

    // SIMULATION MODE (For testing without a real Razorpay account)
    if (isMockKey) {
      console.log('Using Mock Key - Simulating Payment...');
      setTimeout(() => {
        alert('Payment Successful! (Simulation Mode)');
        dispatch(clearCart());
        setIsProcessing(false);
      }, 2000);
      return;
    }

    // REAL MODE (Loads Razorpay SDK)
    const loadScript = (src: string) => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    const options = {
      key: key,
      amount: Math.round(totalAmount * 100 * 83), // Convert USD to INR (approx) -> Paise
      currency: 'INR',
      name: 'ShopMaster',
      description: 'Test Transaction',
      image: 'https://fakestoreapi.com/icons/logo.png',
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        dispatch(clearCart());
        setIsProcessing(false);
      },
      prefill: {
        name: user.username,
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#2563EB',
      },
      modal: {
        ondismiss: function() {
            setIsProcessing(false);
        }
      }
    };

    try {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (err) {
        console.error("Payment Error", err)
        alert("Payment Initialization Failed");
        setIsProcessing(false)
    }
  };

  return { handleCheckout, isProcessing };
};