import { useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { useFlyingCart } from "../hooks/useFlyingCart";

interface AddToCartButtonProps {
  onAddToCart: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AddToCartButton = ({
  onAddToCart,
  disabled,
  className = "",
  children,
}: AddToCartButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { flyToCart } = useFlyingCart();

  const handleClick = () => {
    if (buttonRef.current) {
      flyToCart(buttonRef.current);
    }

    setTimeout(() => {
      onAddToCart();
    }, 100);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      data-add-to-cart
    >
      {children || (
        <>
          <ShoppingCart className="w-5 h-5 -ms-2 me-2" />
          Add to cart
        </>
      )}
    </button>
  );
};
