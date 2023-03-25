import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Message = ({item, index}) => {
  return (
    <View style={styles.container}>
      <View style={index % 2 === 0 ? styles.left : styles.right}>
        <View style={index % 2 === 0 ? styles.bubbleLeft : styles.bubbleRight}>
          <Text style={{color:index % 2 === 0 ? "black":"white"}}>Message</Text>
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
});
