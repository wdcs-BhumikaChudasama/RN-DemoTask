import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  data: {
    user: {
      isMfaEnabled: boolean;
      email: string;
      issuer: string;
      phoneNumber: string;
      publicAddress: string;
    };
  };
}

const initialState: UserState = {
  data: {
    user: {
      isMfaEnabled: false,
      email: "",
      issuer: "",
      phoneNumber: "",
      publicAddress: "",
    },
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<any>) => {
      state.data.user = { ...state.data.user, ...action.payload };
      console.log("DATAA", state.data.user);
    },
    resetUserData: (state, action: PayloadAction<any>) => {
      state.data = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserData, resetUserData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
