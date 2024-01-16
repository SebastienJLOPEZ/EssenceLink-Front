import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default async function checkAuthentication() {
        const auth = getAuth(firebase);
    
        try {
          const user = await new Promise(resolve => onAuthStateChanged(auth, resolve));
    
          if (!user) {
            this.$router.push('/login');
          }
        } catch (error) {
          console.error('Error checking authentication status:', error);
        }
      }
