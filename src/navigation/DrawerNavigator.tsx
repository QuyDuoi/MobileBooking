import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EmployeeManagement from '../features/EmployeeManagement/EmployeeManagement';
import Category from '../features/EmployeeManagement/ScreenCategory/Category';
import ServiceManagement from '../features/ScreenService/ServiceManagement';

const Drawer = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Category">
      <Drawer.Screen name="Home" component={EmployeeManagement} />
      <Drawer.Screen name="Category" component={Category} options={{title:'Danh mục'}}/>
      <Drawer.Screen name="Service" component={ServiceManagement} options={{title:'Dịch Vụ'}}/>
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({});
