// CheckerRole.js
import Axios from 'axios';

export default async function checkUserType(A1, A2, A3, A4) {
  try {
    const response = await Axios.get(`https://localhost:7115/v1/api/User/${A1}`);
    console.log(response);

    switch (response.data.Role) {
      case "AdminClient":
        A2();
        break;
      case "AdminProduct":
        A3();
        break;
      case "Client":
        A4();
        break;
      default:
        // Gestion d'un rôle inconnu, si nécessaire.
        break;
    }
  } catch (error) {
    console.error('Failed to connect to databank', error);
  }
}
