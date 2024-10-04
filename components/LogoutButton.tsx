import React from 'react';
import { Button } from 'react-native';
import {useAuth} from "@/context/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return <Button title="Log Out" onPress={logout} />;
};

export default LogoutButton;
