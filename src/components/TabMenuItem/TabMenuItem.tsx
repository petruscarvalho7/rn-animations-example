import {PropsWithChildren} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import theme from '../../util/theme';

type MenuProps = PropsWithChildren<{
  title: string;
  currentItem: string;
  setCurrentItem: (title: string) => void;
  icon: any;
}>;

export const TabMenuItem = (props: MenuProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.title === 'Logout') {
          // TODO: logout flow
        } else {
          props.setCurrentItem(props.title);
        }
      }}>
      <View
        style={[
          styles.viewItem,
          {
            backgroundColor:
              props.currentItem === props.title
                ? theme.colors.white2
                : 'transparent',
          },
        ]}>
        <Image
          source={props.icon}
          style={[
            styles.imageIcon,
            {
              tintColor:
                props.currentItem === props.title
                  ? theme.colors.redBackground
                  : theme.colors.white2,
            },
          ]}
        />
        <Text
          style={[
            styles.textItem,
            {
              color:
                props.currentItem === props.title
                  ? theme.colors.redBackground
                  : theme.colors.white2,
            },
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8 * theme.metrics.ratioX,
    paddingLeft: 10 * theme.metrics.ratioX,
    paddingRight: 30 * theme.metrics.ratioX,
    borderRadius: 8 * theme.metrics.ratioX,
    marginTop: 15 * theme.metrics.ratioY,
  },
  imageIcon: {
    width: 25 * theme.metrics.ratioX,
    height: 25 * theme.metrics.ratioY,
  },
  textItem: {
    fontSize: 15 * theme.metrics.ratioX,
    fontWeight: 'bold',
    paddingLeft: 15 * theme.metrics.ratioX,
  },
});
