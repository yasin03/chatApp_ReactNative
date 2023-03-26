import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import Message from '../../../Components/Rooms/Message';
import {io} from 'socket.io-client';

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 1000,
  transports: ['websocket'],
};

const Index = ({route, navigation}) => {
  const {id, name, roomUserId} = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [connectedUserCount, setConnectedUserCount] = useState(0);

  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const userName = user.displayName;

  const handleNavigationOptions = () => {
    navigation.setOptions({
      headerTitle: props => <Text style={styles.header}>{name}</Text>,
      headerRight: props => {
        userId == roomUserId ? (
          <TouchableOpacity style={{marginRight: 15, padding: 5}}>
            <Icon name={'trash'} size={17} color={'red'} />
          </TouchableOpacity>
        ) : null;
      },
    });
  };

  const handleSend = () => {
    var database = firebase.database().ref(`messages/${id}`);

    database
      .push({
        id,
        text,
        userId,
        userName,
      })
      .then(() => {
        setText('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  _handleDelete = async () => {
    await database()
      .ref('/rooms/' + id)
      .remove();
    await database()
      .ref('/messages/' + id)
      .remove();
    navigation.goBack();
  };

  ioConnect = () => {
    const socket = io('http//localhost:3000', connectionConfig);
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    navigation.setOptions({
      userId,
      _handleDelete,
    });

    socket.emit('connection-room', {id});
    socket.on('connection-room-view', data => {
      setConnectedUserCount(data.count);
    });

    database()
      .ref(`messages/${id}`)
      .on('value', snapshot => {
        var messages = [];
        snapshot.forEach(item => {
          messages.push({
            roomId: id,
            text: item.val().text,
            userName: item.val().userName,
            userId: item.val().userId,
            id: item.key,
          });
        });
        setMessages(messages);
      });
  };

  useEffect(() => {
    handleNavigationOptions();
  }, [navigation]);

  useEffect(() => {
    ioConnect();
  }, []);

  useEffect(() => {
    return () => {
      socket.emit('leave-room', {
        roomId: navigation.getParam('id'),
      });
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userCount}>
        <Text>Connected User : {connectedUserCount}</Text>
      </View>
      <FlatList
        inverted
        ref={ref => (this.flatListRef = ref)}
        style={styles.flatList}
        renderItem={({item, index}) => <Message item={item} index={index} />}
        data={messages.reverse()}
      />
      <View style={styles.bottomBox}>
        <TextInput
          style={styles.bottomInput}
          placeholder={'Writing...'}
          value={text}
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name={'paper-plane'} size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

export const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 75,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  userCount: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#faf5f0',
  },
  bottomBox: {
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomInput: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 25,
    borderRadius: 50,
    flex: 1,
  },
});
