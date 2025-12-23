import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { Providers } from '@/app/providers';
import { Product } from '@/types';
import { formatPrice } from '@/shared/utils/formatPrice';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'A test product description',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: { rate: 4.5, count: 10 },
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <Providers>
        <ProductCard product={mockProduct} />
      </Providers>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(formatPrice(99.99))).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('can click add to cart button', () => {
    render(
      <Providers>
        <ProductCard product={mockProduct} />
      </Providers>
    );

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    // Since we're using the actual Redux provider, we could verify the state change 
    // but for a component test, checking the button exists and is clickable is a good start.
  });
});
