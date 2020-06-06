import axios from 'axios';

const URL = 'https://conduit.productionready.io/api/users';

const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  json: true,
};

export const fetchSignUp = async (data) => {
  const response = await axios({
    ...fetchOptions,
    data: JSON.stringify(data),
    url: URL,
  });
  return response;
};

export const fetchSignIn = async (data) => {
  const response = await axios({
    ...fetchOptions,
    data: JSON.stringify(data),
    url: `${URL}/login`,
  });
  return response;
};
