import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import storeReducer from './storeSlice'
import categoryReducer from './categorySlice'

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
        stores: storeReducer,
        category: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
