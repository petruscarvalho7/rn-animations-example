import {PropsWithChildren} from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import theme from '../../util/theme';

type MainDecoratorScreenProps = PropsWithChildren<{
  title: string;
  showMenu: boolean;
  setShowMenu: (isMenu: boolean) => void;
  offsetValue: any;
  scaleValue: any;
  closeButtonOffset: any;
  scrollOffSet: Animated.Value;
  offset: any;
  setOffSet: (offSet: number) => void;
  titleWidth: any;
  setTitleWidth: (titleWidth: number) => void;
}>;

function MainHeader(
  props: MainDecoratorScreenProps,
  animationFlow: () => void,
) {
  // styles props
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
      <TouchableOpacity onPress={animationFlow} style={styles.menuButton}>
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
}

export const MainComponentScreen = (props: MainDecoratorScreenProps) => {
  const onScroll = (e: {nativeEvent: {contentOffset: {y: number}}}) => {
    const scrollSensitivity = 1;
    const offsetValue = e.nativeEvent.contentOffset.y / scrollSensitivity;
    props.scrollOffSet.setValue(-offsetValue);
  };

  // mock list
  const getListItems = (count: number) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(
        <View
          key={i.toString()}
          style={[
            styles.listItem,
            {backgroundColor: i % 2 === 0 ? '#eee5ff' : '#ceebfd'},
          ]}>
          <Text style={{color: '#999'}}>{`Invoice ${i}`}</Text>
        </View>,
      );
    }

    return items;
  };

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
        {/** Header */}
        {MainHeader(props, animationFlow)}
        {props.title === 'Invoices' && (
          <ScrollView
            style={{
              zIndex: 1,
              width: '100%',
            }}
            contentContainerStyle={{
              marginTop: 120 * theme.metrics.ratioY,
              width: '100%',
            }}
            onScroll={onScroll}
            scrollEventThrottle={20}>
            {getListItems(9)}
          </ScrollView>
        )}
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
  },
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
  listItem: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
