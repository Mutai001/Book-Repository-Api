import axios from 'axios';
import { Book } from '../types';

const API_URL = 'https://book-repository-api.onrender.com/';

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (book: Omit<Book, 'id'>) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

export const updateBook = async (book: Book) => {
  const response = await axios.put(`${API_URL}/${book.id}`, book);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
