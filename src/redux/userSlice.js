import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    surname: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    putUserInfo: (state, action) => {
      const { id, name, surname, email } = action.payload;
      state.user.id = id;
      state.user.name = name;
      state.user.surname = surname;
      state.user.email = email;
    },

    deleteUserInfo: (state, action) => {
      state.user.id = "";
      state.user.name = "";
      state.user.surname = "";
      state.user.email = "";
    },
  },
});

export const { putUserInfo, deleteUserInfo } = userSlice.actions;
export default userSlice.reducer;
