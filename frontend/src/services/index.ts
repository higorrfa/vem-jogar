import axios from 'axios';

import { setupInterceptorsTo } from './Interceptor';

export const setupAxios = (): void => {
  setupInterceptorsTo(axios);

  axios.defaults.baseURL = 'http://localhost:3000';
};
