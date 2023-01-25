import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  TextInput,
} from "react-native";
import icons from "../../assets/images";
import Colors from "../constants/Colors";
import { dateTimeConvert } from "../constants/constant";
import Strings from "../constants/strings";

export interface UserDataProps {
  gender: string;
  name: {};
  location: {};
  picture: {};
  dob: {};
  email?: string;
  onDeleteBtnPressed: (item) => void;
}

const UserDataComponent: React.FC<UserDataProps> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditUserDetails", {
              params: props,
            });
          }}
        >
          <Image source={icons.edit} style={{ height: 16, width: 16 }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props?.onDeleteBtnPressed(props);
          }}
        >
          <Image
            source={icons.delete}
            style={{ height: 16, width: 16, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: props?.picture?.medium }}
          style={styles.ProfileImg}
        />
        <View style={styles.wrapContent}>
          <Text style={styles.nameTextStyle}>
            {props?.name?.first + " " + props?.name?.last}
          </Text>
          <Text style={styles.titleTextStyle}>
            {Strings.gender + ":" + " " + props?.gender}
          </Text>
          <View style={styles.locationViewStyle}>
            <Text style={[styles.titleTextStyle, { fontWeight: "600" }]}>
              {Strings.country + ":" + " "}
              <Text style={[styles.titleTextStyle, { fontWeight: "400" }]}>
                {props?.location?.country}
              </Text>
            </Text>
          </View>
          <View style={[styles.locationViewStyle, { paddingTop: 0 }]}>
            <Text style={[styles.titleTextStyle, { fontWeight: "600" }]}>
              {Strings.dob + ":" + " "}
              <Text style={[styles.titleTextStyle, { fontWeight: "400" }]}>
                {dateTimeConvert(props?.dob?.date)}
              </Text>
            </Text>
          </View>
          <View style={[styles.locationViewStyle, { paddingTop: 0 }]}>
            <Text style={[styles.titleTextStyle, { fontWeight: "600" }]}>
              {Strings.age + ":" + " "}
              <Text style={[styles.titleTextStyle, { fontWeight: "400" }]}>
                {props?.dob?.age}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.blackGray,
    borderRadius: 16,
  },
  wrapContent: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 16,
    flex: 1,
  },
  editTextStyle: {
    fontSize: 12,
    textAlign: "right",
    color: Colors.white,
    paddingRight: 5,
  },
  ProfileImg: {
    height: 64,
    width: 64,
    paddingLeft: 8,
    borderRadius: 8,
  },
  TextInputContainer: {
    width: "90%",
    height: 35,
    color: Colors.white,
  },
  titleTextStyle: {
    flexGrow: 1,
    fontSize: 12,
    color: Colors.white,
  },
  nameTextStyle: {
    fontSize: 16,
    color: Colors.white,
    paddingVertical: 5,
    fontWeight: "700",
  },
  locationViewStyle: {
    flexDirection: "row",
    paddingVertical: 8,
  },
});

export default UserDataComponent;
