import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserData } from "../apiHandler/apiActions";

interface UserListType {
  failed: Boolean;
  loading: Boolean;
  userData: Object;
  newUserData: Array<any>;
  previousUserData: Array<any>;
}

export const initialState: UserListType = {
  failed: false,
  loading: false,
  userData: {},
  newUserData: [],
  previousUserData: [],
};

const userListSlice = createSlice({
  name: "UserList",
  initialState: initialState,
  reducers: {
    deleteItemFromList: (state, action: PayloadAction<any>) => {
      state.newUserData = state.newUserData.filter((item) => {
        return item?.email !== action.payload?.email;
      });
    },

    updateItemFromList: (state, action: PayloadAction<any>) => {
      state.newUserData = state.newUserData.filter((item) => {
        if (item?.email === action.payload?.email) {
          item.name.first = action.payload?.name?.first;
          item.name.last = action.payload?.name?.last;
          item.location.country = action.payload?.location?.country;
          item.dob.date = action.payload?.dob?.date;
        }

        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state, action) => {
      state.loading = true;
      state.failed = false;
    });

    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.failed = false;
      state.loading = false;
      state.newUserData = [...state.newUserData, ...action.payload?.results];

      if (action.payload?.data?.count === 0) {
        state.failed = true;
      }
    });

    builder.addCase(getUserData.rejected, (state, action) => {
      console.log("getUserData Error Payload : ", action?.error);
      state.loading = false;
      state.failed = true;
    });
  },
});

export const { deleteItemFromList, updateItemFromList } = userListSlice.actions;
export default userListSlice;
