import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import jwtDecode from "jwt-decode";
 
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: '132194061982-gjddhk11rtsotaqd8ejs4f92hn84t5u4.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { params: { id_token } } = response;
      console.log(jwtDecode(id_token))
    }

  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}