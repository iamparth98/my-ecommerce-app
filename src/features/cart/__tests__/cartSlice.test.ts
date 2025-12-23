import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../cartSlice';
import { Product } from '@/types';

describe('cartSlice', () => {
  const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };

  const sampleProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Desc',
    category: 'test',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 },
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToCart', () => {
    const actual = cartReducer(initialState, addToCart(sampleProduct));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].quantity).toEqual(1);
    expect(actual.totalAmount).toEqual(100);
  });

  it('should handle addToCart existing item', () => {
    const stateWithItem = cartReducer(initialState, addToCart(sampleProduct));
    const actual = cartReducer(stateWithItem, addToCart(sampleProduct));
    expect(actual.items[0].quantity).toEqual(2);
    expect(actual.totalAmount).toEqual(200);
  });

  it('should handle updateQuantity', () => {
    let state = cartReducer(initialState, addToCart(sampleProduct));
    state = cartReducer(state, updateQuantity({ id: 1, quantity: 5 }));
    expect(state.items[0].quantity).toEqual(5);
    expect(state.totalAmount).toEqual(500);
  });

  it('should handle removeFromCart', () => {
    let state = cartReducer(initialState, addToCart(sampleProduct));
    state = cartReducer(state, removeFromCart(1));
    expect(state.items.length).toEqual(0);
    expect(state.totalQuantity).toEqual(0);
  });
});
