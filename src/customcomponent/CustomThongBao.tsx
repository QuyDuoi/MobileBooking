import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface CustomModalProps {
  iconUrl: string;
  text: string;
}

function CustomThongBao(props: CustomModalProps): React.JSX.Element {
  const {iconUrl, text} = props;
  return (
    <View style={styles.container}>
      <Image source={iconUrl} style={{width: 40, height: 40, marginHorizontal: 8}}/>
      <View style={styles.box}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>Thông báo:</Text>
        <Text style={{color: 'black', fontSize: 15}}>{text}</Text>
      </View>
    </View>
  );
}

export default CustomThongBao;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  box: {
    flexDirection: 'column',
  }
});
