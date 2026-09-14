import axios from "axios";
import type { Branch, Class } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Récupère toutes les succursales
export const getBranches = async (): Promise<Branch[]> => {
  const response = await axios.get(`${API_URL}/branches`);
  return response.data;
};

// Récupère les cours d'une succursale
export const getClassesByBranch = async (
  branchCode: number,
): Promise<Class[]> => {
  const response = await axios.get(`${API_URL}/branches/${branchCode}/classes`);
  return response.data;
};

// Supprime un cours
export const deleteClass = async (classCode: number): Promise<void> => {
  await axios.delete(`${API_URL}/classes/${classCode}`);
};

// Ajoute un nouveau cours
export const addClass = async (
  newClass: Omit<Class, "class_code">,
): Promise<Class> => {
  const response = await axios.post(`${API_URL}/classes`, newClass);
  return response.data;
};

// Récupère un cours par son code
export const getClassByCode = async (classCode: number): Promise<Class> => {
  const response = await axios.get(`${API_URL}/classes/${classCode}`);
  return response.data;
};

// Met à jour un cours existant
export const updateClass = async (
  classCode: number,
  data: Omit<Class, "class_code">,
): Promise<Class> => {
  const response = await axios.put(`${API_URL}/classes/${classCode}`, data);
  return response.data;
};
