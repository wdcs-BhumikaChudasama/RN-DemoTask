import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackGray,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  TextInputContainer: {
    borderColor: Colors.blackGray,
    borderBottomWidth: 2,
    width: "100%",
    height: 35,
    color: Colors.white,
  },
  contentContainer: {
    paddingTop: 30,
  },
  loginContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  emailContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  actionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 30,
    width: "40%",
  },
  publicAddress: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  button: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
