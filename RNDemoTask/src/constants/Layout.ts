import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const scale = (size) => (width / guidelineBaseWidth) * size;
const moderateFontScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  horizontalScale,
  verticalScale,
  moderateScale,
  moderateFontScale,
};
