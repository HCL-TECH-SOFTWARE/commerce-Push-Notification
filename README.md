# Push Notification POC

## WARRANTY & SUPPORT 
HCL Software provides HCL Commerce open source assets “as-is” without obligation to support them nor warranties or any kind, either express or implied, including the warranty of title, non-infringement or non-interference, and the implied warranties and conditions of merchantability and fitness for a particular purpose. HCL Commerce open source assets are not covered under the HCL Commerce master license nor Support contracts.

If you have questions or encounter problems with an HCL Commerce open source asset, please open an issue in the asset's GitHub repository. For more information about [GitHub issues](https://docs.github.com/en/issues), including creating an issue, please refer to [GitHub Docs](https://docs.github.com/en). The HCL Commerce Innovation Factory Team, who develops HCL Commerce open source assets, monitors GitHub issues and will do their best to address them. 

## HCLC Push Notification Asset

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
      




 
