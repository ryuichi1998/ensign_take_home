import { Link } from "react-router";
import { ShoppingCart, Package } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Navbar = () => {
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.totalItems
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="page-container">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Package className="w-6 h-6" />
            <span>CartCart</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              data-cart-icon
            >
              <ShoppingCart className="w-6 h-6" />

              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
              <span className="sr-only">
                Shopping cart with {cartItemCount} items
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
