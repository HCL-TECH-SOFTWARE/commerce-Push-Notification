# Push Notification Form

The Proof of concept to configure the push notification in the Mangement center from where the user can write and send the message to different user's devices based on the scenerios.

Scenerios like :

•	Show Notification in case of cart abandonment. (Apology message with coupons)

•	Send promotional message to specific users (General message like Christmas sale/Diwali sale)


# Implementation
 
 1. Follow the below steps to Create a menu "Push Management" in the Management Center (lobtools).
    
   - Create an entry in the ApplicationMenuItems.xml file
   
      ```ruby
       <!---
      PUSH START Application menu item for opening the Push Management tool.
      -->
      <ApplicationMenuItem actionName="openBusinessObjectEditor" displayName="Push Management" id="pushManagement" package="cmc/shell" toolDefinition="cmc/pushApp/pushManagement"/>
      <!-- PUSH END -->
      ```
      
  - Create the tool definition file and provide the url of an APP as shown below
  
      ```ruby
      
         <?xml version="1.0" encoding="UTF-8"?>
           <Definitions>

            <IFrameTool definitionName="cmc/pushApp/pushManagement" displayName="Push Management" src="http://mylocal.com:5500/push-notifications.html" respectWorkspaceContext="false">
           </IFrameTool>
            </Definitions>
      ```
      
2. Created the small App ie. index.html and run it locally using live server in vscode

      **Flow:**

      •	When user opens the Management center and selects menu Push Management, Push Notification Form will be opened.

      •	The form will be having Title and Description for the Push Notification. Multiselect list boxes for selecting users and devices to which we need to send the notification. Checkbox to select if we need to send the Action link/URL in the notification.


      **Implementation:**

      •	UI for sending notifications to the selected users and devices.

      •	Function for calling NodeJS API for getting users values from Firebase and declaring array for device types.

      •	Function for getting form values and create an JSON object to be passed as parameter for API to send the Push notification to selected users and device types.

      •	Validation for the required fields.


      **Validations:**

      •	All the required fields must be filled.

      •	At least one user id and device type must be selected.

      •	Title and description must be specified.



