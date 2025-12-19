'use client'
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './features/api/apiSlice'
import authReducer from "./features/auth/authSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// call the loaduser token function on every page load
const initializeApp = async () => {
    try {
        await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));

        await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
    } catch (err) {
        console.log('initializeApp error', err);
    }
}

initializeApp();