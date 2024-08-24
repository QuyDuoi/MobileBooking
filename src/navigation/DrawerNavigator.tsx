import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EmployeeManagement from '../features/EmployeeManagement/EmployeeManagement';

const Drawer = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={EmployeeManagement} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({});
