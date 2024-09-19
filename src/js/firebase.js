import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWk0pfI3SaUFnZo5vZoUVN8qC9Iq_gl1g",
  authDomain: "task-management-app-507ed.firebaseapp.com",
  projectId: "task-management-app-507ed",
  storageBucket: "task-management-app-507ed.appspot.com",
  messagingSenderId: "71925330979",
  appId: "1:71925330979:web:28c17983033c00013d6d96",
  measurementId: "G-N4H06N05TN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await messaging.getToken({
      vapidKey:
        "BAE07LR0f5clAa9CW3KAbb03wrqL7fgMrR4PP9BegR-Cv-DxW5rWjiH-9X7sJPwgYrJcKyEOldkkhIdKqtlSWQ4",
    });
    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("Error getting FCM token:", err);
  }
};

// Listen for messages when the app is open
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
});
