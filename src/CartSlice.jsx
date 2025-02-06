import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost } = action.payload;
        const existingItem = state.cart.find(item => item.name === name);
        if(existingItem){
            existingItem.quantity++;
        }else{
            state.cart.push({name, image, cost, quantity:1 });
        }
    },
    removeItem: (state, action) => {
        state.cart= state.cart.filter( item => item.name !== action.payload);
    },    
    updateQuantity: (state, action) => {
        const {name, quantity} =action.payload;
        const itemToUpdate = state.cart.find(item => item.name === name);
        if(itemToUpdate){
            itemToUpdate.quantity = quantity;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;


