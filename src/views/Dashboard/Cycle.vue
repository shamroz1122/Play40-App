<template>
<div id="inspire"> 
<v-app>
<v-toolbar class="primary" dark fixed >   
    <v-layout row wrap>
        <v-flex xs4 md2 sm2 lg2></v-flex>
            <v-flex xs6 sm9 md9 lg9 class="text-xs-center">
                <span class="font">Cycle</span>
            </v-flex>
        </v-layout>
    <v-flex xs2 md1 sm1 lg1>
        <router-link :to="{name:'addcycle'}" style="text-decoration:none;">
            <v-btn fab dark color="white" class="mt-5" style="height: 45px;width: 45px;">
                <v-icon color="primary" dark>add</v-icon>
            </v-btn>
        </router-link>
    </v-flex>
</v-toolbar> 
    <v-container fluid class="pa-0 mt-3">
        <v-layout row wrap class="mt-5">
            <v-flex xs12 sm12 md12 lg12>
                <p class="pl-3 pt-2"><b> THESE ARE YOUR TOTAL CYCLES</b></p>
                <hr>
            </v-flex>
            <div v-if="cycles.length>0" style="width:100%">
                <div v-for="(cycle,index) in cycles" :key="index">
                <v-layout row wrap v-if="cycle.enddate > crdate">      
                <v-list-tile style="height:85px;">
                    <v-flex xs2>
                        <v-list-tile-avatar class="mt-5" color="grey">
                            <v-icon medium dark>
                            autorenew
                            </v-icon>
                        </v-list-tile-avatar>
                        </v-flex>
                <v-flex xs10>
                    <v-list-tile-content >
                        <v-list-tile-title class="mt-5 pl-3 subheading font-weight-bold">{{ cycle.cyclename}} </v-list-tile-title>
                    </v-list-tile-content>
                        <!-- <v-icon>archive</v-icon>  -->
                        <v-layout row wrap>
                        <v-flex xs12>
                    <v-list-tile-action>
                            <div class="text-xs-center pl-2" style="display:inline;">
                                <div v-if="cycle.status == '1'? 1:0" style="display:inline;">  
                                    <v-chip  @click="route3" small outline color="primary">Edit Cycle</v-chip>
                                </div>
                                <div v-else style="display:inline;">
                                <router-link :to="{name:'addcycle', params: {cycleId:cycle.id}}" style="text-decoration:none;">
                                    <v-chip small outline color="primary">Edit Cycle</v-chip>
                                </router-link>
                                </div>
                                <div v-if="cycle.status == '0'? 1:0" style="display:inline;">
                                    <v-chip v-on:click="root(cycle.id)" v-if="cycle.disable == 'true' ? true:false " small outline color="primary">Start Cycle</v-chip>
                                </div>
                                <div v-else style="display:inline;">
                                    <router-link :to="{name:'viewcycle', params: {cycleId:cycle.id}}" style="text-decoration:none;">
                                        <v-chip small outline color="primary">View Cycle</v-chip>
                                    </router-link> 
                                </div>
                                <v-chip v-if="cycle.disable == 'false' ? true:false"  @click="route2(cycle.startdate)" small outline color="primary">Start Cycle</v-chip>
                        </div>   
                    </v-list-tile-action> 
                </v-flex>
            </v-layout>
        </v-flex>                
    </v-list-tile>   
<v-divider inset style="margin-left:-200px;"></v-divider> 

</v-layout>
</div>

<div>
    <v-layout row wrap justify-center align-center>
        
        <v-flex xs12 lg12 sm12 md12 style="text-align: center;" class="mt-3">
            <router-link :to="{name:'archive', params: {}}" style="text-decoration:none;">
                <v-icon>archive</v-icon>
                <span class="font pl-1">Archive Cycle</span>
            </router-link>
        </v-flex>
        
    </v-layout> 
</div>   
</div>

<div v-else style="width:100%">
<v-layout row wrap justify-center align-center>
    <v-flex xs12 lg12 sm12 md12 style="text-align: center;" class="mt-3">
        <span class="font">Enter New Cycles Here</span>
    </v-flex>
</v-layout>
</div>
    <v-snackbar
        v-model="snackbar"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :color="color"
        right>
        {{ text }}  
            <v-btn
                color="white"
                style="height:62px;"
                flat
                @click="snackbar = false">
                Close
            </v-btn>
            </v-snackbar>
    <v-snackbar
        v-model="snackbar1"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :color="color1"
        right>
        {{ text1 }}  
            <v-btn
                color="white"
                style="height:62px;"
                flat
                @click="snackbar1 = false">
                Close
            </v-btn>
            </v-snackbar>
        </v-layout>
        <v-layout row justify-center>
                    <v-dialog
                        v-model="dialog"
                        max-width="290">
                        <v-card>
                            <v-card-title class="headline">Congrats</v-card-title>
                                <v-card-text>
                                Congratulation! You're just "40" days away from a better YOU :)
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
                                v-on:click="root1()">
                                Continue
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
status:'',
div:true,
archivecycle:'',
color:'',
text:'',
color1:'',
text1:'',
crdate: moment().format('YYYY-MM-DD'),
dialog:false,
cycleId:'',
snackbar:false,
snackbar1:false,
timeout: 6000,
mode: '',
row: null,
dialog2: false, 
dialog3: false,
cycles:[],
}
},

mounted(){
this.$store.dispatch('getCycle',{
    user_id: this.$store.getters.loggedInUserId,
})
.then(response => {

if(response.data.status!=undefined && response.data.status=='Token is Expired')
{
        this.$router.push({ name: 'login', params: { } })
}else{
        this.cycles =  response.data.new
    }
})
.catch(error=>{
    error.response
}) 
},

methods:{
route2(val){
    this.color = 'red'
    this.text =  'Alert! Your Cycle will start on '+val
    this.snackbar = true
},
    route3(){
    this.color1 = 'red'
    this.text1 =  'Error! You cannot edit cycle now'
    this.snackbar1 = true
},
root(val){
    this.id = val
    this.dialog = true
},
root1(){

        this.status = '1'
        this.$store.dispatch('update_status',{
            user_id: this.$store.getters.loggedInUserId,
            my_cycle: this.id,
            cyclestatus: this.status         
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
    this.$router.push({ name: 'viewcycle', params: {cycleId:this.id} })
},
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
