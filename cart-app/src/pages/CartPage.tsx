import { useSelector } from "react-redux";
import { CartHeader } from "../components/CartHeader";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";
// import { EmptyCart } from "../components/Cart/EmptyCart";
import type { RootState } from "../store";

const CartPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <section className="bg-white py-4 sm:py-6 lg:py-8 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <CartHeader />

        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8 xl:gap-12">
          <div className="w-full lg:flex-1 lg:max-w-none xl:max-w-4xl">
            <div className="space-y-4 sm:space-y-6">
              {items.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
