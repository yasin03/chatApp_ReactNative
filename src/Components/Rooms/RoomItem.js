import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as RootNavigation from '../../RootNavigation';
import Detail from '../../Screens/Chat/Detail';
const RoomItem = ({item}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          RootNavigation.navigate('Detail', {
            id: item.id,
            name: item.name,
          })
        }>
        <Icon name={'code'} style={styles.icon} />
        <View>
          <Text style={styles.text_name}>{item.name}</Text>
          <Text style={styles.text_username}>{item.userName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RoomItem;

export const styles = StyleSheet.create({
  button: {
    padding: 20,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
  text_name: {
    color: 'black',
    fontSize: 24,
  },
  text_username: {
    fontSize: 14,
  },
});
