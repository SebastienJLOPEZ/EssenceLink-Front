// CheckerRole.js
import Axios from 'axios';

export default async function checkUserType(A1, A2, A3, A4, A5) {
  try {
    const response = await Axios.get(`https://localhost:7115/v1/api/User/${A1}`);
    console.log(response);

    switch (response.data.Role) {
      case "AdminClient":
        A2();
        localStorage.setItem('headerRole', "Admin")
        break;
      case "AdminProduct":
        localStorage.setItem('headerRole', "Admin")
        A3();
        break;
      case "Client":
        localStorage.setItem('headerRole', "Client")
        A4();
        break;
      default:
        localStorage.setItem('headerRole', "Client")
        A5();
        break;
    }
  } catch (error) {
    console.error('Failed to connect to databank', error);
  }
}
