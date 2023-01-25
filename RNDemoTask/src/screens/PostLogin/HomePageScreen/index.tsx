import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import UserDataList from "../../../components/UserDataList";
import { getUserData } from "../../../redux/apiHandler/apiActions";
import { deleteItemFromList } from "../../../redux/reducerSlices/userList";
import { RootState } from "../../../redux/store";

const HomePageScreen = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  const userList = useSelector((state: RootState) => {
    return state.userList.newUserData;
  });

  //api call
  const getUserListData = async (pageNo: number) => {
    const params = {
      page: pageNo,
    };
    dispatch(getUserData(params));
  };

  // For getting the inital user data
  useEffect(() => {
    getUserListData(page);
  }, []);

  // For setting the user data
  useEffect(() => {
    setUserData(userList);
  }, [userList]);

  // For pagination of user list
  const onEndReached = () => {
    if (userData?.length === 10) {
      let temp = page + 1;
      setPage(temp);
      getUserListData(page);
    }
  };

  // For deleting the item from list
  const onDelete = (item) => {
    Alert.alert("Are you sure you want to delete", "", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteItemFromList(item));
        },
      },
    ]);
  };

  return (
    <>
      <UserDataList
        listData={userData}
        onEndReached={() => {
          onEndReached();
        }}
        onDeleteBtnPressed={(item) => {
          console.log("DELETE ITEM::::", item);
          onDelete(item);
        }}
      />
    </>
  );
};

export default HomePageScreen;
