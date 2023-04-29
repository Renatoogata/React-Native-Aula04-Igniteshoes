import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() { // criar um objeto de tags com as chaves user_email no dashboard da onesignal
    OneSignal.sendTags({
        'user_name': 'Renato',
        'user_email': 'renato@teste.com',
        'teste': 'teste',
    })
}

export function tagUserEmailDelete() { // deletar uma tag com a chave user_email no dashboard da onesignal
    OneSignal.deleteTag('user_email');
}

export function tagCartUpdate(itemsCount: string) { // criar uma tag para quantidade de items no carrinho
    OneSignal.sendTag('cart_items_count', itemsCount)
}