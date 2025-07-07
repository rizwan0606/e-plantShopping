import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to the cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        // Increment the quantity if the item already exists
        existingItem.quantity += 1;
      } else {
        // Add a new item to the cart
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Remove an item from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        if (quantity > 0) {
          // Update the item's quantity
          item.quantity = quantity;
        } else {
          // Remove the item if quantity is 0
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to configure the store
export default CartSlice.reducer;