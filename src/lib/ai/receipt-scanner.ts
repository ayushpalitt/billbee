import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type ReceiptScanResult = {
  amount: number | null;
  currency: string;
  category: string;
  merchant: string | null;
  confidence: number; // 0 to 1
  rawText?: string;
};

export async function scanReceiptWithVision(imageUrl: string): Promise<ReceiptScanResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key missing');
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are an AI receipt scanner. Extract amount, currency (e.g. USD), category, merchant, and give a confidence score from 0.0 to 1.0. Return strictly JSON with these keys: amount, currency, category, merchant, confidence."
      },
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      }
    ]
  });

  const content = response.choices[0].message.content || '{}';
  return JSON.parse(content) as ReceiptScanResult;
}
