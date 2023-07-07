import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';
import theme from '../../util/theme';

export const DragDropComponent = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
        position: 'absolute',
        top: 300 * theme.metrics.ratioY,
        right: -15 * theme.metrics.ratioX,
      }}
      {...panResponder.panHandlers}>
      <View style={styles.box}>
        <Text style={styles.textBtn}>M</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    backgroundColor: theme.colors.redBackground,
    borderRadius: 30,
  },
  textBtn: {
    color: theme.colors.white2,
    fontSize: 20 * theme.metrics.ratioX,
    fontWeight: 'bold',
  },
});
