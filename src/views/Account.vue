<template>
  <div id="inspire" >
    <v-app>
      <v-container fluid fill-height>
          <v-layout row wrap justify-center align-center>
                <v-flex xs12 lg12 sm12 md12>
                <v-img
                  :src="require('../assets/logo_cropped.png')"
                  class="my-2"
                  contain
                  height="120"
                  style="top:55px"></v-img>
              </v-flex>         
                <v-flex xs11 lg4 sm6 md6 style="margin-top: -16%;">
                    <div>
                      <router-link :to="{name:'signup'}" style="text-decoration:none;">
                      <v-btn class="buttons" 
                          outline color="primary">Sign Up</v-btn>
                        </router-link>   
                    </div>    
                    <div>
                    <router-link :to="{name:'login'}" style="text-decoration:none;">
                      <v-btn outline class="buttons"
                          color="indigo">Log In</v-btn>
                    </router-link>
                    </div>
                </v-flex>
              </v-layout>      
            </v-container>
          </v-app>  
        </div>
    </template>

<script>
export default {
  
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.buttons{
width: 95%;
height: 55px;
font-size:17px;
text-transform: none;
font-family: 'Open Sans', sans- serif !important;
}
#inspire{
background: none;
}

</style>