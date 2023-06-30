import {PropsWithChildren} from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import theme from '../../util/theme';

type MainDecoratorScreenProps = PropsWithChildren<{
  title: string;
  showMenu: boolean;
  setShowMenu: (isMenu: boolean) => void;
  offsetValue: any;
  scaleValue: any;
  closeButtonOffset: any;
}>;

export const MainDecoratorScreen = (props: MainDecoratorScreenProps) => {
  const durationValue: number = 300;

  const animationFlow = () => {
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

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderRadius: props.showMenu ? 15 * theme.metrics.ratioX : 0,
          transform: [
            {scale: props.scaleValue},
            {translateX: props.offsetValue},
          ],
        },
      ]}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: props.closeButtonOffset,
            },
          ],
        }}>
        <TouchableOpacity onPress={animationFlow}>
          <Image
            source={
              props.showMenu ? theme.images.closeIcon : theme.images.menuIcon
            }
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.sectionText}>{props.title}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.white2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15 * theme.metrics.ratioX,
    paddingVertical: 20 * theme.metrics.ratioY,
  },
  menuIcon: {
    width: 20 * theme.metrics.ratioX,
    height: 20 * theme.metrics.ratioY,
    tintColor: theme.colors.blackTwo,
    marginTop: 30 * theme.metrics.ratioY,
  },
  sectionText: {
    fontSize: 30 * theme.metrics.ratioX,
    fontWeight: 'bold',
    color: theme.colors.blackTwo,
    paddingTop: 20 * theme.metrics.ratioY,
  },
});
