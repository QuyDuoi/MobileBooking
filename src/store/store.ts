import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import storeReducer from './storeSlice'

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
        stores: storeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
