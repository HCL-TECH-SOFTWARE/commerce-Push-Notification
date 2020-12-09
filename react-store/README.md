# Push Notification for React Web App

**User would be able to receive notification based on the scenerios if he allows Notification on the browser**

**Scenarios:**

1. Send Welcome Notification when user logs in or sign up on the Emerald.

2. Send Thank you notificataion when user sign outs the application.

3. Send offers to the users for encouragment whenever he adds anything to the cart .


# Implementation:

**Follow the Below steps to implement the push notification**

1. Install firebase as a npm package using below command
     `npm install firebase`
    
2. Add the "push-notification" folder inside te components folder.It has two files notification.service.ts and push-notification.js file 

    - a notification service file(notification.service.js)  have all the methods like saving the token, sending the notification etc.
    - push-notification.js file has firebase configuration to initialize the fiebase sdk and also connect firebase messaging to generate the token and save in the firestore.

3. Call the `initializeFirebase()` method from the index.tsx file placed inside src folder.It will initailise the configuration and connect with firebase SDK.

      ```ruby
      /**PUSH Notification */
      initializeFirebase();
      /**PUSH Notification */
      ```

4. For Welcome notification, need to do the below changes in `SignInLayout.tsx` file.

  - import the dependencies
  
      ```ruby
       /**PUSH Notification */
        import notificationService from "../../push-notification/notification.service";
        import { askForPermission } from "../../push-notification/push-notification";
         /**PUSH Notification */
     ```
  - Add the below method and call when login status is true
  
      ```ruby
       /**PUSH Notification */
        const showWelcomeNotification = () => {
          askForPermission().then(() => {
            if (sessionStorage.getItem("notification-flag") ) {
              notificationService.sendNotification("Welcome to Emerald", "Happy Shopping !!!");
            }
          })
        }
        /**PUSH Notification */

        if (loginStatus === true) {
           /**PUSH Notification */
          showWelcomeNotification();
         /**PUSH Notification */
          return <Redirect to={redirectRoute} />;
        } else {
      ```
  
5.  Add the firebase-messaging-sw.js file in the assests/common/public folder to receive the push event and show the notification on the browser.


**Note** : Service Worker will work only on the secure connection i.e SSL certificate should be there otherwise service worker(firebase-messaging-sw.js) file won;t get register and user wont be able to see the push notification
