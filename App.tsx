import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EmployeeManagement from './src/features/EmployeeManagement/EmployeeManagement';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

import ServiceManagement from './src/features/ScreenService/ServiceManagement';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <DrawerNavigator />
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
