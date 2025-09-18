# Shopping Cart Application

Responsive shopping cart application built with React, TypeScript, and Redux Toolkit, designed with custom Tailwind CSS components. Product display using FakeStoreAPI and cart management with local persistance storage.

## Stack

- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite 7.1.2 + SWC
- **State Management**: Redux Toolkit 2.9.0 + RTK Query
- **Routing**: React Router 7.9.1
- **Styling**: Tailwind CSS 4.1.13
- **Icons**: Lucide React 0.544.0
- **Persistence**: Redux Persist 6.0.0
- **Testing**: Vitest 3.2.4 + React Testing Library

## Prerequisites

- Node.js (version 18 or higher) using v24.8.0
- npm or yarn package manager

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ryuichi1998/ensign_take_home.git
   cd cart-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
4. **Run test suite**
   ```bash
   npm run test
   ```
   
## Technical Decisions 

### State Management
**Choice**: Redux Toolkit (RTK) + RTK Query

**Reasoning**:
- I had previous experniece using this and really like it.
- Ability to generate API endpoint hooks
- Built-in loading states and error handling for RTK Query
- Works really well with Redux Persist for cart persistence

### API Integration
**Endpoints Used**:
```typescript
export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => `/products`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});
```

**Decision**: Only used products endpoints from Fake Store API

**Reasoning**:
- Cart functionality is handled client-side with Redux state
- No need for user authentication which is required to use cart endpoints from Fake Store API

### Assumptions

#### Cart Counter Logic
- Cart badge should only show counter for unique products, not total quantity 

**Reasoning**:
- Prevents UI overcrowding with high quantities
- Common pattern in modern e-commerce (Shopee, etc.)
- Better user experience for cart overview

#### Item Removal Methods in Cart Page
- Two ways to remove items
1. Dedicated "Remove" button
2. Decrement quantity to 0

**Reasoning**:
- Provides flexible user interaction patterns
- Intuitive quantity management
- Reduces accidental removals

#### Pricing & Calculations
**Assumptions**:
- Prices are pre-tax amounts
- Tax rate: 9%
- Shipping: $1.99 (free over $50)
- Only selected items are included in checkout totals

**Reasoning**:
- Selective checkout common in modern carts
- Clear separation between cart storage and checkout intent

## Testing 

Vitest (Jest) + React Testing Library

### 1. Empty Cart State
- Displays appropriate empty cart messaging
- Shows correct cart count (0)
- Handles no-selection scenarios

### 2. Quantity Management
- Increment/decrement button functionality
- Automatic removal when quantity reaches 0
- Quantity display accuracy

### 3. Item Selection System
- Individual item selection via checkboxes
- Select All/Deselect All functionality
- Visual feedback for selected items
- Selected items count display
- Select All state reflects individual selections

### 4. Cart Operations
- Item removal functionality
- Complete cart clearing
- State consistency after operations

### 5. Order Summary Calculations
- Subtotal calculations (selected items only)
- Tax calculation accuracy (9%)
- Shipping logic ($1.99 under $50, free over $50)
- Final total computation
- Checkout button state management

## Custom Components & Hooks

### Cart Components
- **CartHeader**: Multi-item selection management with "Select All" functionality
- **CartItem**: Individual cart item with quantity controls, selection, and removal
- **CartSummary**: Real-time order calculations with tax and shipping logic

### Product Components
- **ProductCard**: Responsive product grid items with ratings and category tags
- **ProductDetail**: Comprehensive product view with quantity selector
- **StarRating**: Configurable star rating display component
- **AddToCartButton**: Enhanced button with flying animation effect

### Loading & Error States
- **ProductGridSkeleton**: Animated loading placeholders for product grids
- **ProductDetailSkeleton**: Loading state for individual product pages
- **ProductNotFound**: User-friendly error handling for missing products

### Navigation & Layout
- **Navbar**: Sticky navigation with animated cart badge counter
- **Layout**: Consistent page wrapper with navigation integration

### Custom Hooks
- **useAddToCart**: Manages product quantity selection and cart addition logic
- **useFlyingCart**: Creates animated flying effect from add-to-cart buttons to cart icon
