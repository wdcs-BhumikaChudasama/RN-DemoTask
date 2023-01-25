import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "./axiosHelper";

export const getUserData = createAsyncThunk(
  "randomuser",
  async (param: any) => {
    const response = await useAxios({
      method: "GET",
      url: `https://randomuser.me/api/?page=${param?.page}&results=10`,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });
    // console.log("response_login", response);
    return response;
  }
);
