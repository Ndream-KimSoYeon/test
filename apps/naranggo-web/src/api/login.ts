import axios from './axiosClient';

export const loginNRG = (loginParams: LoginParams) =>
  axios.post('/userlogin', loginParams).then((res) => res.data);
