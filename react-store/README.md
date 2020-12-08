Send Push Notifications to a device on user actions.

User should be able to receive notifications as per actions while using the applications.

Scenarios:
1. Send Welcome Notification when user logs in or sign up on the Emerald.
2. Send Thank you notificataion when user sign outs the application.
3. Send offers to the users whenever he adds anything to the cart.

Implementation:

1. Create a notification service file which have all the methods like saving the token, sending the notification etc.


Below are functions included in the notification service file.

getUserInfoFromStore: This function returns the userinfo from the database store.

saveTokenToDB: This function stores the user token into the database.

Send Notification: Send Notification function is used to send the notification to a particular device, or a set of devices.


2. Create a firebase configuration file for storing the configurations.



