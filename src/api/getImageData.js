const fetch = require("node-fetch");

const getImageData = async (reqBody) => {
  const result = await fetch('https://api.chemicalize.com/v1/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.CHEMICALIZE_TOKEN,
    },
    body: JSON.stringify(reqBody)
  })
  .then(function (response) {
    return response.json(response);
  });
  return result;
}

export default getImageData;
