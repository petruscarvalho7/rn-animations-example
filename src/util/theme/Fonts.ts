import {Platform} from 'react-native';
// Check https://medium.com/@gattermeier/custom-fonts-in-react-native-for-android-b8a331a7d2a7 for android file names
/**
 * Font styles of the app
 */
const type = {
  body: Platform.OS === 'ios' ? 'System' : 'Helvetica',
  robotoMediumItalic: 'Roboto-MediumItalic',
};

const style = {
  buttonSize1: 12,
  buttonSize2: 14,
};

export default {
  type,
  style,
};
