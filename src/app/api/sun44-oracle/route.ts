import { NextRequest, NextResponse } from 'next/server';
import { getSecret } from '../../lib/secrets-vault';

interface OracleRequest {
  question: string;
  sessionType: 'general' | 'practice' | 'vision' | 'spiritual' | 'health';
  userLevel?: number;
  systemPrompt: string;
  config: {
    maxTokens: number;
    temperature: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { question, sessionType, userLevel, systemPrompt, config }: OracleRequest = await request.json();

    console.log('Sun 44 Oracle Query:', {
      question: question.substring(0, 100) + '...',
      sessionType,
      userLevel
    });

    const apiKey = await getSecret('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured in secrets vault');
    }

    // OpenAI API call
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const data = await openAIResponse.json();
    const response = data.choices[0]?.message?.content?.trim();

    if (!response) {
      throw new Error('Empty response from OpenAI');
    }

    console.log('Sun 44 Oracle Response:', response.substring(0, 100) + '...');

    return NextResponse.json({ 
      response,
      sessionType,
      userLevel,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Sun 44 Oracle API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Oracle unavailable', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}