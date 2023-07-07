import React, {useState, useRef, useEffect} from 'react';
// components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {TabMenuItem} from '../../components/TabMenuItem/TabMenuItem';
import {MainComponentScreen} from '../../components/MainComponentScreen/MainComponentScreen';
import {DragDropComponent} from '../../components/DragDropComponent/DragDropComponent';

// theme
import theme from '../../util/theme';

function MainScreenContainer(): JSX.Element {
  const [currentItem, setCurrentItem] = useState('Home');
  // To get/set the current menu item
  const [showMenu, setShowMenu] = useState(false);

  // animated methods
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  // scroll
  const scrollOffSet = useRef(new Animated.Value(0)).current;
  const [offset, setOffSet] = useState(0);
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    scrollOffSet.addListener(({value}) => setOffSet(value));
  }, [scrollOffSet]);

  return (
    <SafeAreaView style={styles.container}>
      {/** Menu */}
      <View style={styles.viewMenu}>
        <Image
          source={theme.images.defaultProfilePicture}
          style={styles.imageProfile}
        />
        <TouchableOpacity>
          <Text style={styles.userProfileName}>Monkey D. Luffy</Text>
        </TouchableOpacity>
        <View style={styles.menuView}>
          {TabMenuItem({
            title: 'Home',
            currentItem,
            setCurrentItem,
            icon: theme.images.menuHomeIcon,
          })}
          {TabMenuItem({
            title: 'Invoices',
            currentItem,
            setCurrentItem,
            icon: theme.images.menuInvoiceIcon,
          })}
          {TabMenuItem({
            title: 'Settings',
            currentItem,
            setCurrentItem,
            icon: theme.images.menuSettignsIcon,
          })}
        </View>
        <View>
          {TabMenuItem({
            title: 'Logout',
            currentItem,
            setCurrentItem,
            icon: theme.images.menuLogoutIcon,
          })}
        </View>
      </View>
      {/** MainView */}
      {MainComponentScreen({
        title: currentItem,
        showMenu,
        setShowMenu,
        offsetValue,
        scaleValue,
        closeButtonOffset,
        scrollOffSet,
        offset,
        setOffSet,
        titleWidth,
        setTitleWidth,
      })}
      {/** DragDrop Component */}
      {DragDropComponent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.redBackground,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewMenu: {justifyContent: 'flex-start', padding: 15 * theme.metrics.ratioX},
  imageProfile: {
    width: 60 * theme.metrics.ratioX,
    height: 60 * theme.metrics.ratioY,
    borderRadius: 30 * theme.metrics.ratioX,
    marginTop: 8 * theme.metrics.ratioY,
  },
  userProfileName: {
    fontSize: 20 * theme.metrics.ratioX,
    fontWeight: 'bold',
    color: theme.colors.white2,
    marginTop: 10 * theme.metrics.ratioX,
  },
  menuView: {
    flexGrow: 1,
    marginTop: 20 * theme.metrics.ratioY,
  },
});

export default MainScreenContainer;
