import axios from 'axios';

const URL = 'https://conduit.productionready.io/api/users';

const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  json: true,
};

export const fetchSignUp = async (data, URL) => {
  const response = await axios.post({
    ...fetchOptions,
    data: JSON.stringify(data),
    url: URL,
  });
  return response;
};

export const fetchSignIn = async (data, URL) => {
  const response = await axios.post({
    ...fetchOptions,
    data: JSON.stringify(data),
    url: `${URL}/login`,
  });
  return respons;
};
