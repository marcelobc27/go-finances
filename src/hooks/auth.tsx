import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google  from 'expo-auth-session/providers/google'
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { GOOGLE_WEB_CREDENTIAL } from "../utils/credentials";

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
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@gofinances:user';

  const [ request, response, promptAsync ] = Google.useIdTokenAuthRequest({
    webClientId: GOOGLE_WEB_CREDENTIAL,
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

  useEffect(() => {
    async function loadUserStorageData(){
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if(userStorageKey){
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged)
      }
      setUserStorageLoading(false)
    }

    loadUserStorageData()
  }, [])

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
