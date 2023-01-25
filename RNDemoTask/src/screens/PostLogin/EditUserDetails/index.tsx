import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import icons from "../../../../assets/images";
import useUpdateEffect from "../../../../hooks/useUpdateEffect";
import Colors from "../../../constants/Colors";
import { dateTimeConvert } from "../../../constants/constant";
import Strings from "../../../constants/strings";
import { updateItemFromList } from "../../../redux/reducerSlices/userList";
import styles from "./style";

const EditUserDetails = () => {
  const { params } = useRoute();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(params?.params);
  const [userName, setUserName] = useState(
    userDetails?.name?.first + " " + userDetails?.name?.last
  );
  const [userCountry, setUserCountry] = useState(
    userDetails?.location?.country
  );
  const [userDOb, setUserDob] = useState(userDetails?.dob?.date);

  // saving the updated value
  const onUpdateUserData = () => {
    dispatch(updateItemFromList(userDetails));
    navigation.goBack();
  };

  useUpdateEffect(() => {
    console.log("useUpdateEffect");
    setUserDetails((prevState) => ({
      ...prevState,
      name: { first: userName.split(" ")[0], last: userName.split(" ")[1] },
      location: { country: userCountry },
      dob: { date: userDOb, age: userDetails?.dob?.age },
    }));
  }, [userName, userDOb, userCountry]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icons.back}
            style={{
              height: 18,
              width: 18,
              marginBottom: 70,
              tintColor: Colors.white,
              margin: 22,
            }}
          />
        </TouchableOpacity>

        <View style={{ justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: userDetails?.picture?.medium }}
              style={styles.img}
            />
          </View>
          <View style={styles.wrapContent}>
            <Text style={styles.titleTextStyle}>{Strings.name}</Text>
            <TextInput
              style={styles.TextInputContainer}
              onChangeText={(text) => {
                setUserName(text);
              }}
              value={userName}
            />
          </View>
          <Text
            style={[
              styles.titleTextStyle,
              { marginHorizontal: 16, marginVertical: 10 },
            ]}
          >
            {Strings.gender + ":" + " " + userDetails?.gender}
          </Text>
          <View style={styles.wrapContent}>
            <Text style={styles.titleTextStyle}>{Strings.country}</Text>
            <TextInput
              numberOfLines={5}
              style={styles.TextInputContainer}
              onChangeText={(text) => {
                setUserCountry(text);
              }}
              value={userCountry}
            />
          </View>
          <View style={styles.wrapContent}>
            <Text style={styles.titleTextStyle}>{Strings.dob}</Text>
            <TextInput
              numberOfLines={5}
              style={styles.TextInputContainer}
              onChangeText={(text) => {
                setUserDob(text);
              }}
              value={dateTimeConvert(userDOb)}
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 20,
              alignSelf: "center",
              marginVertical: 30,
              width: "40%",
            }}
          >
            <Button
              title="Save"
              onPress={() => {
                onUpdateUserData();
              }}
              color={Colors.blackGray}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditUserDetails;
