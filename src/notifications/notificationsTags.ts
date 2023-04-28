import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) { // criar uma tag com a chave user_email no dashboard da onesignal
    OneSignal.sendTag('user_email', email);
}

export function tagUserEmailDelete() { // deletar uma tag com a chave user_email no dashboard da onesignal
    OneSignal.deleteTag('user_email');
}