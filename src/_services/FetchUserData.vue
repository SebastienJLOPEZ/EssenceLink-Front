<script>
    import Axios from 'axios';

export default{
    data(){
            return {
                name: "",
                lastName: "",
                email: "",
                address : "",
                number : "",
                bdate : "",
                signindate : "",
                id:"",
                errorMessage:"",
            }
        },
        methods:  {
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
        }
    

            
}


</script>