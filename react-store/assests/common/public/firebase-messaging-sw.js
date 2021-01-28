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
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize Firebase
var config = {
    messagingSenderId: "<firebase messaging sender id>",
};

// firebase.initializeApp(config);
// const messaging = firebase.messaging();

self.addEventListener('push', e => {
    const data = e.data.json().data;
    console.log("Push Received..", data);
    e.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
                click_action: data.click_action
            },
            actions: [
                { action: 'explore', title: 'Explore Emerald' },
                { action: 'close', title: 'Close ' },
            ]
        })
    )
});

 self.addEventListener('notificationclick', function (event) {
     console.log("message click--", event);
     var notification = event.notification;
     var action = event.action;
     var click_action = notification.data.click_action;

     if (action === 'close') {
         notification.close();
         sendClickEventToServer("closed notification");
     } else {
          notification.close();
         event.waitUntil(
             self.clients.openWindow(click_action)
         );

     }

 });


 self.addEventListener('notificationclose', function (event) {
     console.log("close notification", event);
    
 });


