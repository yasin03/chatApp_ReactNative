import React, {useState} from 'react';
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

function Login({navigation}) {
  const [hidePassword, setHidePassword] = useState(true);

  _handleSubmit = values => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        alert('Giriş Başarılı');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong Password');
          return;
        }

        if (error.code === 'auth/user-not-found') {
          alert('User Not Found');
          return;
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue!</Text>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={_handleSubmit}
        validationSchema={Yup.object().shape({
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
              placeholder={'Email'}
              keyboardType={'email-address'}
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {errors.email && <Text style={styles.errors}>{errors.email}</Text>}
            <View>
              <TextInput
                style={styles.input2}
                placeholder={'Password'}
                secureTextEntry={hidePassword ? true : false}
                value={values.password}
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
            <TouchableOpacity style={styles.forgot}>
              <Text>Forgot Your Password!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              disabled={!isValid}
              onPress={handleSubmit}>
              <Text style={styles.button_text}>Sign in my account</Text>
            </TouchableOpacity>
            <View style={styles.signUp}>
              <Text style={styles.signUpText}>
                Don’t have an account? -
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.signUpButtonText}> Sign Up</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default Login;

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
  title: {fontSize: 30, fontWeight: 'bold'},
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
  forgot: {alignItems: 'flex-end', marginBottom: 50},
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
  signUp: {alignItems: 'flex-end', marginTop: 10},
  signUpText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {},
  signUpButtonText: {fontWeight: 'bold'},
});
