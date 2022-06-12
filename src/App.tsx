import {
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Header from './components/Header';
import ModalHeader, {ModalHeaderHandle} from './components/modal/ModalHeader';
import Home from './containers/pages/Home';
import {store} from './store';
import {setModalHeader} from './utils/globalRef';

type RootStackList = {
  Home: undefined;
  Detail: {id: number};
  Type: undefined;
};

const RootStack = createStackNavigator();

export const navigationRef = createNavigationContainerRef<RootStackList>();

export function push(name: keyof RootStackList, params?: Object | any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

const App = () => {
  const modalHeaderRef = useRef<ModalHeaderHandle>(null);

  useEffect(() => {
    if (modalHeaderRef?.current) {
      setModalHeader(modalHeaderRef.current);
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrap}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{header: () => <Header />}}>
            <RootStack.Screen name="Home" component={Home} />
          </RootStack.Navigator>
        </NavigationContainer>
        <ModalHeader ref={modalHeaderRef} />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
});

export default App;
