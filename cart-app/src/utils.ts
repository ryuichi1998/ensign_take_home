export const formatPrice = (price: number) => `${price.toFixed(2)}`;

export const formatRating = (rating: number) => rating.toFixed(1);

export const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatDate = (date: Date) => date.toLocaleDateString();

export const incrementQuantity = (current: number) => current + 1;

export const decrementQuantity = (current: number) => current - 1;
