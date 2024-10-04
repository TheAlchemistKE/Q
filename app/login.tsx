import React, { useState } from 'react';
import {View, TextInput, Button, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { account } from '@/utils/Appwrite';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      await account.createEmailPasswordSession(email, password);
      setMessage('Logged in successfully!');
      router.push('/'); // Redirect to home (tab layout)
    } catch (error: any) {
      setMessage('Login failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Log In" onPress={handleLogin} />
        <Text>Already a member ?
            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text>Register</Text>
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

export default LoginScreen;
