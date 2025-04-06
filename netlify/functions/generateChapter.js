const fetch = import('node-fetch');

exports.handler = async (event, context) => {
  const prompt = `Generate a chapter in Korean for beginner learners inspired by real Korean stories. The chapter should contain 4-8 sentences. Each sentence must be an array of objects where each object has a "word" key and a "tooltip" key containing an English definition of the word. Return valid JSON.`;

  try {
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    const result = await apiResponse.json();
    // Assume the response is a valid JSON chapter (as a string) that we parse here.
    const chapter = JSON.parse(result.choices[0].message.content);
    
    return { statusCode: 200, body: JSON.stringify({ chapter }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
