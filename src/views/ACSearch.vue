<template>
    <div class = NonPermanent>
        <router-link class="nav-link" to="/ACList">Client</router-link>
        <router-link class="nav-link" to="/AdminClientProfile">Profile</router-link>
    </div>
    <div class="Search">
        <input type="text" v-model="searchTerms" @input="search">
        
    </div>
    <div v-if="editMode" class="Result">
        <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Numéro</th>
        <th>Date de naissance</th>
        <th>Date de connexion</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in searchResult" :key="user.Email">
        <td>{{ user.LastName }}</td>
        <td>{{ user.FirstName }}</td>
        <td>{{ user.Email }}</td>
        <td>{{ user.Number }}</td>
        <td>{{ user.BDate }}</td>
        <td>{{ user.SignInDate }}</td>
        <td>{{ user.Status ? user.Status : 'Active' }}</td>
        <td><button @click="openEditModal(user)">Modifier</button></td>
        <td><button @click="toggleBanStatus(user)">
             {{ user.Status === 'Banned' ? 'Débannir' : 'Bannir' }}
            </button></td>
        <td><button @click="deleteUser(user)">Supprimer</button></td>
      </tr>
    </tbody>
  </table>
    </div>
    <div v-if="openPopUp" class="popup-container">
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
//import ClientListAction from "ACList.vue";

export default {
    data(){
        return{
        searchTerms: '',
        searchResult: [],
        editMode: false,
        openPopUp: false, 
        editingUser: {},
        }
    },
    methods: {
        async search(){
            try {
                if (this.searchTerms.trim() === '') {
                    this.editMode = false;
                    this.searchResults = [];
                    return;
                }
                const response = await Axios.get(`https://localhost:7115/v1/api/User/Search/${this.searchTerms}`);
                console.log(response);

                this.editMode = true;
                this.searchResult = response.data;
            } catch(error){
          console.error('Failed to fetch admin users', error);
            }
        },
        openEditModal(user) {
        this.editingUser = { ...user };
        this.openPopUp= true;
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

            
            
        } catch(error){
          console.error('Failed to fetch admin users', error);
        }
    },
    cancelEdit() {
        this.openPopUp = false;
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

      user.Status = newStatus.Status;
      const updatedIndex = this.searchResult.findIndex(u => u.Email === user.Email);
    if (updatedIndex !== -1) {
      this.$set(this.searchResult, updatedIndex, response.data);
    }
      
    } catch (error) {
      console.error('Failed to update user status', error);
    }
  },
      async deleteUser(user) {
        try {
            const response = await Axios.delete(`https://localhost:7115/v1/api/User/${user.Email}`)
            console.log('User updated successfully', response.data);
            
             this.searchResult = this.searchResult.filter(u => u.Email !== user.Email);
        } catch(error){
          console.error('Failed to fetch admin users', error);
        }
      },
    },

    

}

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

  .Search {
    display: flex;
    max-width: 100%;
    height: 2vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }

  .Result {
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