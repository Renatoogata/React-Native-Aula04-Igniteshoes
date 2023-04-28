import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];


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
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification // componente de notificação que irá utilizar o oneSignal
          title={notification.title} // pegando o titulo dentro do estado que está salvo todo conteudo da notificação
          onClose={() => setNotification(undefined)} // passando função que deixa o estado undefined quando ativada (para fechar o popup de notificação)
        />
      }
    </NavigationContainer>
  );
}