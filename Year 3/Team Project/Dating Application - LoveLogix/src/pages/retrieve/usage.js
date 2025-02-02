const { getSimilarityScore } = require('./BioMatcher'); // Replace with the actual path
//const retrievecrud = require('./retrieveBio');



const matches = async (Loggedin, Comparative) => {
// Example corpus strings (two different texts)
/*
const corpus1 = `
  Machine learning is a branch of artificial intelligence that allows computers to learn and make decisions without being explicitly programmed. 
  It uses algorithms and statistical models to analyze patterns in data and make predictions.
`;

const corpus2 = `
  Artificial intelligence involves creating systems that can perform tasks that normally require human intelligence. 
  Machine learning, a subset of AI, allows systems to learn from data and improve over time.
`;

const corpus3 = `
  I enjoy playing sports and working out in the gym. Regular physical activity helps me maintain a healthy lifestyle. 
  I also love outdoor activities like hiking and biking.
`;
*/

const corpus1 = "i am studying computer science";
const corpus2 = ' i like dancing or something';


// Calculate similarity between two corpora
const similarity1 = getSimilarityScore(Loggedin, Comparative);
console.log(Loggedin + " : " + Comparative + "");
console.log(`Similarity between corpus1 and corpus2: ${similarity1}`);
return similarity1;
// Calculate similarity between corpus1 and corpus3 (unrelated texts)
//const similarity2 = getSimilarityScore(corpus1, corpus3);
//console.log(`Similarity between corpus1 and corpus3: ${similarity2}`);

};
module.exports = {matches} ; // Export the usages object

