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
import Axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { isMobile } from "react-device-detect";
import store from "../../redux/store/index";



const SAVE_TOKEN_URL = "<API TO SAVE TOKEN> ";
const SEND_NOTIFICATION_URL = "<API TO SEND NOTIFICATION> ";

const notificationService = {

    getUserInfoFromStore() {
        let state = store.getState();
        let loggedIn = state.user.hasOwnProperty('userLoggedIn') ? state.user['userLoggedIn'] : false;
        let {userId,email1,firstName}=state.user['details'];
        const deviceType = isMobile ? 'mobile' : 'desktop';
        return {
            id: userId,
            email:email1,
            name:firstName,
            devicetype:deviceType
        }
    },
    saveTokenToDB( token): AxiosPromise<any> {
        let requestOptions: AxiosRequestConfig = Object.assign({
            data: {
                token: token,
                ...this.getUserInfoFromStore()
            },
            url: SAVE_TOKEN_URL,
            method: "post"
        });

        return Axios(requestOptions);

    },

    sendNotification(title, description): AxiosPromise<any> {

        let requestOptions: AxiosRequestConfig = Object.assign({
            data: {
                user_ids: [this.getUserInfoFromStore().id],
                devices: [this.getUserInfoFromStore().devicetype],
                title: title,
                description: description,
                click_action: window.location.origin
            },
            url: SEND_NOTIFICATION_URL,
            method: "post"
        });

        return Axios(requestOptions);

    }

};


export default notificationService;

