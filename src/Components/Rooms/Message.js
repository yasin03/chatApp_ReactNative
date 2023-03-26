import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const Message = ({item, index}) => {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const userName = user.displayName;

  return (
    <View style={styles.container}>
      <View style={item.userId != userId ? styles.left : styles.right}>
        <View
          style={
            item.userId != userId ? styles.bubbleLeft : styles.bubbleRight
          }>
          <Text
            style={[
              styles.message,
              {color: item.userId != userId ? 'black' : 'white'},
            ]}>
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageName,
              {color: item.userId != userId ? 'black' : 'white'},
            ]}>
            {item.userName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Message;

export const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  left: {flexDirection: 'row', justifyContent: 'flex-start'},
  right: {flexDirection: 'row', justifyContent: 'flex-end'},
  bubbleLeft: {
    backgroundColor: '#ece5dd',
    padding: 15,
    marginTop: 10,
    width: 200,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bubbleRight: {
    backgroundColor: '#128C7E',
    padding: 15,
    marginTop: 10,
    width: 200,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  message: {fontSize:16},
  messageName: {fontSize:12, fontStyle:"italic"},
});
