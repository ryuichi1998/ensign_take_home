import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectAllItems,
  clearSelection,
} from "../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../store";

export const CartHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalItems, items, selectedItems } = useSelector(
    (state: RootState) => state.cart
  );

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectAllItems());
    } else {
      dispatch(clearSelection());
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="select-all"
            checked={allSelected}
            onChange={handleSelectAllChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium text-gray-900 whitespace-nowrap"
          >
            Select All
          </label>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart ({totalItems})
        </h2>

        {selectedItems.length > 0 && (
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
            {selectedItems.length} selected
          </span>
        )}
      </div>
      <button
        onClick={handleClearCart}
        className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline whitespace-nowrap self-start sm:self-center"
      >
        Clear Cart
      </button>
    </div>
  );
};
