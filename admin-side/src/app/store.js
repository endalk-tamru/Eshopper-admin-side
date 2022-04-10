import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import productReducer from "../features/products/productSlice"
import reviewReducer from "../features/reviews/reviewSlice"
import userReducer from "../features/users/userSlice"
import orderReducer from "../features/orders/orderSlice"
import contactReducer from "../features/contacts/contactSlice"

export const store = configureStore({
  reducer: {    
    auth: authReducer,    
    products: productReducer,    
    reviews: reviewReducer,    
    users: userReducer,    
    orders: orderReducer,    
    contacts: contactReducer,    
  },  
});
