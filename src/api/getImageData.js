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
    if (response.status === 400) {
      throw new Error();
    };
    return response.json(response);
  })
  .catch(function () {
    console.log('error');
    return;
  });
  return result;
}

export default getImageData;
