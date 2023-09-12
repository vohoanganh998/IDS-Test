import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload || null;
    },
  },
});
// Reducer
export const { setUser } = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
