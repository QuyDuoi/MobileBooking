import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EmployeeManagement from './src/features/EmployeeManagement/EmployeeManagement';
import DrawerNavigator from './src/navigation/DrawerNavigator';

import ServiceManagement from './src/features/ScreenService/ServiceManagement';

function App(): React.JSX.Element {

  return <DrawerNavigator/>;
}

export default App;

const styles = StyleSheet.create({});
