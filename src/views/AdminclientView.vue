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
          <div v-for="(user, index) in userList" :key="index" class="user-card">
            <h3>{{ user.username }}</h3>
            <p>Email: {{ user.email }}</p>
            <p>First Day of Registration: {{ user.registrationDate }}</p>
            <p>Last Connection: {{ user.lastConnection }}</p>
          </div>
        </div>
  
        <div v-if="currentTab === 'profile'">
          <h2 class="tab-title">Admin Profile</h2>
          <div class="admin-info">
            <h3>Admin Information:</h3>
            <p>Username: {{ adminInfo.username }}</p>
            <p>Email: {{ adminInfo.email }}</p>
            <p>Phone: {{ adminInfo.number }}</p>
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
      userList: [
        { username: 'User1', email: 'user1@example.com', registrationDate: '2022-01-01', lastConnection: '2022-01-07' },
        { username: 'User2', email: 'user2@example.com', registrationDate: '2022-01-02', lastConnection: '2022-01-06' },
      ],
      adminInfo: {
        username: 'Admin1',
        email: 'admin@example.com',
        number: '123456789',
      },
      showChangeInfoPopup: false,
      name: '',
      lastName: '',
      email: '',
      number: '',
    };
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
  },
};
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