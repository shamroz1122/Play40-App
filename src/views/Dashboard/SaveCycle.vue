<template>
<div id="inspire"> 
<v-app>
    <v-toolbar class="primary" dark fixed >   
        <v-layout row wrap>
            <v-flex xs2 md2 sm2 lg2>
                 <i class="material-icons " style="color:white;" v-on:click="cut">
                        arrow_back
                    </i>   
            </v-flex>
                <v-flex xs8 sm9 md9 lg9 class="text-xs-center">
                    <span class="font">Saved Cycles</span>
                </v-flex>
        </v-layout>
    </v-toolbar> 
        <v-container fluid class="pa-0 mt-3">
            <v-layout row wrap class="mt-5">
                <v-flex xs12 sm12 md12 lg12>
                    <p class="pl-3 pt-2"><b> THESE ARE YOUR TOTAL CYCLES</b></p>
                    <hr>
                </v-flex>
                <div v-if="cycles.length>0" style="width:100%">
                    <div v-for="(cycle,index) in cycles" :key="index">
                    <v-layout row wrap v-if="crdate > cycle.enddate">        
                    <v-list-tile style="height:85px;">
                        <!-- <v-flex xs2> -->
                            <v-list-tile-avatar class="mt-5" color="grey">
                                <v-icon medium dark>
                                autorenew
                                </v-icon>
                            </v-list-tile-avatar>
                        <v-list-tile-content class="mt-5">
                            <router-link :to="{name:'viewcycle', params: {cycleId:cycle.id}}" style="text-decoration:none;">
                                <v-list-tile-title class="subheading font-weight-bold">{{ cycle.cyclename}} </v-list-tile-title>
                            </router-link>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-action class="mt-5 ml-5">
                            <v-layout row wrap>
                                <v-icon style="padding-left: 80px !important;" medium v-on:click="hidecycle(cycle.id)">archive</v-icon>
                                <v-icon class="pl-2" medium v-on:click="dele(cycle.id)">delete_outline</v-icon>
                            </v-layout>
                    </v-list-tile-action>
                </v-list-tile> 
        <v-divider inset style="margin-left:-200px;"></v-divider>  
                    </v-layout>
                </div>
            </div>
        <div v-else style="width:100%">
            <v-layout row wrap justify-center align-center>
                <v-flex xs12 lg12 sm12 md12 style="text-align: center;" class="mt-3">
                    <span class="font">Save Cycles Here</span>
                </v-flex>
            </v-layout>
        </div>
    </v-layout>
    <v-layout row justify-center>
                            <v-dialog
                            v-model="dialog"
                            max-width="290">
                            <v-card>
                                <v-card-title class="headline">Alert!</v-card-title>
                                    <v-card-text>
                                    Are you sure to delete cycle? This will delete your cycle all data.
                                    </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="green darken-1"
                                    flat="flat"
                                    @click="dialog = false">
                                    Disagree
                                </v-btn>
                                <v-btn
                                    color="green darken-1"
                                    flat="flat"
                                    v-on:click="del()" >
                                    Agree
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-layout>
                </v-container>
            </v-app>
        </div>
    </template>
<script>
import moment from 'moment'

export default {

data () {
return {
    btn1:false,
    btn2:true,
    dialog:false,
    cycleId:'',
    cyid:'',
    mode: '',
    row: null,
    cycles:[],
    crdate: moment().format('YYYY-MM-DD'),
    }
},

mounted(){
 this.$store.dispatch('getSaved',{
        user_id: this.$store.getters.loggedInUserId,
    })
    .then(response => {
    if(response.data.status!=undefined && response.data.status=='Token is Expired')
    {
            this.$router.push({ name: 'login', params: { } })
    }else{
            this.cycles =  response.data.savedcycle
        }
    })
        .catch(error=>{
        error.response
    })
},

methods:{
   cut(){
        this.$router.go(-1)
    },
    dele(val){
       
        this.cyid = val
        this.dialog = true
    },
    del(){
        this.dialog = false
        this.$store.dispatch('deleteCycle',{
        user_id: this.$store.getters.loggedInUserId,
        my_cycle: this.cyid,                  
    })
    .then(response => {
        response.data
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
        this.$router.push({ name: 'login', params: { } })
        }else{              
            this.$router.push({ name: 'cycle', params: { } })
        }
    })
    .catch(error=>{
        error.response
    }) 
},
    hidecycle(id){
        this.archivecycle = '1'
        this.$store.dispatch('update_archive',{
                user_id: this.$store.getters.loggedInUserId,
                my_cycle: id,
                archivecycle: this.archivecycle         
            })
            .then(response => {
                response.data
               
                if(response.data.status!=undefined && response.data.status=='Token is Expired')
                {
                  this.$router.push({ name: 'login', params: { } })
                }else{            
                  this.$router.push({ name: '', params: { } })
                }
            })
            .catch(error=>{
                error.response
                
            })
    } 
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
font-size: 12px;
font-family: 'Open Sans', sans- serif !important;
height: 18px;
text-transform:none;
}

</style>
