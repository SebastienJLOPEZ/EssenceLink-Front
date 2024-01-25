// CheckerRole.js
import Axios from 'axios';

export default async function checkUserStatus(A1) {
  try {
    const response = await Axios.get(`https://localhost:7115/v1/api/User/${A1}`);
    console.log(response);
    return response.data.Status;
  } catch (error) {
    console.error('Failed to connect to databank', error);
  }
}
