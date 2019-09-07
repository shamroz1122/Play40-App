<template>
<div id="inspire"> 
<v-app>
    <v-toolbar class="primary" dark fixed>
    <span class="subheading font-weight-thin" style=" font-family: 'Open Sans', sans- serif !important;">Goals</span>
        <v-layout row wrap justify-center>
        <v-flex xs2>
            <v-spacer></v-spacer>  
            </v-flex>
            </v-layout>
            <v-btn icon v-on:click="cut">
            <i class="material-icons">
                    highlight_off
                    </i>
            </v-btn>
            </v-toolbar>
        <v-container fluid class="pa-0 mt-3">
            <v-layout row wrap class="mt-4">
                <v-flex xs12>
                    <template>
                    <v-tabs
                    v-model="tab"
                    color="primary"
                    centered
                    style="margin-top:9px"
                    >
                    <v-tabs-slider color="white"></v-tabs-slider> 
                    <v-tab class="caption"  style="color:white; font-family: 'Open Sans', sans- serif !important;">
                        LONG TERM
                    </v-tab>
                    <v-tab class="caption"  style="color:white; font-family: 'Open Sans', sans- serif !important;">
                    SHORT TERM                 
                    </v-tab>                   
                    </v-tabs>
                </template>
        <v-tabs-items v-model="tab">
                <v-tab-item>
                <v-flex xs12 sm12 md12 lg12>
                    <p class="pl-3 pt-2"><b> THERE ARE TOTAL LONG GOALS</b></p>
                    <hr>
                </v-flex>
                <div v-if="longTerm.length>0" style="width:100%">
                <v-flex xs12 sm12 md12 lg12 v-for="(lgoal,index) in longTerm" :key="index">
                    <v-list-tile style="height:70px;" >
                        <v-list-tile-avatar class="mt-3" color="grey">
                            <v-icon medium dark>
                            my_location
                            </v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content class="mt-3">
                            <v-list-tile-title >{{ lgoal.goal }}</v-list-tile-title>
                            
                        </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider> 
                </v-flex>
                </div>
                <div v-else style="width:100%">
                    <v-layout row wrap justify-center align-center>
                        <v-flex xs12 lg12 sm12 md12 style="text-align: center;" class="mt-3">
                            <span class="font">Enter New Long Term Goals</span>
                        </v-flex>
                    </v-layout>
                </div>
            </v-tab-item>

            <v-tab-item>
                <v-flex xs12 sm12 md12 lg12>
                    <p class="pl-3 pt-2"><b> THERE ARE TOTAL SHORT GOALS</b></p>
                    <hr>
                </v-flex>
                <div v-if="shortTerm.length>0" style="width:100%">
                <v-flex xs12 sm12 md12 lg12 v-for="(sgoal,index) in shortTerm" :key="index">
                    <v-list-tile style="height:65px;" >
                        <v-list-tile-avatar class="mt-3" color="grey">
                            <v-icon medium dark>
                            my_location
                            </v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content class="mt-3">
                            <v-list-tile-title >{{ sgoal.goal }}</v-list-tile-title>
                            
                        </v-list-tile-content>

                    </v-list-tile>
                <v-divider inset></v-divider> 
                </v-flex>
                </div>
                <div v-else style="width:100%">
                    <v-layout row wrap justify-center align-center>
                        <v-flex xs12 lg12 sm12 md12 style="text-align: center;" class="mt-3">
                            <span class="font">Enter New Long Term Goals</span>
                        </v-flex>
                    </v-layout>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </v-flex>
</v-layout> 
</v-container>
</v-app>
</div>
</template>

<script>

export default {

data () {
return {
tab:null,  
row: null,
dialog2: false, 
dialog3: false,
longTerm:[],
shortTerm:[]
}
},
methods: {

cut(){
this.$router.go(-1)
},
},

mounted(){

this.$store.dispatch('getGoals',{
        user_id: this.$store.getters.loggedInUserId,
    })
    .then(response => {

    if(response.data.status!=undefined && response.data.status=='Token is Expired')
    {
            this.$router.push({ name: 'login', params: { } })
    }else{

            this.longTerm =  response.data.longterm
            this.shortTerm =  response.data.shortterm
        }
    })
    .catch(error=>{
    error.response
    }) 
}

}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.font{
font-size: 16px;
font-family: 'Open Sans', sans- serif !important;
letter-spacing: 1px;
}
p{
font-family: 'Open Sans', sans- serif !important;
}
.bttn{
font-family: 'Open Sans', sans- serif !important;
height: 22px;
text-transform:none;
}

</style>
