# Rest APIs required for the Push Notification

Follow the below steps to run the application

1. Create an web app on the firebase console.

2. go to the functions folder and run the `npm install` command to install the dependencies.


3. Download the service account file and store it and then give the path in the index.js file.
   
         var serviceAccount = require("/path to service account");
         

3. Get the server key from the firebase and provide in the index file

       const serverKey = "<firebase server key>";
       
4. Get the database URL from the firebase and set it in index file

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "<firebase databaseURL>"
        });
       
5. install firebase-tools using `npm install firebase-tools`

6. Run the app from function folder using `npm run serve`

7. Deploy the app on the firebase using `npm run deploy`
