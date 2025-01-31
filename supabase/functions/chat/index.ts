import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, doctorSpecialty } = await req.json();
    console.log('Received request:', { doctorSpecialty, messageCount: messages.length });

    // Add system message based on doctor specialty
    const systemMessage = {
      role: "system",
      content: `You are a highly qualified ${doctorSpecialty} with extensive experience. Provide accurate, professional medical advice while maintaining a compassionate tone. Always remind patients to consult with their healthcare provider for definitive diagnosis and treatment.`
    };

    console.log('Making request to Groq API');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [systemMessage, ...messages],
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.6,
        max_tokens: 4096,
        top_p: 0.95,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', errorData);
      throw new Error(`Groq API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    console.log('Groq API response received');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'An error occurred while processing your request'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});