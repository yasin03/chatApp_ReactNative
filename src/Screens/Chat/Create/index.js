import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

const Index = ({navigation}) => {
  _handleSubmit = (values, {resetForm}) => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    const userName = user.displayName;


    var database = firebase.database().ref('/rooms');

    database
      .push({
        name: values.name,
        userId,
        userName,
      })
      .then(() => {
        resetForm({values: ''});
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  function LogoTitle() {
    return (
      <View style={{marginHorizontal: 45}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
          Create Chat Room
        </Text>
      </View>
    );
  }

  const handleNavigationOptions = () => {
    navigation.setOptions({
      headerTitle: props => <LogoTitle {...props} />,
    });
  };

  useEffect(() => {
    handleNavigationOptions();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.subtitle}>Create Chat Room!</Text>
      </View>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={_handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
        })}>
        {({values, errors, handleSubmit, handleChange, isValid}) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input1}
              placeholder={'Chat Room Name'}
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {errors.name && <Text style={styles.errors}>{errors.name}</Text>}
            <TouchableOpacity
              style={styles.button}
              disabled={!isValid}
              onPress={handleSubmit}>
              <Text style={styles.button_text}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Index;

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 50,
    marginHorizontal: 30,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },

  subtitle: {fontSize: 16},
  formContainer: {justifyContent: 'center'},
  input1: {
    backgroundColor: 'rgba(113,101,227,0.2)',

    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#7165E3',
    marginBottom: 10,
  },
  errors: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7165E3',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
