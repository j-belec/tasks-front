import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: false,
    user: {
      id: "",
      name: "",
      email: "",
    },
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
    setActualUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default configureStore({
  reducer: userSlice.reducer,
});
