import ProductList from '@/features/products/components/ProductList';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          New Arrivals
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Discover our latest collection of premium products at unbeatable prices.
        </p>
      </div>
      <ProductList />
    </div>
  );
}