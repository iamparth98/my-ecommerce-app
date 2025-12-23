export const formatPrice = (amount: number): string => {
  const conversionRate = 83; // 1 USD = 83 INR approx
  const priceInInr = amount * conversionRate;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(priceInInr);
};
