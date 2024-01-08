<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <div class="profile">
        <div class="menu"> <!--TODO : Put Menu in called file-->
            <div @click="changeTab('orders')" :class="{ active: currentTab === 'orders' }">ORDERS</div>
            <div @click="changeTab('addresses')" :class="{ active: currentTab === 'addresses' }">ADDRESSES</div>
            <div @click="changeTab('wishlists')" :class="{ active: currentTab === 'wishlists' }">WISHLISTS</div>
            <div @click="changeTab('accountSettings')" :class="{ active: currentTab === 'accountSettings' }">ACCOUNT SETTINGS</div>
            <div @click="changeTab('logout')" class="logout-button" :class="{ active: currentTab === 'logout' }">LOGOUT</div>
        </div>
  
        <div class="content">
            <div v-if="currentTab === 'orders'">
            <h2 class="tab-title">Orders</h2>
            <p>You haven't placed any orders yet.</p>
        </div>
  
        <div v-if="currentTab === 'addresses'">
            <h2 class="tab-title">Addresses</h2>
            <!--div v-for="(address, index) in addresses" :key="index" class="address-card"></div-->
                <h3>{{ name }} {{ lastName }}</h3>
                <p>Email : {{ email.substring(0, 5) }}***{{ email.includes('@') ? '...' + email.split('@')[1] : '' }}</p>
                <p>{{ address }}<!--, {{ address.city }}, {{ address.region }}, {{ address.province }}, {{ address.zipCode }}--></p>
                <p>Phone: {{ number}}</p>
                <p>Birthday : {{ bdate }}</p>
          
                <!--<button @click="showAddAddressForm" class="add-address-button">Add a new address</button>
                <div v-if="showAddAddress" class="add-address-form-container">
                <h3>Add a new address</h3>
                <form @submit.prevent="addNewAddress">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name:</label>
                  <input v-model="newAddress.firstName" required>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name:</label>
                  <input v-model="newAddress.lastName" required>
                </div>
              </div>
              <div class="form-group">
                <label for="address1">Address 1:</label>
                <input v-model="newAddress.address1" required>
              </div>
              <div class="form-group">
                <label for="address2">Address 2:</label>
                <input v-model="newAddress.address2">
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input v-model="newAddress.city" required>
              </div>
              <div class="form-group">
                <label for="region">Region:</label>
                <input v-model="newAddress.region" required>
              </div>
              <div class="form-group">
                <label for="province">Province:</label>
                <input v-model="newAddress.province" required>
              </div>
              <div class="form-group">
                <label for="zipCode">Postal/ZIP Code:</label>
                <input v-model="newAddress.zipCode" required>
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input v-model="newAddress.phone" required>
              </div>
              <button type="submit">Add Address</button>
                </form>
                </div>-->
        </div>

        <div v-if="currentTab === 'wishlists'">
            <h2 class="tab-title">Wishlists</h2>
        </div>
  
        <div v-if="currentTab === 'accountSettings'">
          <h2 class="tab-title">Account Settings</h2>
        </div>

      </div>

    </div>
  </template>
  
  <script>
    import Axios from 'axios';
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

    export default{
        name: "ProfileView",
        data(){
            return {
                currentTab: 'orders',
                name: "",
                lastName: "",
                email: "",
                address : "",
                number : "",
                bdate : "",
                signindate : "",
                errorMessage:"",
                wishlist: [],
            }
        },
        methods: {
            changeTab(tab) {
                if (tab === 'logout') {
                    this.logout();
                } else {
                    this.currentTab = tab;
                }
            },
            currentUser(){
                let v = this;
                const auth = getAuth(firebase);

                onAuthStateChanged(auth, (user) => {
                    if (user){ 
                        v.email = user.email;
                        v.fetchUserData(v.email);
                        v.fetchUserWishlist(v.email);
                        v.fetchUserCommand(v.email);
                    }
                });
            },
            fetchUserData (email){
                let v = this;
                v.errorMessage = "";
                
                Axios.get(`https://localhost:7115/v1/api/User/${email}`)
                .then(response => {
                    v.id = response.data.Id;
                    v.name = response.data.FirstName;
                    v.lastName = response.data.LastName;
                    v.address = response.data.Address === "" ? "Not Registered" : response.data.Address;
                    v.number = response.data.Number === 0 ? "Not Registered" : response.data.Number;
                    v.bdate = response.data.BDate === "" ? "Not Registered" : response.data.BDate;
                    v.signindate = response.data.SignInDate === "" ? "Not Registered" : response.data.SignInDate;
                })
                .catch(error => {
                    v.errorMessage = "Not Connected";
                    console.error('Failed to connect to databank', error);
                });
            },
            async fetchUserWishlist(uid){
              let v=this;
              v.errorMessage="";
              try  {
                const response = await Axios.get(`https://localhost:7115/v1/api/Wishlist/User/${uid}`)
                this.wishlist = response.data;
              } catch(error){
                console.error('Failed to connect to databank', error);
              }
            },
            async fetchUserCommand(uid){
              let v=this;
              v.errorMessage="";
              try  {
                const response = await Axios.get(`https://localhost:7115/v1/api/Command/User/${uid}`)
                this.wishlist = response.data;
              } catch(error){
                console.error('Failed to connect to databank', error);
              }
            },
            logout() {
                const auth = getAuth(firebase);
                signOut(auth)
                .then (() => {
                    this.$nextTick(() => {
                        this.$router.push('/');
                    });
                })
                .catch(error =>{
                    console.log('logout error: ', error.message);
                })
            }
        },
        mounted() {
                this.currentUser();
        },
        
    } 
</script>
<!--,
      showAddAddressForm() {
        this.showAddAddress = true;
      },
      addNewAddress() {
        if (this.newAddress.firstName && this.newAddress.lastName && this.newAddress.address1 && this.newAddress.city && this.newAddress.region && this.newAddress.province && this.newAddress.zipCode && this.newAddress.phone) {
          this.addresses.push({ ...this.newAddress });
          this.newAddress = {
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            region: '',
            province: '',
            zipCode: '',
            phone: '',
          };
          this.showAddAddress = false;
        }
      },
     
    },
  };
  </script>-->
  
  <style scoped>
  * {
    box-sizing: border-box;
  }

  /*.test{
    display: flex;
    max-width: 100%;
    height: 2vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }*/
  
  .profile {
    display: flex;
    max-width: 100%;
    height: 290vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 130px;
    margin-bottom: 1px;
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
    font-size: 40px;
    font-weight: 100;
  }
  
  .tab-title:after {
    content: "";
    display: block;
    width: 50px;
    height: 2px;
    background-color: #333;
    margin: 10px auto;
  }
  
  .address-card {
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
  }
  
  .add-address-form-container {
    background-color:#f0f0f0;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .add-address-form h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .add-address-form form {
    display: flex;
    flex-direction: column;
  }
  
  .add-address-form label {
    margin-top: 10px;
    font-size: 16px;
  }
  
  .add-address-form input {
    margin: 5px 0;
    padding: 12px; 
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .add-address-button {
    margin-top: 20px;
    background-color: #095328;
    color: #ffffff;
    font-size: 16px;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
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
  
