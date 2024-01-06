import Axios from 'axios';

export default async function ProfileCall(A1) {
    try {
      const response = await Axios.get(`https://localhost:7115/v1/api/User/${A1}`);
      console.log(response);

    } catch (error) {
      console.error('Failed to connect to databank', error);
    }
  }
  