import { USER_TOKEN } from './storage';

interface APIOptions {
  auth?: boolean;
  body?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const Fetch = async <T>(url: string, options: APIOptions) => {
  let errorMessage = '';

  try {
    const userToken = localStorage.getItem(USER_TOKEN);
    const response = await fetch(url, {
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: options.auth
        ? {
            Authorization: `Basic ${userToken}`,
            'Content-Type': 'application/json'
          }
        : { 'Content-Type': 'application/json' },
      method: options.method
    });

    const jsonData = await response.json();

    if (response.ok) {
      return jsonData.data as T;
    } else if (jsonData.data) {
      errorMessage = jsonData.data as string;
    } else {
      errorMessage = `API request failed. Status: ${response.status}`;
    }
  } catch (ex) {
    errorMessage = 'Unable to connect to API';
  }

  if (errorMessage) {
    throw new Error(errorMessage);
  }
};

export default Fetch;
