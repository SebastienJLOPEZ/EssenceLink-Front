<template>
    <div class = NonPermanent>
        <router-link class="nav-link" to="/AdminClientProfile">Client</router-link>
    </div>
    <div class = List>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Mail</th>
            <th>Numéro</th>
            <th>Status</th>
            <th>Modifier</th>
            <th>Bannir</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.Email">
            <td>{{ user.LastName }}</td>
            <td>{{ user.FirstName }}</td>
            <td>{{ user.Email }}</td>
            <td>{{ user.Number }}</td>
            <td>{{ user.BDate }}</td>
            <td>{{ user.SignInDate }}</td>
            <td>{{ user.Status ? user.Status : 'Active'  }}</td>
            <td><button @click="openEditModal(user)">Modifier</button></td>
            <td><button @click="toggleBanStatus(user)">
                 {{ user.Status === 'Banned' ? 'Débannir' : 'Bannir' }}
                </button></td>
            <td><button @click="deleteUser(user)">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
  
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>

      <!--modal name="edit-modal"-->
        
      <!--/modal-->
    </div>
    <div v-if="editMode" class="popup-container">
        <form @submit.prevent="editUser">
            <input v-model="editingUser.FirstName" /> <input v-model="editingUser.LastName">
            <input v-model="editingUser.Email" /> 
            <input v-model="editingUser.Number" /> 
            <input v-model="editingUser.BDate" /> 
            <button type="submit">Enregistrer</button>
            <button type="cancel" @click="cancelEdit">Annuler</button>
        </form>
    </div>
</template>
  
<script>
import Axios from 'axios';
  
export default {
    props: {
      // Ajoutez d'autres props si nécessaire
    },
    data() {
      return {
        users: [],          // Liste complète des utilisateurs
        pageSize: 9,        // Nombre d'utilisateurs par page
        currentPage: 1, 
        editingUser: {},
        editMode: false,    // Page actuelle
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
            },});
            console.log('User updated successfully', response.data);
            console.log('Modifications enregistrées pour ', this.editingUser);
            this.cancelEdit();

            this.fetchUsers();
        } catch(error){
          console.error('Failed to fetch admin users', error);
        }
    },
    cancelEdit() {
        this.editMode = false;
    },
      async toggleBanStatus(user) {
    try {
      const newStatus ={
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
        } catch(error){
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
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
* {
    box-sizing: border-box;
  }

  .NonPermanent{
    display: flex;
    max-width: 100%;
    /*height: 2vh;*/
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }

  .List {
    display: flex;
    max-width: 100%;
    height: 2vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }

  .popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 9999;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
</style>