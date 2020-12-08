# Push Notification Form

**Requirement: **

Create a form to send Push Notification to selected users and selected devices at the same time.

**Flow:**

•	When user opens the Management center and selects menu Push Management, Push Notification Form will be opened.

•	The form will be having Title and Description for the Push Notification. Multiselect list boxes for selecting users and devices to which we need to send the notification. Checkbox to select if we need to send the Action link/URL in the notification.

**Implementation:**
•	UI for sending notifications to the selected users and devices.

•	Function for calling NodeJS API for getting users values from Firebase and declaring array for device types.

•	Function for getting form values and create an JSON object to be passed as parameter for API to send the Push notification to selected users and device types.

•	Validation for the required fields.

**Validations: **

•	All the required fields must be filled.

•	At least one user id and device type must be selected.

•	Title and description must be specified.

**Scenarios:**

•	Send Notification to the registered user ids.

•	For each registered user id, device type must be selected as Desktop, mobile or Tablet. Any one of them or all of them.

•	Send customized notifications to different users using the form.
