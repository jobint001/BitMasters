// palmInt.js
import dotenv from 'dotenv';
dotenv.config();
import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function generateRepeatedPhrases(text) {
  
  const prompt = `Find the most repeated phrases in this text. give me the top 5 most repeated phrases. the phrases should be minimum 5 words long. text: ${text}`;
  try {
    const result = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });
    if (result && result[0] && result[0].candidates && result[0].candidates.length > 0) {
      const outputText = result[0].candidates[0].output;
      console.log(outputText);
      return outputText;
    } else {
      console.log('No output text found.');
      return '';
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

const sampletext = 'random sentences used for testing this amazing project';
generateRepeatedPhrases(sampletext);

export default generateRepeatedPhrases;
