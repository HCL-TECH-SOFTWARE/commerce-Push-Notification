import firebase from 'firebase';
import notificationService from './notification.service';

export const initializeFirebase = () => {
    const config = {
        apiKey: "<firebase API Key>",
        authDomain: "<firebase auth domain>",
        databaseURL: "<firebase database URL>",
        projectId: "<firebase project ID>",
        storageBucket: "<firebase storage bucket>",
        messagingSenderId: "<firebase messaging sender id>",
        appId: "<firebase app ID>"
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
           return new Promise(resolve => setTimeout(resolve, 5000));          
        }else{
            return new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error("Error ", error);
    }

}