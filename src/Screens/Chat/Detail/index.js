import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Message from '../../../Components/Rooms/Message';

const Index = ({route, navigation}) => {
  const {id, name} = route.params;

  const handleNavigationOptions = () => {
    navigation.setOptions({
      headerTitle: props => <Text style={styles.header}>{name}</Text>,
    });
  };

  useEffect(() => {
    handleNavigationOptions();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        renderItem={({item, index}) => <Message item={item} index={index} />}
        data={['a', 'b', 'c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',]}
      />
      <View style={styles.bottomBox}>
        <TextInput style={styles.bottomInput} placeholder={'Writing...'} />
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
  flatList: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#faf5f0',
  },
  bottomBox: {
    padding: 20,
    marginTop:10
  },
  bottomInput: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
  },
});
