import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export default function Register({navigation}) {
  const [check, setCheck] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  _handleSubmit = values => {
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName:values.fullName,
        })
        alert('User created successfully!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
         alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Please provide following details for your new account
          </Text>
        </View>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
          }}
          onSubmit={_handleSubmit}
          validationSchema={Yup.object().shape({
            fullName: Yup.string().required('Full Name is required'),
            email: Yup.string().required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}>
          {({
            values,
            errors,
            handleSubmit,
            isSubmitting,
            handleChange,
            isValid,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input1}
                placeholder={'FullName'}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
              />
              {errors.fullName && (
                <Text style={styles.errors}>{errors.fullName}</Text>
              )}
              <TextInput
                style={styles.input2}
                placeholder={'Email Adress'}
                keyboardType={'email-address'}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <View>
                <TextInput
                  style={styles.input2}
                  placeholder={'Password'}
                  value={values.password}
                  secureTextEntry={hidePassword ? true : false}
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={{position: 'absolute', top: 10, right: 15}}>
                  <Icon name={hidePassword ? 'eye-slash' : 'eye'} size={25} />
                </TouchableOpacity>

                {errors.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.check}>
                <TouchableOpacity
                  style={styles.checkBox}
                  onPress={() => setCheck(!check)}>
                  {check && <Text style={styles.checkBoxIcon}>✓</Text>}
                </TouchableOpacity>
                <Text>
                  By creating your account you have to agree with our Teams and
                  Conditions.
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonAccount}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonAccount_text}>
                    Sign in my account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPhone}>
                  <Text style={styles.buttonPhone_text}>
                    Sign up with Phone Number
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUp}>
                <Text style={styles.signUpText}>
                  Already have an account?
                  <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUpButtonText}> Sign In</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 30,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  title: {fontSize: 30, fontWeight: 'bold'},
  subtitle: {fontSize: 16, marginHorizontal: 70, textAlign: 'center'},
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
  input2: {
    backgroundColor: '#E7E7E7',

    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  errors: {
    color: 'red',
    marginBottom: 10,
  },
  check: {
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkBox: {
    backgroundColor: 'rgba(113,101,227,0.2)',
    borderWidth: 1,
    borderColor: '#7165E3',
    width: 25,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxIcon: {fontSize: 20},
  buttonAccount: {
    backgroundColor: '#7165E3',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonAccount_text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonPhone: {
    backgroundColor: '#1C1939',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPhone_text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signUp: {alignItems: 'flex-end', marginTop: 10},
  signUpText: {justifyContent: 'center', alignItems: 'center'},
  signUpButton: {},
  signUpButtonText: {fontWeight: 'bold'},
});
