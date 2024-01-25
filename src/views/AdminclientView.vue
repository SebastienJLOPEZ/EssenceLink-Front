<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="admin-page">
    <div class="menu">
      <div @click="changeTab('profile')" :class="{ active: currentTab === 'profile' }">PROFILE</div>
      <div @click="changeTab('userList')" :class="{ active: currentTab === 'userList' }">LISTE DES CLIENTS</div>
      <div @click="changeTab('userSearch')" :class="{ active: currentTab === 'userSearch' }">RECHERCHE</div>
    </div>

    <div class="content">
      <div v-if="currentTab === 'userList'">
        <h2 class="tab-title">User List</h2>
        <div v-for="user in paginatedUsers" :key="user.Email" class="user-card">
          <tr>
            <td>Nom :</td>
            <td>Email :</td>
            <td>Téléphone :</td>
            <td>Anniversaire :</td>
            <td>Date d'Inscripion :</td>
            <td>Status :</td>
          </tr>
          <tr>
            <td>{{ truncateString(user.LastName + ' ' + user.FirstName, 15) }}</td>
            <td>{{ truncateString(user.Email, 15) }}</td>
            <td>{{ user.Number }}</td>
            <td>{{ user.BDate }}</td>
            <td>{{ user.SignInDate }}</td>
            <td>{{ user.Status ? user.Status : 'Active' }}</td>
          </tr>
          <div class="button-sidebar">
            <button @click="openEditModal(user)">Modifier</button>
            <button @click="toggleBanStatus(user)">
              {{ user.Status === 'Banned' ? 'Débannir' : 'Bannir' }}
            </button>
            <button @click="deleteUser(user)">Supprimer</button>
          </div>
        </div>

        <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>

        <div v-if="openPopUp" class="popup-container">
          <form @submit.prevent="editUser">
            <tr>
              <td>Prénom :<br><input v-model="editingUser.FirstName" /></td>
              <td>Nom :<br><input v-model="editingUser.LastName"></td>
            </tr>
            <tr>
              <td>Email :<br><input v-model="editingUser.Email" /></td>
              <td>Numéro :<br><input v-if="isValidNumber(editingUser.Number)" v-model="editingUser.Number" />
                <input v-else />
              </td>
            </tr>
            <tr>
              <td>Date d'Anniversaire :<br><input v-model="editingUser.BDate" /></td>
            </tr>
            <button type="submit">Enregistrer</button>
            <button type="cancel" @click="cancelEdit">Annuler</button>
          </form>
        </div>
      </div>

      <div v-if="currentTab === 'profile'">
        <h2 class="tab-title">Admin Profile</h2>
        <div class="admin-info">
          <h3>Admin Information:</h3>
          <p>Nom : {{ name }} {{ lastName }}</p>
          <p>Adresse mail: {{ email }}</p>
          <p>Anniversaire : {{ bdate }}</p>
          <p>Numéro : {{ number }}</p>
          <button @click="toggleChangeInfoPopup" class="change-info-button">Change Info</button>
        </div>

      </div>

      <div v-if="currentTab === 'userSearch'" class="user-search">
        <input type="text" v-model="searchTerms" @input="search">
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Numéro</th>
          <th>Date de naissance</th>
          <th>Date de connexion</th>
          <th>Statut</th>
        </tr>
        <div v-if="editMode" class="Result">
          <div v-for="user in searchResult" :key="user.Email">
            <tr>
              <td>{{ user.LastName }}</td>
              <td>{{ user.FirstName }}</td>
              <td>{{ truncateString(user.Email, 15) }}</td>
              <td>{{ user.Number }}</td>
              <td>{{ user.BDate }}</td>
              <td>{{ user.SignInDate }}</td>
              <td>{{ user.Status ? user.Status : 'Active' }}</td>
            </tr>
            <button @click="openEditModal(user)">Modifier</button>
            <button @click="toggleBanStatus(user)">
              {{ user.Status === 'Banned' ? 'Débannir' : 'Bannir' }}
            </button>
            <button @click="deleteUser(user)">Supprimer</button>
          </div>
          <div v-if="openPopUp" class="popup-container">
            <form @submit.prevent="editUser">
              <tr>
                <td>Prénom :<br><input v-model="editingUser.FirstName" /></td>
                <td>Nom :<br><input v-model="editingUser.LastName"></td>
              </tr>
              <tr>
                <td>Email :<br><input v-model="editingUser.Email" /></td>
                <td>Numéro :<br><input v-if="isValidNumber(editingUser.Number)" v-model="editingUser.Number" />
                  <input v-else />
                </td>
              </tr>
              <tr>
                <td>Date d'Anniversaire :<br><input v-model="editingUser.BDate" /></td>
              </tr>
              <button type="submit">Enregistrer</button>
              <button type="cancel" @click="cancelEdit">Annuler</button>
            </form>
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
  mixins: [],
  data() {
    return {
      currentTab: 'profile',
      showChangeInfoPopup: false,
      users: [],          // Liste complète des utilisateurs
      pageSize: 9,        // Nombre d'utilisateurs par page
      currentPage: 1,
      editingUser: {},
      editMode: false,
      name: "",
      lastName: "",
      number: "",
      bdate: "",
      email: "",
      displayedNumber: "",
      searchTerms: '',
      searchResult: [],
      openPopUp: false,
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
      this.currentTab = tab;
      this.editMode = false;
      this.searchTerms = '';
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
          v.number = (response.data.Number.startsWith('0') && response.data.Number.length === 10) ? response.data.Number : 'Non rempli'
          v.bdate = response.data.BDate === '' ? 'Non rempli' : response.data.BDate;
          v.signindate = response.data.SignInDate === '' ? 'Non rempli' : response.data.SignInDate;
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
      this.openPopUp = true;
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
      this.editingUser = [];
      this.openPopUp = false;
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
    truncateString(value, length) {
      if (!value) return '';
      if (value.length <= length) return value;
      return value.substring(0, length);
    },
    isValidNumber(number) {
      // Vérifier si la valeur ne commence pas par zéro et a une longueur de 10 caractères
      return number.startsWith("0") && number.length === 10;
    },
    async search() {
      try {
        if (this.searchTerms.trim() === '') {
          this.editMode = false;
          this.searchResult = [];
          return;
        }
        const response = await Axios.get(`https://localhost:7115/v1/api/User/Search/${this.searchTerms}`);
        console.log(response);

        this.editMode = true;
        this.searchResult = response.data;
      } catch (error) {
        console.error('Failed to fetch admin users', error);
      }
    },
    /*formatDate(dateString) {
      const dateObj = new Date(dateString);
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
      return formattedDate;
    },*/
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
@font-face {
  font-family: 'Kaisei Decol';
  src: url('https://fonts.gstatic.com/s/kaiseidecol/v5/ZiKgWqde6e8Ow1MfY2gnDA.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}

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
  position: relative;

}

.button-sidebar {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(-300%) translateY(-50%);
  display: flex;
  flex-direction: column;
}

/*table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}*/

.user-card td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.user-card td:not(:nth-child(4)) {
  width: 150px;
}

.user-card td:nth-child(4) {
  width: 150px;
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

.popup-container {
  /*position: fixed;*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 9999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.user-search {
  background-color: #f0f0f0;
}

.user-search th {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.user-search th:not(:nth-child(5)) {
  width: 150px;
}

.user-search th:nth-child(5) {
  width: 150px;
}

.user-search td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.user-search td:not(:nth-child(4)) {
  width: 150px;
}

.user-search td:nth-child(4) {
  width: 150px;
}
</style>