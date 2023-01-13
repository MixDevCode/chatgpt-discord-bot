const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
  });
const openai = new OpenAIApi(configuration);

module.exports = async (prompt) => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 512,
            temperature: 0.5
        });
        let result = completion.data.choices[0].text;
        result += `\n\nTokens utilizados en este texto: ${completion.data.usage.total_tokens}\nValor estimado: $${completion.data.usage.total_tokens*0.0002}`;
        return result;
    }  catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          return "";
        } else {
          console.log(error.message);
          return "";
        }
      }
};