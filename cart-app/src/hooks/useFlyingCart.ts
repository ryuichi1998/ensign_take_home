import { useCallback } from "react";

interface FlyingCartOptions {
  duration?: number;
}

export const useFlyingCart = (options: FlyingCartOptions = {}) => {
  const { duration = 400 } = options;

  const flyToCart = useCallback(
    (sourceElement: HTMLElement) => {
      const cartElement = document.querySelector(
        "[data-cart-icon]"
      ) as HTMLElement;
      if (!cartElement || !sourceElement) return;

      const sourceIcon = sourceElement.querySelector("svg") as SVGElement;
      if (!sourceIcon) return;

      const sourceIconRect = sourceIcon.getBoundingClientRect();
      const cartRect = cartElement.getBoundingClientRect();

      const flyingIcon = sourceIcon.cloneNode(true) as SVGElement;

      flyingIcon.style.position = "fixed";
      flyingIcon.style.top = `${sourceIconRect.top}px`;
      flyingIcon.style.left = `${sourceIconRect.left}px`;
      flyingIcon.style.width = `${sourceIconRect.width}px`;
      flyingIcon.style.height = `${sourceIconRect.height}px`;
      flyingIcon.style.zIndex = "9999";
      flyingIcon.style.pointerEvents = "none";
      flyingIcon.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      flyingIcon.style.color = "#3b82f6"; // Blue color to make it visible
      flyingIcon.style.fill = "currentColor";
      flyingIcon.classList.add("flying-cart-icon");

      document.body.appendChild(flyingIcon);

      requestAnimationFrame(() => {
        flyingIcon.style.top = `${cartRect.top + cartRect.height / 2 - 12}px`;
        flyingIcon.style.left = `${cartRect.left + cartRect.width / 2 - 12}px`;
        flyingIcon.style.width = "24px";
        flyingIcon.style.height = "24px";
        flyingIcon.style.opacity = "0";
        flyingIcon.style.transform = "scale(0.3) rotate(360deg)";
      });

      const cartIcon = cartElement.querySelector("svg");
      if (cartIcon) {
        cartIcon.style.transform = "scale(1.3)";
        cartIcon.style.transition =
          "transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)";

        setTimeout(() => {
          cartIcon.style.transform = "scale(1)";
        }, 300);
      }

      setTimeout(() => {
        flyingIcon.remove();
      }, duration + 100);
    },
    [duration]
  );

  return { flyToCart };
};
