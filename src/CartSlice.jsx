import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Initialize totalQuantity
    totalAmount: 0, // Initialize totalAmount
},
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (!existingItem) {
        // state.items = [...state.items, { ...newItem, quantity: 1 }];
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
        // state.items = state.items.map(item =>
        //     item.name === newItem.name ? { ...item, quantity: item.quantity + 1 } : item
        // );
      }
      state.totalQuantity++;
      state.totalAmount += parseFloat(newItem.cost.replace('$', '')); // Update total amount
    },
    removeItem: (state, action) => {
        const name = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= (parseFloat(existingItem.cost.replace('$', '')) * existingItem.quantity);
        state.items = state.items.filter(item => item.name !== name);
      }

    },    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += (quantityDiff * parseFloat(item.cost.replace('$', ''))); // Update total amount
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer; 

