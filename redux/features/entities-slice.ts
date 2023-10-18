import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  quantity: number;
}

interface EntitiesState {
  carts: CartItem[];
  products: any[];
}

const initialState = {
  carts: [],
  products: [],
} as EntitiesState;

export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return data;
  }
);

export const fetchCarts = createAsyncThunk(
  "products/fetchCarts",
  async (userId: string) => {
    const res = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    const data = await res?.json();

    return data;
  }
);

export const entities = createSlice({
  name: "entities",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.carts.find(
        (cartItem) => cartItem.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(
        (cart) => cart.productId !== action.payload
      );
    },
    removeAllFromCart: (state) => {
      state.carts = [];
    },
    decrementCartItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.carts.find(
        (cartItem) => cartItem.productId === action.payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove the item from the cart if the quantity becomes zero
          state.carts = state.carts.filter(
            (cart) => cart.productId !== action.payload
          );
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.carts = action.payload?.[0]?.products || [];
    });
  },
});

export const {
  addProduct,
  removeProduct,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  decrementCartItem,
} = entities.actions;
export default entities.reducer;
