import { useEffect } from 'react';

import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.setAppId(process.env.ONE_SIGNAL_ID || "Wrong key"); // setando a key do onesignal para sincrionizar com o app

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate(); // chamando a função que cria um objeto de tags que vai ser salvo na dashboard do onesignal

  useEffect(() => {
    const unsubscrible = OneSignal.setNotificationOpenedHandler((response) => { // com essa chama nós conseguimos saber se o usuário clicou na notifição em background

      const { actionId } = response.action as any // esse actionId vem no corpo da requisição acima e tem os dados do 'Android Action Button' da push notification do OneSignal

      switch (actionId) {
        case '1':
          return console.log('Ver todas');
        case '2':
          return console.log('Ver pedido')
        default:
          return console.log('Não foi clicado em botão de ação')
      }
    })

    return () => unsubscrible
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}