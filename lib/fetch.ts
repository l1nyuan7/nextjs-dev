import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const insecureFetch = (url: string, options: any = {}) => {
  return fetch(url, { agent: httpsAgent, ...options });
};