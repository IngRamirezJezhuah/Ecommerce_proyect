import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import TabNavigator from './src/navigation/TabNavigator';

export const AuthContext = React.createContext(); // Para compartir estado

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado global

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        {isAuthenticated ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
