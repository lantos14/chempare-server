const fetch = require("node-fetch");

const getStructureData = async (reqBody) => {
  const result = await fetch('https://api.chemicalize.com/v1/search/structure', {
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

export default getStructureData;
