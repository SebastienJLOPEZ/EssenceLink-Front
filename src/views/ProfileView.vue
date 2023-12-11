<script>
    import Axios from 'axios';
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import {getAuth, onAuthStateChanged} from 'firebase/auth';

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

            }
        },
        methods: {
            currentUser(){
                let v = this;
                const auth = getAuth(firebase);

                onAuthStateChanged(auth, (user) => {
                    if (user){ 
                        v.email = user.email;
                        v.fetchUserData()
                    }
                });
            },
            fetchUserData (){
                let v = this;
                v.errorMessage = "";
                
                    Axios.get(`https://localhost:7115/v1/api/User/${v.email}`)
                .then(response => {
                    v.errorMessage = "Connected";
                    v.name = response.data.FirstName;
                    v.lastName = response.data.LastName;
                    v.address = response.data.Address === "" ? "Not Registered" : response.data.Address;
                    v.number = response.data.Number === 0 ? "Not Registered" : response.data.Number;
                    v.bdate = response.data.BDate === "" ? "Not Registered" : response.data.BDate;
                    v.signindate = response.data.SignInDate === "" ? "Not Registered" : response.data.SignInDate;
                })
                .catch(error => {
                    v.errorMessage = "Not connected";
                    console.error('Failed to connect to databank', error);
                });
            }
        },
        mounted() {
                this.currentUser();
            }
    }
</script>

<!--TODO:
Finish the template
Add style-->
<template>
<div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    <div>
        <h1>User Information :</h1>
    </div>
    <div>
        Name : {{ name }} {{ lastName }}
    </div>
    <div>
        Address : {{ address }}
    </div>
    <div>
        Number : {{ number }}
    </div>
    <div>
        <h1>Recent Command :</h1>
    </div>
    <div>
        <h1>Wishlist :</h1>
    </div>
</template>