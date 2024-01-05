<template>
    <div class = Profile>
        CECI EST UNE PAGE TEST POUR LES ADMINS
        <br>
        Name : {{ name }} {{ lastName }}
        <br>
        Email : {{ email.substring(0, 5) }}***{{ email.includes('@') ? '...' + email.split('@')[1] : '' }}
        <br>
        Phone: {{ number}}
    </div>
    <div class = Alert>
        Alert : 

    </div>
    <div class = NonPermanent>
        <router-link class="nav-link" to="/ACList">Client</router-link>
        <!--router-link class="nav-link" to="/ACResearch">Research</router-link-->
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
            name: "",
            lastName: "",
            email: "",
            address : "",
            number : "",
            bdate : "",
            signindate : "",
            errorMessage:"",
        }
    },
    methods: {
        currentUser(){
                let v = this;
                const auth = getAuth(firebase);

                onAuthStateChanged(auth, (user) => {
                    if (user){ 
                        v.email = user.email;
                        v.fetchUserData(v.email)
                    }
                });
            },
            fetchUserData (email){
                let v = this;
                v.errorMessage = "";
                
                Axios.get(`https://localhost:7115/v1/api/User/${email}`)
                .then(response => {
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
    mounted(){
        this.currentUser();
    }
}
</script>
<style scoped>
* {
    box-sizing: border-box;
  }

  .Profile{
    display: flex;
    max-width: 100%;
    /*height: 2vh;*/
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }

  .Alert {
    display: flex;
    max-width: 100%;
    height: 2vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }
</style>