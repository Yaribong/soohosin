export const formatNumber = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return numValue.toLocaleString();
}; 