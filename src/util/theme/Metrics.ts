import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  ratioX: width / 360,
  ratioY: height / 760,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export default metrics;
