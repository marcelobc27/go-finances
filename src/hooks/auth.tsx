import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google  from 'expo-auth-session/providers/google'
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

interface AuthProviderProps {
  children: ReactNode,
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  promptAsync(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

WebBrowser.maybeCompleteAuthSession();

function AuthProvider({children} : AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  const userStorageKey = '@gofinances:user';

  const [ request, response, promptAsync ] = Google.useIdTokenAuthRequest({
    webClientId: '132194061982-gjddhk11rtsotaqd8ejs4f92hn84t5u4.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { params: { id_token } } = response;
      const decodedResponse = jwtDecode(id_token)
      console.log(decodedResponse)
      const userLogged = {
        id: decodedResponse.sub,
        email: decodedResponse.email,
        name: decodedResponse.name,
        photo: decodedResponse.picture
      }

      console.log(userLogged)
      setUser(userLogged)
      AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    }
  }, [response])

  function signOut(){
    setUser({} as User)
    AsyncStorage.removeItem(userStorageKey)
  }

  return (
    <AuthContext.Provider value={{ user, promptAsync, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext)

  return context;
}

export {
  AuthProvider,
  useAuth
}
