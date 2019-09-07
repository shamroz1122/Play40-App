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
                  height="110"
                  class="mt-5"
                  ></v-img>
                  </v-responsive>
              </v-flex>
              <v-flex xs10 lg4 sm6 md6>
                  <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                      @submit.prevent="register"
                    >
                    <v-flex xs12 sm12 md12 lg12>
                      <v-text-field
                          v-model="name"
                          :rules="nameRules"
                          label="Name"
                          outline
                          required
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                      <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          type="email"
                          label="Email"
                          outline
                          required
                      ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm12 md12>
                      <v-text-field
                          v-model="password"
                          :rules="passRules"
                          :append-icon="show1 ? 'visibility' : 'visibility_off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          label="Password"
                          outline
                          required
                      ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm12 md12>
                      <v-text-field
                          v-model="confirm_password"
                          :rules="confirmpassRules"
                          :append-icon="show2 ? 'visibility' : 'visibility_off'"
                          :type="show2 ? 'text' : 'password'"
                          @click:append="show2 = !show2"
                          label="Confirm Password"
                          outline
                          required
                      ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm12 md12>
                            <v-btn class="button"
                            v-show="subm"
                            type="submit"
                            outline color="primary"
                            
                            >Sign Up</v-btn>
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
    subm:true,
    show1: false,
    show2:false,
    snackbar: false,
    x: null,
    mode: '',
    timeout: 6000,
    color:'red',
    text: 'Error! Invalid Requirement',
    loader:false,
    name:'',
    email:'',
    password:'',
    confirm_password:'',
    valid:true,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name must be less than 10 characters'
    ],
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 15) || 'Password must be less than 15 characters'
    ],
    confirmpassRules: [
      v => !!v || 'Confirm Password is required',
      v => (v && v.length <= 15) || 'Confirm Password must be less than 15 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
  }
},
methods: {

    cut(){
      this.$router.go(-1)
    },

    register(){
      if (
          this.$refs.form.validate()) {
          this.subm = false
          this.loader = true

          this.$store.dispatch('signup', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirm_password,
          })
          .then(response => {
            this.loader = false
            
            this.text = 'Congrats!Submitted Successfully'
            this.color = 'green'
              this.snackbar = true

            setTimeout(()=>{
            this.$router.push({ name: 'lists', params: { userId: response.data.user.id } })
            },1000);
          })
        .catch(error => {
            
            this.subm = true
            this.loader = false
            var data = error.data
            //console.log(data)
            var content = ''
            Object.keys(data).forEach(function (item) {
                  content =  data[item][0]
                // console.log(data[item][0])
            });
            this.text = content
            this.color = 'red'          
            this.snackbar = true   
        })
      }
    }
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