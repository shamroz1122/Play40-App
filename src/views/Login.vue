<template>
<div id="inspire" >
  <v-app>      
<v-toolbar class="white" dark fixed flat>
  <v-btn outline fab color="white" class="mt-2" v-on:click="cut">
    <i class="material-icons pl-1" style="color:#7ac843;">
    arrow_back
    </i>
  </v-btn>
</v-toolbar>
    <v-container fluid fill-height class="ma-0 pa-0">
        <v-layout row wrap justify-center align-center>
              <v-flex xs12 lg12 sm12 md12>
                <v-responsive>
              <v-img
                :src="require('../assets/logo_cropped.png')"
                contain
                height="120"
                class="mt-5"
                ></v-img>
                </v-responsive>
            </v-flex>

            <v-flex xs10 lg4 sm6 md6>
              <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="login"
                  >
                  <v-flex xs12 sm12 md12 lg12>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Username or Email"
                        outline
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                    <v-text-field
                        v-model="password"
                        :rules="passRules"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        label="Password"
                        outline
                    ></v-text-field>
                    </v-flex>  
                    <v-flex xs12 sm12 md12 lg12>
                      
                        <v-btn class="button"
                        v-show="log"
                        type="submit"
                        outline color="indigo">Login</v-btn>
                        
                    </v-flex>
                    <v-layout row wrap justify-center text-xs-center>
                  <v-flex xs12 sm12 md12>
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      v-show = "loader"
                    ></v-progress-circular>
                  </v-flex>
                </v-layout>
              </v-form>
              </v-flex>
        </v-layout>
          <v-snackbar
              v-model="snackbar"
              :multi-line="mode === 'multi-line'"
              :timeout="timeout"
              :color="color"
              :right="x === 'right'"
            >
              {{ text }}
              <v-btn
                color="white"
                flat
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
      </v-container>
    </v-app> 
</div>
</template>
<script>
export default {
data(){
return{
  log:true,
  show1: false,
  loader:false,
  snackbar: false,
  x: null,
  mode: '',
  timeout: 6000,
  color:'red',
  text: 'Error! Invalid Email',
  email:'',
  password:'',
  valid:true,
  passRules: [
    v => !!v || 'Password is required',
    v => (v && v.length <= 15) || 'Password must be less than 10 characters'
  ],
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid'
  ],
}
},
methods: {
login(){
  if (
        this.$refs.form.validate()) {
        this.loader = true
        this.log = false
        this.$store.dispatch('authenticate', {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          this.log = true
          this.loader = false
          this.$router.push({ name: 'lists', params: { userId: response.data.user.id } })
        })
          .catch(error => {
          this.log = true
          this.loader = false   
          this.snackbar = true
        
        }) 
        }
},
  cut(){
    this.$router.go(-1)
  },
}   

}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.button{
width: 100%;
height: 55px;
margin-left:-1%;
font-size:17px;
text-transform:none;
font-family: 'Open Sans', sans- serif !important;
}
#inspire{
background: none;
}
</style>