import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";  // OK
import userReducer from "./slices/userSlice";  // ✅ Importação correta
import photoReducer from './slices/photoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer
  },
});
