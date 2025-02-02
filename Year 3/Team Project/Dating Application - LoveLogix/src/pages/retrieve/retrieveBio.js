const express = require("express");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../../"); // Replace with your Firebase service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Get Firestore instance
const app = express();

// Endpoint to fetch data and print it to the console


const retrieveAll = async (document_id) => {
    try {
        const postsRef = db.collection("userinformation"); // Correct usage for Firestore Admin SDK
        const querySnapshot = await postsRef.get();

        let output = {
            data: {} 
        };
        
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,          // Document ID
            ...doc.data(),       // Document fields
        }));
        
        data.forEach((doc) => {
            const { id, ...fields } = doc; // Separate id and fields
            output.data[id] = fields;     // Add the fields under the document ID
        });
        

        const formattedJson = JSON.stringify(output, null, 2); // Pretty-print with 2-space indentation
        const userData = output.data[document_id].bio;

        //const userData = output.data;

        var fs = require('fs');
        fs.writeFile("userinformation.txt", formattedJson, function(err) {
            if (err) {
                console.log(err);
            }
        });
        

        return userData;
    // Respond with data
    } catch (error) {

    }
};
module.exports = {retrieveAll} ; // Export the usages object
