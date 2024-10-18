import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2, // số chữ số thập phân
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu đen cho các thành phần của biểu đồ
    barPercentage: 1,
    fillShadowGradient: '#d3d3d3',  // Màu gradient bắt đầu
    fillShadowGradientOpacity: 1,   // Độ mờ của màu gradient
    fillShadowGradientTo: 'rgba(211, 211, 211, 0.1)', // Kết thúc gradient
    style: {
      borderRadius: 16,
    },
    yAxisMinimum: 0,  
  };

const BieuDo = ({getData}) => {
  return (
    <BarChart
    style={{ borderRadius: 16,marginTop:24,marginHorizontal:12 }}
    data={getData}
    width={screenWidth-24}
    height={220}
    yAxisLabel={'$'}
    yAxisSuffix={''} // Xóa $
    chartConfig={chartConfig}
    fromZero={true}
  />
  )
}

export default BieuDo

const styles = StyleSheet.create({})