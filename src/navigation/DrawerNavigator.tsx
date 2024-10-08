import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmployeeManagement from '../features/EmployeeManagement/EmployeeManagement';
import Category from '../features/ScreenCategory/Category';
import ServiceManagement from '../features/ScreenService/ServiceManagement';
import BookingManagement from '../features/ScreenBooking/BookingManagement';
import StoreManager from '../features/ScreenStore/StoreManager';
import ProducManagement from '../features/ScreenProduct/ProductManagement';

const Drawer = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ProducManagement">
        <Drawer.Screen name="Home" component={EmployeeManagement} options={{ title: 'Quản lý nhân viên' }} />
        <Drawer.Screen
          name="Category"
          component={Category}
          options={{ title: 'Danh mục' }}
        />
        <Drawer.Screen
          name="Service"
          component={ServiceManagement}
          options={{ title: 'Dịch Vụ' }}
        />
        <Drawer.Screen
          name="Store"
          component={StoreManager}
          options={{ title: 'Cửa hàng' }}
        />
        <Drawer.Screen
          name="Booking"
          component={BookingManagement}
          options={{ title: 'Lịch đặt' }}
        />
        <Drawer.Screen
          name="ProducManagement"
          component={ProducManagement}
          options={{ title: 'Quản lý sản phẩm' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;

