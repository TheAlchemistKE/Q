import React, { useState } from 'react';
import {View, TextInput, Button, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { account } from '@/utils/Appwrite';
import {ID} from "react-native-appwrite";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [fullname, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      await account.create(ID.unique(), email, password, fullname);
      setMessage('Registered successfully!');
      router.push('/'); // Redirect to home (tab layout)
    } catch (error: any) {
      setMessage('Registration failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
        <TextInput
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullName}
        keyboardType="default"
        placeholderTextColor={'#000'}
        autoCapitalize="words"
        style={styles.input} // Add styles for visibility
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={'#000'}
        autoCapitalize="none"
        style={styles.input} // Add styles for visibility
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'#000'}
        secureTextEntry
        style={styles.input} // Add styles for visibility
      />
      <Button title="Register" onPress={handleLogin} />
        <Text>Already a member ?
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text>Login</Text>
            </TouchableOpacity>
        </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff', // Set a background color
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    color: 'red',
  },
});

export default RegisterScreen;
