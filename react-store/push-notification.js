import firebase from 'firebase';
import notificationService from './notification.service';

export const initializeFirebase = () => {
    const config = {
        apiKey: "AIzaSyD39h-tmwhXNli5H93vQ8xZkvO8z87oYgE",
        authDomain: "push-app-c1b75.firebaseapp.com",
        databaseURL: "https://push-app-c1b75.firebaseio.com",
        projectId: "push-app-c1b75",
        storageBucket: "push-app-c1b75.appspot.com",
        messagingSenderId: "868206520699",
        appId: "1:868206520699:web:0af75addd78ae6abb6f5de"
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