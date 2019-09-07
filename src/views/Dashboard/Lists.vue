<template>
<div id="inspire"> 
<v-app>
    <v-toolbar class="primary" dark fixed >   
        <v-layout row wrap>
            <v-flex xs4 md2 sm2 lg2></v-flex>
            <v-flex xs6 sm9 md9 lg9 class="text-xs-center">
                <span class="font">Lists</span>
            </v-flex>
        </v-layout>
        <v-flex xs2 md1 sm1 lg1>
            <v-btn fab dark @click="dialog2 = !dialog2" color="white" class="mt-5" style="height: 45px;width: 45px;">
            <v-icon color="primary" dark>add</v-icon>
            </v-btn>
        </v-flex>
    </v-toolbar> 
        <v-container fluid class="pa-0 mt-3">
            <v-layout row wrap class="mt-5">
                <v-flex xs12 sm12 md12 lg12>
                    <p class="pl-3 pt-2"><b> THESE ARE YOUR TOTAL LISTS</b></p>
                    <hr>
                </v-flex>
                <div v-if="listing.length>0" style="width:100%">
                <v-layout row wrap v-for="(liste,index) in listing" :key="index"> 
                    <v-list-tile style="height:85px;">
                        <v-flex xs2>
                        <v-list-tile-avatar class="mt-5">
                            <v-icon large>
                            view_list
                            </v-icon>
                        </v-list-tile-avatar>
                    </v-flex>
                    <v-flex xs12>
                        <v-list-tile-content class="mt-4"> 
                            <v-list-tile-title class="mt-3 pl-3 subheading font-weight-bold">{{ liste.list }}</v-list-tile-title>
                        </v-list-tile-content>
                    
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-list-tile-action>
                                <div class="text-xs-center pl-2">
                                    
                                    <v-chip small outline @click="dialog3 = !dialog3" color="primary">Add Goal</v-chip>
                                    <router-link :to="{name:'goals'}" style="text-decoration:none;">
                                    <v-chip small outline color="primary">View Goals</v-chip>
                                    </router-link>
                                </div>
                            </v-list-tile-action>
                        </v-flex>
                    </v-layout>        
                </v-flex> 
            </v-list-tile>
        <v-divider inset style="    margin-left: -200px;"></v-divider> 
    </v-layout>
</div>
    <div v-else style="width:100%">
        <v-layout row wrap justify-center align-center>
        <v-flex xs12 lg12 sm12 md12 style="text-align: center;" class="mt-3">
            <span class="font">Enter New Lists Here</span>
        </v-flex>
    </v-layout>
</div>
<v-divider inset></v-divider>      
            <v-dialog v-model="dialog2" max-width="500px">
                <v-card>
                        <v-form ref="form1" v-model="valid" lazy-validation @submit.prevent="saveList">
                <v-card-title class="title">
                    Add List
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        :rules="nameRules"
                        v-model="lists"
                        label="Add List Name"
                        outline
                        required
                    ></v-text-field>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="pl-5" color="primary" flat @click="dialog2=false">Close</v-btn>
                    <v-btn color="primary" v-show="addBtn" type="submit" flat >Save</v-btn>
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            v-show = "loader"
                    ></v-progress-circular>
                </v-card-actions>
                        </v-form>
                </v-card>
                
            </v-dialog>

            <v-dialog v-model="dialog3" max-width="500px">
                <v-card>
                        <v-form ref="form2" v-model="valid" lazy-validation @submit.prevent="saveGoal">
                <v-card-title class="title">
                    Add Goals
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="addgoal"
                        :rules="nameRules"
                        label="Add Goal Name"
                        outline
                    ></v-text-field>
                    <v-radio-group v-model="row" row>
                        <v-radio color="primary" label="Long term goal" value="long term"></v-radio>
                        <v-radio  color="primary"  label="Short term goal" value="short term"></v-radio>
                    </v-radio-group> 
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="pl-5" color="primary" flat @click="dialog3=false">Close</v-btn>
                    <v-btn color="primary" v-show="addBtn1" type="submit" flat >Save</v-btn>
                    <v-progress-circular
                            indeterminate
                            color="primary"
                            v-show = "loader1"
                    ></v-progress-circular>
                    </v-card-actions>
                        </v-form>
                </v-card>
                </v-dialog>
            </v-layout>
        </v-container>
    </v-app>
</div>
</template>
<script>

export default {
data () {
return {
listing:[],
valid:true,
addBtn: true,
addBtn1:true,
loader1:false,
loader:false,
lists:'',
addgoal:'',
row: null,
dialog2: false, 
dialog3: false,
nameRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 50) || 'Name must be less than 30 characters'
],
}
},
methods:{
saveList(){

    if (this.$refs.form1.validate()) {
        this.addBtn = false
        this.loader = true
            this.dialog2 = false
        this.$store.dispatch('submit_list',{
            lists: this.lists,
            user_id: this.$store.getters.loggedInUserId,
            
        })
        .then(response => {
            response.data
            this.addBtn = true
            this.loader = false
            
            if(response.data.status!=undefined && response.data.status=='Token is Expired')
            {
            this.$router.push({ name: 'login', params: { } })
            }else{
                this.dialog2 = false
                this.$router.push({ name: 'lists', params: { } })
            }
        })
        .catch(error=>{
            error.response
        })
    }
},
    saveGoal(){

    if (this.$refs.form2.validate()) {
        this.addBtn1 = false
        this.loader1 = true
        this.$store.dispatch('submit_goal',{
            addgoal: this.addgoal,
            radio: this.row,
            user_id: this.$store.getters.loggedInUserId,
            
        })
        .then(response => {
            response.data
            this.addBtn1 = true
            this.loader1 = false
            this.dialog3 = false
            
            if(response.data.status!=undefined && response.data.status=='Token is Expired')
            {
            this.$router.push({ name: 'login', params: { } })
            }else{
                this.dialog3 = false
                this.$router.push({ name: 'lists', params: { } })
            }
        })
        .catch(error=>{
            error.response
        })
    }
}

},
mounted(){

this.$store.dispatch('getLists',{
        user_id: this.$store.getters.loggedInUserId,
    })
    .then(response => {

    if(response.data.status!=undefined && response.data.status=='Token is Expired')
    {
            this.$router.push({ name: 'login', params: { } })
    }else{

            this.listing =  response.data.user
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
