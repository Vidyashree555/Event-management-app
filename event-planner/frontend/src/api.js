// src/api.js
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/events';

export const getEvents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createEvent = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const getUpcomingEvents = async () => {
  const res = await axios.get(`${API_URL}/upcoming`);
  return res.data;
};

export const getPastEvents = async () => {
  const res = await axios.get(`${API_URL}/past`);
  return res.data;
};

