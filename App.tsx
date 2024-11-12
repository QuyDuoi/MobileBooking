import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import EmployeeManagement from './src/features/EmployeeManagement/EmployeeManagement';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

import ServiceManagement from './src/features/ScreenService/ServiceManagement';
import DangNhap from './src/features/LoginScreen/Login';

function App(): React.JSX.Element {
  const [t1, sett1] = useState(false)
  // if (t1 === true) {
  //   return <DrawerNavigator />
  // }
  function handerlogin() {
    sett1(true)
  }
  return (
    <Provider store={store}>
      {t1 && <DrawerNavigator />}
      {!t1 && <DangNhap handerlogin={handerlogin} />}
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
