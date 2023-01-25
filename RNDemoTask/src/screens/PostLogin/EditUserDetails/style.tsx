import Colors from "../../../constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackGray,
  },
  wrapContent: {
    flexDirection: "column",
    marginVertical: 10,
    marginHorizontal: 16,
    alignItems: "flex-start",
  },
  editTextStyle: {
    fontSize: 12,
    textAlign: "right",
    color: Colors.white,
    paddingRight: 5,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 25,
  },
  TextInputContainer: {
    width: "90%",
    height: 40,
    borderBottomWidth: 1,
    color: Colors.white,
  },
  titleTextStyle: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "500",
  },
  locationViewStyle: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 6,
  },
});

export default styles;
