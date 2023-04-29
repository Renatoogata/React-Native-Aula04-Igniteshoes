import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import * as Linking from 'expo-linking';

import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';


//criando um padrão de linking para que nossa rota entenda o que está sendo passado
const linking = {
  prefixes: ['igniteshoesapp://', 'com.anonymous.igniteshoesapp://', 'exp+igniteshoesapp://'], // quais são os schemes que a estrutura de navegação vai reconhecer
  config: {
    screens: { // configurando as nossas telas
      details: { // configurando details
        path: 'details/:productId', // os 2 pontos quer dizer que é um parametro
        parse: {
          productId: (productId: string) => productId // fazendo um parse pra string
        }
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];


  // um método para criar um link para teste (não é necessário usar, feito somente para testes)
  const deepLinking = Linking.createURL('details', {
    queryParams: {
      productId: '7'
    }
  });
  //console.log(deepLinking);


  // a estrutura de notificação está aqui no contexto de rotas para poder reindirecionar o usuário para alguma rota com a notificação
  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification(); // pegando o contéudo da notificação

        setNotification(response); // salvando o conteúdo da notificação no estado
      })

    return () => unsubscribe
  }, [])
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification // componente de notificação que irá utilizar o oneSignal
          data={notification} // pegando o titulo dentro do estado que está salvo todo conteudo da notificação
          onClose={() => setNotification(undefined)} // passando função que deixa o estado undefined quando ativada (para fechar o popup de notificação)
        />
      }
    </NavigationContainer>
  );
}