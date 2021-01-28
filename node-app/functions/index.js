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
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var request = require('request');
var cors = require('cors');

const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("/path to service account");
const NOTIFICATION_URL = "https://fcm.googleapis.com/fcm/send";
const serverKey = "<firebase server key>";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "<firebase databaseURL>"
});
var db = admin.firestore();

app.post('/hello-world', (req, res) => {
    res.status(200).send("hellow world");
})

app.post('/create', async (req, res) => {

    let docRef = db.collection('user').doc(req.body.id);
    const users = await db.collection('user').where('user_id', '==', req.body.id).get()
    if (users.docs.length > 0) {
        let userRef = db.collection('user').doc(req.body.id);
        let { desktop, mobile } = (users.docs[0].data()).tokens;
        if (desktop.indexOf(req.body.token) === -1 && mobile.indexOf(req.body.token) === -1) {
            let data = {
                tokens: {
                    desktop: req.body.devicetype === 'desktop' ? [...desktop, req.body.token] : [...desktop],
                    mobile: req.body.devicetype === 'mobile' ? [...mobile, req.body.token] : [...mobile]
                }
            };
            await docRef.update(data);
        }
    } else {
        let user = {
            user_id: req.body.id,
            user_email: req.body.email,
            nickname: req.body.name,
            tokens: {
                desktop: req.body.devicetype === 'desktop' ? [req.body.token] : [],
                mobile: req.body.devicetype === 'mobile' ? [req.body.token] : []
            }
        }
        await docRef.set(user);
    }

    res.json({ message: 'Record added successfully' });
})

app.post('/send-notification', async (req, res) => {
    let { title, description, click_action } = req.body;
    let devices = req.body.devices;
    let deviceTokens = [];
    const users = await db.collection('user').where('user_id', 'in', req.body.user_ids).get()
    if (users.docs.length > 0) {
        (users.docs).forEach(user => {
            devices.forEach(device => {
                let data = (user.data()).tokens[device];
                deviceTokens = [...deviceTokens, ...data];
            })
        });
    }
    deviceTokens.forEach(token => {
        const options = {
            url: NOTIFICATION_URL,
            json: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=" + serverKey
            },
            body: {
                "data": {
                    "title": title,
                    "message": description,
                    "click_action": click_action
                },
                "to": token
            }
        }
        request.post(options, (err, response, body) => {
            if (err) {
                res.status(400).json({ message: "Sorry! we could not process your request at the moment" });
            }
            res.status(200).json({ data: body });

        });
    });

})

app.get('/get-users', async (req, res) => {
    const users = await db.collection('user').get()
    let userData = [];
    if (users.docs.length > 0) {
        (users.docs).forEach(user => {
            let { user_id, user_email, nickname } = user.data();
            let data = [{
                userId: user_id,
                email: user_email,
                nickName: nickname
            }]
            userData = [...userData, ...data]
        });

    }
    res.status(200).json({ data: userData })
})

exports.app = functions.https.onRequest(app);