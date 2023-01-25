import React from "react";
import { TextInput, Text, View, Button, Alert } from "react-native";
import { styles } from "../../styles";
import Strings from "../../../constants/strings";
import Colors from "../../../constants/Colors";
import { magic } from "../../../navigation";
import { emailLogin } from "../../../components/MagicSDKHelper";
import { updateApiLoader } from "../../../redux/reducerSlices/preLogin";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../../redux/reducerSlices/userInfo";

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  // login Function
  const login = async () => {
    try {
      emailLogin(email)
        .then(async (res) => {
          console.log("RESSSSS", res);
          dispatch(updateUserData(res));
        })
        .catch((error) => {
          console.log("error...", error);
          if (JSON.parse(error).code === -10005) {
            Alert.alert("Please edit your email address as per your request.");
          } else if (JSON.parse(error).code === -10001) {
            Alert.alert(
              "",
              "You have clicked on expired verification link please try again."
            );
          } else {
            Alert.alert(
              "",
              JSON.parse(error).rawMessage ?? "Something went wrong"
            );
          }
          dispatch(updateApiLoader({ apiLoader: false }));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Magic Sign-in */}
      <View
        style={{
          backgroundColor: Colors.black,
          justifyContent: "center",
          paddingHorizontal: 10,
          borderRadius: 16,
        }}
      >
        <View style={styles.loginContainer}>
          <Text
            style={{
              fontSize: 22,
              color: Colors.white,
              paddingVertical: 30,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {Strings.login}
          </Text>
          <View style={styles.emailContainer}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.white,
                fontWeight: "500",
              }}
            >
              {Strings.email + ":"}
            </Text>
            <TextInput
              style={styles.TextInputContainer}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Button title="Login" onPress={login} color={Colors.black} />
        </View>
      </View>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};
