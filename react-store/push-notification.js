import firebase from 'firebase';
import notificationService from './notification.service';

export const initializeFirebase = () => {
    const config = {
        apiKey: "AXXXXXXXXXXXXXXXXXXXXXE",
        authDomain: "XXXX.firebaseapp.com",
        databaseURL: "https://XXXXXXX-c1b75.firebaseio.com",
        projectId: "XXXXXX",
        storageBucket: "XXXXXXXXX.appspot.com",
        messagingSenderId: "123565656565",
        appId: "1:XXXXXXX:web:XXXXXXX"
    }

    firebase.initializeApp(config);

}

export const askForPermission = async () => {
    try {
        let NotificationFlag = sessionStorage.getItem('notification-flag');
        if (NotificationFlag !== 'true') {
            const messaging = firebase.messaging();
            await messaging.requestPermission();
            const token = await messaging.getToken();
            console.log("Token  :", token);
            sessionStorage.setItem('notification-flag','true');  
           await notificationService.saveTokenToDB(token);
           return new Promise(resolve => setTimeout(resolve, 3000));          
        }else{
            return new Promise(resolve => setTimeout(resolve, 3000));
        }
    } catch (error) {
        console.error("Error ", error);
    }

}
