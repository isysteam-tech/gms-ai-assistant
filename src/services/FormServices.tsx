import axios from "axios";

const token = process.env.REACT_APP_VAULT_TOKEN;
const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  timeout: 20000, 
  headers: {
    "Content-Type": "application/json",
    "x-vault-token": token, 
  },
});


export const addCommissionRate = async (payload: any) => {
  try {
    const response = await http.post("/gms-core/applicants", payload);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error in addCommissionRate:", error.message);
    throw error; 
  }
};
