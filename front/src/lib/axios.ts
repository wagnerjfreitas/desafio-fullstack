import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export function apiException(error: unknown): string {
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {      
      console.error('Erro de resposta HTTP:', axiosError.response.status, axiosError.response.data);
      return (typeof axiosError.response.data === 'string') ? axiosError.response.data : JSON.stringify(axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Não foi possível fazer a requisição:', axiosError.request);
      return 'Não foi possível fazer a requisição.'
    } else {
      console.error('Erro inesperado:', axiosError.message);
      return 'Erro inesperado'
    }
  } else {
    console.error('Erro desconhecido:', error);
    return 'Erro desconhecido'
  }
}