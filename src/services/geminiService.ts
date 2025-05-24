import { getGeminiApiKey, getGeminiUrl } from '../config/api';

export class GeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async generateContent(prompt: string): Promise<string> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    const body = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No AI response.';
    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw new Error('Failed to get response from Gemini AI');
    }
  }
}

export const geminiService = new GeminiService(getGeminiApiKey(), getGeminiUrl()); 