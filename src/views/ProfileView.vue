<script>
    import Axios from './_services/APICaller.service';
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
        method: {
            currentUser(){
                let v = this;
                const auth = getAuth(firebase);

                onAuthStateChanged(auth, (user) => {
                    if (user){ 
                        v.email = user.email;
                        v.fetchUserData
                    }
                });

            },
            fetchUserData() {
                Axios.get(`/v1/api/User/${this.email}`)
                .then(response => {
                    this.name = response.data.name;
                    this.lastName = response.data.lastName;
                    this.address = response.data.address;
                    this.number = response.data.number;
                    this.bdate = response.data.bdate;
                    this.signindate = response.data.signindate;
                })
                .catch(error => {
                    console.error('Failed to connect to databank', error);
                });
            }
        }
    }
</script>

<!--TODO:
Finish the template
Add style-->
<template>
    <div>
        <h1>Profile</h1>
    </div>
    <div>

    </div>
</template>