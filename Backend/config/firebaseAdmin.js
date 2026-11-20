import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const key = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// console.log("KEY EXISTS:", !!key);
// console.log("KEY START:", key?.substring(0, 30));
// console.log("KEY END:", key?.slice(-30));

const firebaseAdmin = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: key,
    }),
});

export const firebaseAuth = getAuth(firebaseAdmin);