<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="admin-page">
    <div class="menu">
      <div @click="changeTab('profile')" :class="{ active: currentTab === 'profile' }">Profile</div>
      <div @click="changeTab('userList')" :class="{ active: currentTab === 'userList' }">User Lisr</div>
      <div @click="changeTab('logout')" class="logout-button" :class="{ active: currentTab === 'logout' }">LOGOUT</div>
    </div>

    <div class="content">
      <div v-if="currentTab === 'userList'">
        <h2 class="tab-title">User List</h2>
        <div v-for="user in paginatedUsers" :key="user.Email" class="user-card">
          <h3>{{ user.LastName }} {{ user.FirstName }}</h3>
          <p>Email: {{ user.email }}</p>
          <p>Numéro de Téléphone : {{ user.Number }}</p>
          <p>Date d'Inscription: {{ user.SignInDate }}</p>
          <p>{{ user.Status ? user.Status : 'Active' }}</p>
          <p><button @click="openEditModal(user)">Modifier</button></p>
          <p><button @click="toggleBanStatus(user)">
              {{ user.Status === 'Banned' ? 'Débannir' : 'Bannir' }}
            </button></p>
          <p><button @click="deleteUser(user)">Supprimer</button></p>
        </div>
        <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>

      </div>

      <div v-if="currentTab === 'profile'">
        <h2 class="tab-title">Admin Profile</h2>
        <div class="admin-info">
          <h3>Admin Information:</h3>
          <button @click="toggleChangeInfoPopup" class="change-info-button">Change Info</button>
        </div>

        <div v-if="showChangeInfoPopup" class="popup">
          <div class="popup-content">
            <span class="close-popup" @click="toggleChangeInfoPopup">×</span>
            <div class="popup-details">
              <div class="popup-description-and-price">
                <h2 class="popup-title">Change Admin Information</h2>
                <form @submit.prevent="changeAdminInfo">
                  <div class="form-group">
                    <label for="newName">Name:</label>
                    <input v-model="name" type="text" id="newName" required>
                  </div>
                  <div class="form-group">
                    <label for="newLastName">Last Name:</label>
                    <input v-model="lastName" type="text" id="newLastName" required>
                  </div>
                  <div class="form-group">
                    <label for="newEmail">Email:</label>
                    <input v-model="email" type="email" id="newEmail" required>
                  </div>
                  <div class="form-group">
                    <label for="newNumber">Phone:</label>
                    <input v-model="number" type="tel" id="newNumber" required>
                  </div>
                  <button type="submit" class="save-changes">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import Axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      currentTab: 'profile',
      showChangeInfoPopup: false,
      users: [],          // Liste complète des utilisateurs
      pageSize: 9,        // Nombre d'utilisateurs par page
      currentPage: 1,
      editingUser: {},
      editMode: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    },
  },
  methods: {
    changeTab(tab) {
      if (tab === 'logout') {
        this.logout();
      } else {
        this.currentTab = tab;
      }
    },
    toggleChangeInfoPopup() {
      this.showChangeInfoPopup = !this.showChangeInfoPopup;
    },
    changeAdminInfo() {
      // Create an object with the updated admin information
      const updatedAdminInfo = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        number: this.number,
      };

      // Send a PUT request to update the admin's information
      Axios.put('https://your-api-endpoint/update-admin-info', updatedAdminInfo)
        .then((response) => {
          // Handle the success response from the server
          console.log('Admin information updated successfully:', response.data);

          // Optionally, you can update the local adminInfo object with the new data
          this.adminInfo.username = response.data.username;
          this.adminInfo.email = response.data.email;
          this.adminInfo.number = response.data.number;

          // Reset the form
          this.showChangeInfoPopup = false;
        })
        .catch((error) => {
          // Handle errors
          console.error('Failed to update admin information:', error);
        });
    },
    currentUser() {
      let v = this;
      const auth = getAuth(firebase);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          v.email = user.email;
          v.fetchUserData(v.email);
        }
      });
    },
    fetchUserData(email) {
      let v = this;
      v.errorMessage = '';

      Axios.get(`https://localhost:7115/v1/api/User/${email}`)
        .then((response) => {
          v.name = response.data.FirstName;
          v.lastName = response.data.LastName;
          v.address = response.data.Address === '' ? 'Not Registered' : response.data.Address;
          v.number = response.data.Number === 0 ? 'Not Registered' : response.data.Number;
          v.bdate = response.data.BDate === '' ? 'Not Registered' : response.data.BDate;
          v.signindate = response.data.SignInDate === '' ? 'Not Registered' : response.data.SignInDate;
        })
        .catch((error) => {
          v.errorMessage = 'Not Connected';
          console.error('Failed to connect to databank', error);
        });
    },
    async fetchUsers() {
      try {
        const response = await Axios.get('https://localhost:7115/v1/api/User/');
        this.users = response.data.filter(user => user.Role === 'Client');
      } catch (error) {
        console.error('Failed to fetch admin users', error);
      }
    },
    openEditModal(user) {
      this.editingUser = { ...user };
      this.editMode = true;
    },
    async editUser() { //Will be modified later, need more testing
      try {

        const newUData = {
          FirstName: this.editingUser.FirstName,
          LastName: this.editingUser.LastName,
          Email: this.editingUser.Email,
          Number: this.editingUser.Number,
          Role: this.editingUser.Role,
          BDate: this.editingUser.BDate,
          SignInDate: this.editingUser.SignInDate,
          Status: this.editingUser.Status,
        };

        const response = await Axios.put(`https://localhost:7115/v1/api/User/${this.editingUser.Email}`, newUData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('User updated successfully', response.data);
        console.log('Modifications enregistrées pour ', this.editingUser);
        this.cancelEdit();

        this.fetchUsers();
      } catch (error) {
        console.error('Failed to fetch admin users', error);
      }
    },
    cancelEdit() {
      this.editMode = false;
    },
    async toggleBanStatus(user) {
      try {
        const newStatus = {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Number: user.Number,
          Role: user.Role,
          BDate: user.BDate,
          SignInDate: user.SignInDate,
          Status: user.Status === 'Banned' ? 'Active' : 'Banned',
        }
        user.Status === 'Banned' ? 'Active' : 'Banned';
        const response = await Axios.put(`https://localhost:7115/v1/api/User/${user.Email}`, newStatus,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('User status updated successfully', response.data);

        // Actualise la liste après la mise à jour du statut
        this.fetchUsers();
      } catch (error) {
        console.error('Failed to update user status', error);
      }
    },
    async deleteUser(user) {
      try {
        const response = await Axios.delete(`https://localhost:7115/v1/api/User/${user.Email}`)
        console.log('User updated successfully', response.data);
        this.fetchUsers();
      } catch (error) {
        console.error('Failed to fetch admin users', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }, 
    logout() {
      const auth = getAuth(firebase);
      signOut(auth)
        .then(() => {
          this.$nextTick(() => {
            this.$router.push('/');
          });
        })
        .catch((error) => {
          console.log('logout error: ', error.message);
        });
    },
  },
  mounted() {
    this.currentUser();
    this.fetchUsers();
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.admin-page {
  display: flex;
  max-width: 100%;
  height: 290vh;
  margin: 100px auto;
  background-color: #fff;
  margin-top: 170px;

}

.menu {
  width: 200px;
  background-color: #ffffff;
  padding: 20px;
  margin-top: 130px;
}

.menu div {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.menu div:hover {
  color: #095328;
}

.menu .active {
  background-color: #ddd;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.tab-title {
  font-family: 'Kaisei Decol', sans-serif;
  text-align: center;
  position: relative;
  font-size: 34;
  font-weight: 400;
}

.tab-title:after {
  content: "";
  display: block;
  width: 50px;
  height: 2px;
  background-color: #333;
  margin: 10px auto;
}

.user-card {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.admin-info {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.Profile {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}


.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  height: 400PX;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 56PX;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  text-align: left;
}

.popup-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popup-title {
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.save-changes {
  background-color: #097328;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.save-changes:hover {
  opacity: 0.9;
}

.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: black;
  cursor: pointer;
}

.logout-button {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  color: #ff0000;
}

.logout-button:hover {
  color: #cc0000;
}

.logout-button.active {
  background-color: #ffcccc;
}
</style>