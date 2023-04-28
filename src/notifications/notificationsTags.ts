import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() { // criar uma tag com a chave user_email no dashboard da onesignal
    OneSignal.sendTags({
        'user_name': 'Renato',
        'user_email': 'renato@teste.com',
    })
}

export function tagUserEmailDelete() { // deletar uma tag com a chave user_email no dashboard da onesignal
    OneSignal.deleteTag('user_email');
}