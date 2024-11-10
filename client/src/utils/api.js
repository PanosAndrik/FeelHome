
const cleanUrl = (url) => {
    if (!url) return '';
    return url.replace(/\/+$/, '');
  };
  

  export const API_URL = cleanUrl(import.meta.env.VITE_API_URL) || 'http://localhost:4040';
  

  export const apiCall = (endpoint) => {
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    return `${API_URL}/${cleanEndpoint}`;
  };