# Push_notification_v2.0_POC

**The Proof of concept to provide the capability of showing push notification on the React store using Firebase cloud messaging.**


The user would be able to receive notification based on the scenerios like 

    •	Show Notification for registered user when they login to Emerald. (Welcome message)

    •	Show Notification in case cart abandonment. (Apology message with coupons)

    •	Show notification when order is placed. (Thank you message)

    •	Show notification(coupons) when product is added in the cart (Encouraging message with basic coupon code if he checkout the product)

    •	Send promotional message to specific users (General message like Christmas sale/Diwali sale)


**The Implementation includes below Component**

 1. Firebase account
 
     Create an account and web app on the firebase console.
     
 2. React Store Changes
 
     Please follow the Readme file placed inside react-store folder to do changes in the React store to register it with firebase and token generation using cloud messaging and send some instant notification.
   
3. Add Menu in CMC

     Please follow the Readme file placed inside cmc folder to the changes in CMC to send the offline notification to the user

4. NodeJs for REST APIs
   
    Please follow the readme file placed inside node-app for the REST APIs used to send notification and to save the token etc.
      




 
