import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreLoginType {
  apiLoader: boolean;
  loginData: Object;
  registerData: Object;
  error: boolean;
}

export const initialState: PreLoginType = {
  apiLoader: false,
  loginData: {},
  registerData: {},
  error: false,
};

const preLogin = createSlice({
  name: "preLogin",
  initialState: initialState,
  reducers: {
    updateApiLoader: (state, action: PayloadAction<any>) => {
      //console.log('Update API LOADER : ', action);
      state.apiLoader = action.payload?.apiLoader;
    },
  },
});

export const { updateApiLoader } = preLogin.actions;
export default preLogin;
