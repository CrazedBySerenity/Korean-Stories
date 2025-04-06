export async function handler(event, context) {
  // const systemPrompt = `You are a helpful assistant generating beginner-friendly Korean stories. You must output the chapter as valid JSON in the following format with no extra text: [[{"word": "가을", "tooltip": "autumn"}, ...], ...].`;
  
  // const userPrompt = `Generate a chapter in Korean for beginner learners inspired by real Korean stories. The chapter should contain 4-8 sentences. Each sentence must be an array of objects where each object has a "word" key and a "tooltip" key containing an English definition of the word. Return valid JSON.`;

  const systemPrompt = process.env.SYSTEM_PROMPT

  const userPrompt = process.env.USER_PROMPT

  try {
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });
    
    const result = await apiResponse.json();
    const chapter = JSON.parse(result.choices[0].message.content);
    
    return { statusCode: 200, body: JSON.stringify({ chapter }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
