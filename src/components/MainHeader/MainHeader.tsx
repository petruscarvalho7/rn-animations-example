import {PropsWithChildren} from 'react';
import {Animated, Image, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../util/theme';

type MainHeaderScreenProps = PropsWithChildren<{
  title: string;
  showMenu: boolean;
  scrollOffSet: Animated.Value;
  offset: any;
  setOffSet: (offSet: number) => void;
  titleWidth: any;
  setTitleWidth: (titleWidth: number) => void;
  animationFlow: () => void;
}>;

export const MainHeader = (props: MainHeaderScreenProps) => {
  // styles props and interpolate animations
  const containerHeaderView = [
    {
      zIndex: 2,
      height: props.scrollOffSet.interpolate({
        inputRange: [100, 200],
        outputRange: [140, 220],
        extrapolate: 'clamp',
      }),
    },
    styles.animatedContainerHeaderView,
  ];
  const headerTitleOffset =
    props.offset <= 1
      ? {alignSelf: 'center'}
      : {
          paddingLeft: props.scrollOffSet.interpolate({
            inputRange: [0, 200],
            outputRange: [130 * theme.metrics.ratioX, 0],
            extrapolate: 'clamp',
          }),
        };
  const headerTitle = [
    styles.sectionText,
    headerTitleOffset,
    {
      zIndex: 1,
      fontSize: props.scrollOffSet.interpolate({
        inputRange: [0, 100],
        outputRange: [20, 30],
        extrapolate: 'clamp',
      }),
      marginTop: props.scrollOffSet.interpolate({
        inputRange: [0, 100],
        outputRange: [-20 * theme.metrics.ratioY, 20],
        extrapolate: 'clamp',
      }),
    },
  ];
  return (
    <Animated.View style={containerHeaderView}>
      <TouchableOpacity onPress={props.animationFlow} style={styles.menuButton}>
        <Image
          source={
            props.showMenu ? theme.images.closeIcon : theme.images.menuIcon
          }
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      <Animated.Text
        style={headerTitle}
        onLayout={e => {
          if (props.offset === 0 && props.titleWidth === 0) {
            const titleWidth = e.nativeEvent.layout.width;
            props.setTitleWidth(titleWidth);
          }
        }}>
        {props.title}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    width: 20 * theme.metrics.ratioX,
    height: 20 * theme.metrics.ratioY,
    tintColor: theme.colors.white2,
    marginTop: 30 * theme.metrics.ratioY,
  },
  sectionText: {
    fontWeight: 'bold',
    color: theme.colors.white2,
  },
  animatedContainerHeaderView: {
    backgroundColor: theme.colors.redBackground,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15 * theme.metrics.ratioX,
    paddingTop: 20 * theme.metrics.ratioY,
    borderBottomWidth: 1 * theme.metrics.ratioX,
    borderBottomLeftRadius: 200 * theme.metrics.ratioX,
    borderBottomRightRadius: 200 * theme.metrics.ratioX,
  },
  menuButton: {width: 60 * theme.metrics.ratioX, zIndex: 100},
});
