import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ItemCategory = ({ item, onDelete, onUpdateHandler, onclick }) => {
  return (
    <TouchableOpacity
      style={{ width: '100%', alignItems: 'center' }}
      onPress={() => onclick(item.item)}>
      <View style={styles.ItemContainer}>
        <View style={styles.ItemBody}>
          <Text style={styles.stt}>{item.index + 1}</Text>
          <View style={styles.content}>
            <Text style={styles.textName}>{item.item?.nameCategory}</Text>
            <Text style={{ color: 'black' }}>
              {item.item?.createdAt.slice(0, 10)}
            </Text>
          </View>
          <View style={styles.actionBody}>
            <TouchableOpacity
              onPress={() => {
                onUpdateHandler(item.item);
              }}>
              <Image
                style={styles.actionIcon}
                source={require('./src/img/edit-04.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onDelete(item.item._id);
              }}>
              <Image
                style={styles.actionIcon}
                source={require('./src/img/trash-02.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCategory;

const styles = StyleSheet.create({
  ItemContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    height: 90,
    width: '95%',
    marginBottom: 10,
  },
  ItemBody: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'space-evenly',
    height: '80%',
    width: '72%',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  actionBody: {
    height: '100%',
    justifyContent: 'space-around',
    width: '13%',
    alignItems: 'center',
  },
  actionIcon: {
    height: 24,
    width: 24,
  },
  stt: {
    width: '15%',
    textAlign: 'center',
    color: 'black',
  },
});
