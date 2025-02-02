const lda = require('lda');

/**
 * Calculate cosine similarity between two vectors.
 * @param {number[]} vecA - First vector.
 * @param {number[]} vecB - Second vector.
 * @returns {number} - Cosine similarity.
 */
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, index) => sum + val * vecB[index], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Dynamically set the number of topics based on the number of words in the corpus.
 * @param {string} corpusString - The corpus as a single large string.
 * @returns {number} - The number of topics to extract.
 */
function getNumberOfTopics(corpusString) {
  const words = corpusString.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  const numWords = words.length;

  if (numWords <= 50) {
    return 1;  // Short corpus, 1 topic
  } else if (numWords <= 200) {
    return Math.max(2, Math.floor(numWords / 100));  // Medium corpus, 2-4 topics
  } else {
    return 5;  // Long corpus, 5+ topics
  }
}

/**
 * Preprocess the text by converting to lowercase and removing punctuation.
 * @param {string} text - The text to preprocess.
 * @returns {string} - The cleaned text.
 */
function preprocess(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, '');
}

/**
 * Get the similarity score between two corpora.
 * @param {string} corpusString1 - The first corpus as a single large string.
 * @param {string} corpusString2 - The second corpus as a single large string.
 * @returns {number} - The average cosine similarity between the corpora.
 */
function getSimilarityScore(corpusString1, corpusString2) {
  const numTopics = getNumberOfTopics(corpusString1);

  // Apply LDA to extract topics
  const corpus1Topics = lda([preprocess(corpusString1)], numTopics, 5); // 5 terms per topic
  const corpus2Topics = lda([preprocess(corpusString2)], numTopics, 5); // 5 terms per topic

  // Convert topics into vectors
  const topicVectors1 = corpus1Topics.map(topic => topic.map(term => term.probability));
  const topicVectors2 = corpus2Topics.map(topic => topic.map(term => term.probability));

  // Calculate cosine similarity for each topic and average it
  const topicSimilarities = topicVectors1.map((topic1, index) => cosineSimilarity(topic1, topicVectors2[index]));
  const averageSimilarity = topicSimilarities.reduce((sum, similarity) => sum + similarity, 0) / topicSimilarities.length;

  return averageSimilarity;
}

// Export the getSimilarityScore function for use in other files
module.exports = { getSimilarityScore };
