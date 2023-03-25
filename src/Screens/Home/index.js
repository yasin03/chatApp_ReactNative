import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';
import RoomItem from '../../Components/Rooms/RoomItem';

const Home = ({navigation}) => {
  const [rooms, setRooms] = useState([]);

  handleLogout = () => {
    auth()
      .signOut()
      .then(() => alert('User signed out!'))
      .then(navigation.navigate('Login'));
  };

  function LogoTitle() {
    return (
      <View style={{marginHorizontal: 100}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
          Chat Sayfası
        </Text>
      </View>
    );
  }

  const handleNavigationOptions = () => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Icon name={'plus'} size={24} color={'black'} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Icon name={'sign-out-alt'} size={24} color={'black'} />
        </TouchableOpacity>
      ),
      headerTitle: props => <LogoTitle {...props} />,
    });
  };

  loadData = async () => {
    database()
      .ref('/rooms')
      .on('value', snapshot => {
        var room = [];
        snapshot.forEach(item => {
          console.log(item);
          room.push({
            name: item.val().name,
            userName: item.val().userName,
            userId: item.val().userId,
            id: item.key,
          });
        });
        setRooms(room);
      });
  };
  useEffect(() => {
    const user = firebase.auth().currentUser;
    loadData();
  }, []);

  useEffect(() => {
    handleNavigationOptions();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={rooms}
          renderItem={({item}) => <RoomItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {marginHorizontal: 30},
  loginButton: {backgroundColor: 'orange', padding: 10, borderRadius: 10},
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  separator: {
    height: 2,
    backgroundColor: '#D2D1D7',
    width: '100%',
    borderRadius: 5,
  },
});
