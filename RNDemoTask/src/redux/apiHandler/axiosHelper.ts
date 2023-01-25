import axios from "axios";
import Store from "../store";
import { Alert } from "react-native";
import { updateApiLoader } from "../reducerSlices/preLogin";
import Strings from "../../constants/strings";
import store from "../store";
import { magic } from "../../navigation";
import { updateUserData } from "../reducerSlices/userInfo";

axios.defaults.timeout = 30000;

export const useAxios = async (axiosParams: any) => {
  return new Promise((resolve, reject) => {
    console.log("AXIOS :", axiosParams);

    axios
      .request(axiosParams)
      .then((response) => {
        resolve(response?.data);
      })
      .catch(async (error) => {
        store.dispatch(updateApiLoader({ apiLoader: false }));
        //console.log('API Erro', error, axiosParams);
        if (error.response?.status.toString().includes("203")) {
        } else if (error.response?.status.toString().includes("4")) {
          reject(error.response?.data?.message);
          if (error.response?.status?.toString() === "401") {
            //store.dispatch(logout({}));
            await magic?.user?.logout();
          }
          Alert.alert(
            "",
            error.response?.data?.message ?? "somethingWentWrong"
          );
        } else if (error.response?.status.toString().includes("5")) {
          let errObj = {
            code: 5000,
            status: false,
            message: "somethingWentWrong",
            data: {},
          };
          reject(JSON.stringify(errObj));
        } else {
          reject(JSON.stringify(error?.response?.data));
        }
      });
  });
};
