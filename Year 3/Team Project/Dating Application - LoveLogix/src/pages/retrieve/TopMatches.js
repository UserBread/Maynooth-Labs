const retrievecrud = require('./retrieveBio');
const express = require("express");
const admin = require("firebase-admin");
const matches = require('./usage'); // Import matches
const SortedUserScores = [];
// Initialize Firebase Admin SDK
const serviceAccount = require("../../"); // Replace with your Firebase service account key


const db = admin.firestore(); // Get Firestore instance
const app = express();

// Endpoint to fetch data and print it to the console

const results = [];


const TopFiveAlgorithm = async (Loggedin) => {
    const docRef = db.collection("userinformation"); // Reference to the Firestore collection
    const querySnapshot = await docRef.get(); // Fetch all documents in the collection

    const documentIds = [];
    querySnapshot.forEach((doc) => {
        documentIds.push(doc.id); // Add each document ID to the array
    });
    
    for (const docId of documentIds) {
        
        if(Loggedin != docId){
            const bio1 = (await retrievecrud.retrieveAll(Loggedin)).toLowerCase();
            const bio2 = (await retrievecrud.retrieveAll(docId)).toLowerCase();
            var score = await matches.matches(bio1, bio2) * 100;

            if (isNaN(score)) {
                var x = Math.floor(Math.random() * 26); // Generate a random score between 0 and 25
                console.log(`Score was NaN. Assigning random score: ${x}`);
                score = x;
            }
            
            SortedUserScores.push(`${Loggedin}:${docId}:Score:${score}`);
        }
    }    

    SortedUserScores.sort((a, b) => {
        // Extract the score by splitting the string
        const scoreA = parseFloat(a.split(":")[3]);
        const scoreB = parseFloat(b.split(":")[3]);
        
        // Sort in descending order (highest score first)
        return scoreB - scoreA;
    });

    
    console.log(SortedUserScores);
    for(var i = 0; i < SortedUserScores.length; i++){
        const comparing = SortedUserScores[i].substring(SortedUserScores[i].indexOf(':')+1, SortedUserScores[i].lastIndexOf(':')-6);
        const score = SortedUserScores[i].substring(SortedUserScores[i].lastIndexOf(':')+1);
        console.log(comparing + " - " + score);
        return SortedUserScores;
    }
};
module.exports = {TopFiveAlgorithm} ; // Export the usages object
// Start the Express server
//make sure people are the same region 