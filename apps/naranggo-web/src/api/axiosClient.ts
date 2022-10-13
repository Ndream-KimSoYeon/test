import axios from 'axios';

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common.Authorization = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000
});

// instance.defaults.headers.common.Authorization =
//   'auth-token-here';

export default instance;
