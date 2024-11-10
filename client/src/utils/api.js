const cleanUrl = (url) => url.replace(/([^:]\/)\/+/g, "$1"); 

export const API_URL = cleanUrl(import.meta.env.VITE_API_URL || 'http://localhost:4040');


export const apiCall = (endpoint) => {
  return `${API_URL}/${endpoint.replace(/^\/+/, '')}`; /