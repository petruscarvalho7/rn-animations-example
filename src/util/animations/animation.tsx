import {PropsWithChildren} from 'react';
import {Animated} from 'react-native';

type AnimationDrawerMenu = PropsWithChildren<{
  showMenu: boolean;
  setShowMenu: (isMenu: boolean) => void;
  offsetValue: any;
  scaleValue: any;
  closeButtonOffset: any;
}>;

export const animationsDrawerMenu = (props: AnimationDrawerMenu) => {
  const durationValue: number = 300;

  Animated.timing(props.scaleValue, {
    toValue: props.showMenu ? 1 : 0.88,
    duration: durationValue,
    useNativeDriver: true,
  }).start();

  Animated.timing(props.offsetValue, {
    toValue: props.showMenu ? 0 : 200,
    duration: durationValue,
    useNativeDriver: true,
  }).start();

  Animated.timing(props.closeButtonOffset, {
    toValue: !props.showMenu ? -30 : 0,
    duration: durationValue,
    useNativeDriver: true,
  }).start();

  props.setShowMenu(!props.showMenu);
};

export const onScrollAnimation = (
  e: {
    nativeEvent: {contentOffset: {y: number}};
  },
  scrollOffSet: Animated.Value,
) => {
  const scrollSensitivity = 1;
  const offsetValue = e.nativeEvent.contentOffset.y / scrollSensitivity;
  scrollOffSet.setValue(-offsetValue);
};
