import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";

export const getContacts = () => axios.get(`${API_BASE_URL}/contact`);
export const addContact = (contact) => axios.post(`${API_BASE_URL}/contact`, contact);
export const deleteContact = (id) => axios.delete(`${API_BASE_URL}/contact/${id}`);
export const updateContact = (id, updatedData) => axios.put(`${API_BASE_URL}/contact/${id}`, updatedData);
export const getSingleContact = (id) => axios.get(`${API_BASE_URL}/contact/${id}`);
