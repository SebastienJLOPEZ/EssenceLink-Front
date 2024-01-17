<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="profile">
    <div class="menu"> <!--TODO : Put Menu in called file-->
      <div @click="changeTab('account')" :class="{ active: currentTab === 'accountSettings' }">INFORMATION</div>
      <div @click="changeTab('orders')" :class="{ active: currentTab === 'orders' }">COMMANDES</div>
      <div @click="changeTab('addresses')" :class="{ active: currentTab === 'addresses' }">ADDRESSES</div>
      <div @click="changeTab('wishlists')" :class="{ active: currentTab === 'wishlists' }">LISTE DES SOUHAITS</div>
      <div @click="changeTab('logout')" class="logout-button" :class="{ active: currentTab === 'logout' }">DÉCONNEXION
      </div>
    </div>

    <div class="content">
      <div v-if="currentTab === 'orders'">
        <h2 class="tab-title">Orders</h2>
        <div v-for="command in commands" :key="command.Id">
          Numéro de commande : {{ command.Id }}<br>
          Prix Total : {{ command.TotalPrice }} <br>
          Addresses de livraison : {{ shippinAddress === "" ? command.Address : shippinAddress }} <br>
          Moyen de Paiement : {{ command.Paiement_Type }} <br>
          Date : {{ command.Date }}
          <!--Will need to make sure the Date is in dd/mm/yyyy format when showing it to the user-->
        </div>
        <div v-if="commands.length === 0">
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>

      <div v-if="currentTab === 'addresses'">
        <h2 class="tab-title">Adresses</h2>
        <div v-for="address in addresses" :key="address.Id">
          Numéro et Rue : {{ address.NumberName }}<br>
          Ville : {{ address.PostalCode }} {{ address.City }} <br>
          <button class="delete-button" @click="deleteAddress(address.Id)">Supprimer</button>
        </div>
        <button @click="showAddressForm()" class="add-address-button">Ajouter une nouvelle adresse</button>
        <div v-if="showAddress" class="add-address-form-container">
          <h3>Ajouter une nouvelle Adresse</h3>
          <form @submit.prevent="addNewAddress">
            <!--@submit.prevent="addNewAddress"-->
            <div class="form-group">
              <label for="NName"> Adresse :</label>
              <input v-model="newAddressData.NumberName" required>
            </div>
            <div class="form-group">
              <label for="PCode">Code Postal :</label>
              <input v-model="newAddressData.PostalCode" required>
            </div>
            <div class="form-group">
              <label for="City">Ville :</label>
              <input v-model="newAddressData.City" required>
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
        <!--div v-for="(address, index) in addresses" :key="index" class="address-card"></div-->



      </div>

      <div v-if="currentTab === 'wishlists'">
        <h2 class="tab-title">Wishlists</h2>
        <div v-for="wish in wishlistProduct" :key="wish.Id">
          Nom : {{ wish.product.Name }}<br>
          Price : {{ wish.product.Price }}<br>
          <router-link :to="{ name: 'Product', query: { pid: wish.product.Id } }" class="buy-wish-button">Acheter</router-link>
          <button class="delete-button" @click="deleteWish(wish.wid)">Supprimer</button>
        </div>
      </div>

      <div v-if="currentTab === 'account'">
        <h2 class="tab-title">Information du Compte</h2>
        <h3>{{ name }} {{ lastName }}</h3>
        <p>Email : {{ email.substring(0, 5) }}***{{ email.includes('@') ? '...' + email.split('@')[1] : '' }}</p>
        <p>{{ address }}<!--, {{ address.city }}, {{ address.region }}, {{ address.province }}, {{ address.zipCode }}-->
        </p>
        <p>Phone: {{ number }}</p>
        <p>Birthday : {{ bdate }}</p>
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
  name: "ProfileView",
  data() {
    return {
      currentTab: 'account',
      name: "",
      lastName: "",
      email: "",
      address: [],
      number: "",
      bdate: "",
      signindate: "",
      errorMessage: "",
      wishlistProduct: [],
      commands: [],
      shippinAddress: "",
      showAddress: false,
      newAddressData: {
        UserId: "",
        NumberName: "",
        PostalCode: "",
        City: "",
      }
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
      v.errorMessage = "";

      Axios.get(`https://localhost:7115/v1/api/User/${email}`)
        .then(response => {
          v.newAddressData.UserId = response.data.Id;
          v.id = response.data.Id;
          v.name = response.data.FirstName;
          v.lastName = response.data.LastName;
          v.address = response.data.Address === "" ? "Not Registered" : response.data.Address;
          v.number = response.data.Number === 0 ? "Not Registered" : response.data.Number;
          v.bdate = response.data.BDate === "" ? "Not Registered" : response.data.BDate;
          v.signindate = response.data.SignInDate === "" ? "Not Registered" : response.data.SignInDate;
          v.fetchUserWishlist(v.id);
          v.fetchUserCommand(v.id);
          v.fetchUserAddresses(v.id);
        })
        .catch(error => {
          v.errorMessage = "Not Connected";
          console.error('Failed to connect to databank', error);
        });
    },
    async fetchUserWishlist(uid) {
      try {
        const response = await Axios.get(`https://localhost:7115/v1/api/Wishlist/ByUser/${uid}`)
        const wishlist = response.data;
        for (const wish of wishlist) {
          const wresponse = await Axios.get(`https://localhost:7115/v1/api/Product/${wish.ProductId}`)
          this.wishlistProduct.push({
            product: wresponse.data,
            wid: wish.Id
          })
          console.log(this.wishlistProduct)
        }
      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    },
    async fetchUserCommand(uid) {
      let v = this;
      v.errorMessage = "";
      try {
        const response = await Axios.get(`https://localhost:7115/v1/api/Command/ByUser/${uid}`)
        this.commands = response.data;
        for (const command of this.commands) {
          console.log(command)
          if (!command.Shipping_Address.includes('|')) {
            console.log("test");
            const sresponse = await Axios.get(`https://localhost:7115/v1/api/Adresses/adress/${command.Shipping_Address}`)
            console.log(sresponse);
            this.shippinAddress = sresponse.data.NumberName + " | " + sresponse.data.PostalCode + " | " + sresponse.data.City
            console.log(this.shippinAddress);
          }
        }

      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    },
    async fetchUserAddresses(uid) {
      let v = this;
      v.errorMessage = "";
      try {
        const response = await Axios.get(`https://localhost:7115/v1/api/Adresses/ByUser/${uid}`)
        this.addresses = response.data;
      } catch (error) {
        console.error('Failed to connect to databank', error);
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
        .catch(error => {
          console.log('logout error: ', error.message);
        })
    },
    showAddressForm() {
      this.showAddress = !this.showAddress;
    },
    async addNewAddress() {
      try {
        const response = await Axios.post('https://localhost:7115/v1/api/Adresses', this.newAddressData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log(response);
        this.address = [];
        await this.fetchUserAddressess(this.id);
      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    },
    async deleteAddress(aid) {
      try {
        const response = await Axios.delete(`https://localhost:7115/v1/api/Adresses/${aid}`)
        console.log(response)
        this.address = [];
        await this.fetchUserAddressess(this.id);
      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    },
    async deleteWish(pid) {
      try {
        const response = await Axios.delete(`https://localhost:7115/v1/api/Wishlist/${pid}`)
        console.log(response)
        this.wishlist = [];
        this.wishlistProduct = [];
        await this.fetchUserWishlist(this.id);
      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    }
  },
  mounted() {
    this.currentUser();
  },

} 
</script>
  
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
  background-color: #f0f0f0;
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

.delete-button {
  margin-top: 10px;
  background-color: #ff0000;
  color: #ffffff;
  font-size: 12px;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.buy-wish-button {
  margin-top: 10px;
  background-color: #97c992;
  color: #ffffff;
  font-size: 12px;
  border: none;
  padding: 5px 10px;
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
  
