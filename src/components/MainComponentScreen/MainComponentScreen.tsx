import {PropsWithChildren} from 'react';
import {Animated, Text, StyleSheet, View, ScrollView} from 'react-native';
import {MainHeader} from '../MainHeader/MainHeader';

import {
  animationsDrawerMenu,
  onScrollAnimation,
} from '../../util/animations/animation';
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

export const MainComponentScreen = (props: MainDecoratorScreenProps) => {
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
        {MainHeader({
          title: props.title,
          showMenu: props.showMenu,
          scrollOffSet: props.scrollOffSet,
          offset: props.offset,
          setOffSet: props.setOffSet,
          titleWidth: props.titleWidth,
          setTitleWidth: props.setTitleWidth,
          animationFlow: () =>
            animationsDrawerMenu({
              showMenu: props.showMenu,
              setShowMenu: props.setShowMenu,
              offsetValue: props.offsetValue,
              scaleValue: props.scaleValue,
              closeButtonOffset: props.closeButtonOffset,
            }),
        })}
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
            onScroll={(e: {nativeEvent: {contentOffset: {y: number}}}) =>
              onScrollAnimation(e, props.scrollOffSet)
            }
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
  listItem: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
