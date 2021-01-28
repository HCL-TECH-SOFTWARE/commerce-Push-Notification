/**
*==================================================
Copyright [2021] [HCL Technologies]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/
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