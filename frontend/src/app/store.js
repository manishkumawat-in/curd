import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import customersReducer from "../features/customer/customerSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customersReducer,
    },
});