<template>
<div> 
    <v-app>
        <v-toolbar class="primary" dark fixed >   
            <v-layout row wrap class="mt-2">
                <v-flex xs1 md2 sm2 lg2>
                        <i class="material-icons " style="color:white;" v-on:click="cut">
                        arrow_back
                        </i>              
                </v-flex>
                <v-flex xs10 sm9 md9 lg9 class="text-xs-center">
                    <span class="font">{{ title }}</span>
                </v-flex>
                <v-flex xs1 sm2 md2 lg1 class="text-xs-center">
                    <span  @click.stop="dialog = true" class="font">END</span>
                </v-flex>
            </v-layout>
        </v-toolbar>   
        <v-container fluid class="pa-0 ma-0" >
            <v-form ref="form2" v-model="valid" lazy-validation @submit.prevent="submit">
            <v-layout row wrap style="margin-top:57px">
                <v-flex xs12>
                    <template>
                    <v-tabs                      
                        color="#EFEFEF"
                        hide-slider
                        class="ma-0 pa-0"
                        v-model="modeltab"
                         >
                        <v-tabs-slider color="#EFEFEF"></v-tabs-slider>
                        <v-tab      
                        v-for="(tab1, i) in tabs1"
                        :key="i"
                        >
                        <v-btn color="#FFFFFF"  light style="height:60px;"  class="ma-0 pa-0">                               
                            <v-card style=" width: 87px;
                                    height: 57px;
                                    padding-top: 12px;">
                            Day {{ tab1.day }} 
                            <br><span style="font-size:10px" > {{ tab1.date }}</span><br>
                        </v-card>
                    </v-btn>
                </v-tab>

    <v-tabs-items v-model="modeltab">
        <v-tab-item 
        v-for="(tab1, i) in tabs1"
        :key="i"
           >
            <v-tabs
                v-model="tabs"
                fixed-tabs
                color="primary"
                >
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab  class="white--text" :href="`#tab-1`">
                    Commitments
                </v-tab>

                <v-tab class="white--text" :href="`#tab-2`">
                    Goals
                </v-tab>

                <v-tab class="white--text" :href="`#tab-3`">
                    Bonus
                </v-tab>
            
    <v-tabs-items v-model="tabs">
        <v-tab-item :value="`tab-1`">
            <v-card flat>
                <v-card-text class="py-0 mt-3">
                    <v-timeline
                        align-top
                        dense
                        light>

                    <v-timeline-item
                        color="#ff66ff"
                        large  >
                        <v-layout wrap>
                            <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                    <v-flex xs11>
                                            <span class="commit_title">Commitment 1</span><br>
                                            <span class="commit_body">{{ commitments[0]}}</span>
                                    </v-flex>
                                    <v-flex xs1>
                                        <v-checkbox
                                            v-on:change="submit($event,commitments[0],'0')"
                                            v-model="tab1.commitments[Object.keys(tab1.commitments)[0]]['status']"
                                            small
                                            color="success"
                                            hide-details
                                            :disabled="tab1.disabled == 'true'? true:false"
                                        ></v-checkbox>
                                    </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            </v-flex>
                        </v-layout>
                    </v-timeline-item>

                    <v-timeline-item
                        color="#FFFF01"
                        large>
                        <v-layout wrap pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                    <v-flex xs11>
                                        <span class="commit_title">Commitment 2</span><br>
                                        <span class="commit_body">{{ commitments[1]}}</span>
                                    </v-flex>
                                        <v-flex xs1>
                                        <v-checkbox
                                        v-on:change="submit($event,commitments[1],'1')"
                                        v-model="tab1.commitments[Object.keys(tab1.commitments)[1]]['status']"
                                        small
                                        color="success"
                                        hide-details
                                       :disabled="tab1.disabled == 'true'? true:false"
                                        ></v-checkbox>
                                    </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            </v-flex>                         
                        </v-layout>
                    </v-timeline-item>

                    <v-timeline-item
                        color="#01B0EF"
                        large>
                        <v-layout pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs11>
                                            <span class="commit_title">Commitment 3</span><br>
                                            <span class="commit_body">{{ commitments[2]}}</span>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-checkbox
                                            v-on:change="submit($event,commitments[2],'2')"
                                            v-model="tab1.commitments[Object.keys(tab1.commitments)[2]]['status']"
                                            small
                                            color="success"
                                            hide-details
                                            :disabled="tab1.disabled == 'true'? true:false"
                                            ></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            </v-flex>                           
                        </v-layout>
                    </v-timeline-item>
                    
                    <v-timeline-item
                        color="#FE0000"
                        large>
                        <v-layout pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs11>
                                            <span class="commit_title">Commitment 4</span><br>
                                            <span class="commit_body">{{ commitments[3]}}</span>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-checkbox
                                            v-on:change="submit($event,commitments[3],'3')"
                                            v-model="tab1.commitments[Object.keys(tab1.commitments)[3]]['status']"
                                            small
                                            color="success"
                                            hide-details
                                            :disabled="tab1.disabled == 'true'? true:false"
                                            ></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                              </v-card>
                            </v-flex>                
                        </v-layout>
                    </v-timeline-item>  
                    
                </v-timeline>
            </v-card-text>
        </v-card>
    </v-tab-item>

    <v-tab-item :value="'tab-2'">
        <v-card flat>
            <v-card-text>
                <v-timeline
                    align-top
                    dense
                    light>
                    <v-timeline-item
                        color="#FE0000"
                        large  >
                        <v-layout wrap>
                            <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                    <v-flex xs11>
                                        <span class="commit_title">Goal 1</span><br>
                                        <span class="commit_body">{{ goals[0] }}</span>
                                    </v-flex>
                                    <v-flex xs1>
                                        <v-checkbox
                                       v-on:change="submitgoal($event,goals[0],'0')"
                                        v-model="tab1.goals[Object.keys(tab1.goals)[0]]['status']"
                                        small
                                        color="success"
                                        hide-details
                                        :disabled="tab1.disabled == 'true'? true:false"
                                        ></v-checkbox>
                                    </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            </v-flex>
                        </v-layout>
                    </v-timeline-item>

                    <v-timeline-item
                        color="#FFFF01"
                        large>
                        <v-layout wrap pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                    <v-flex xs11>
                                        <span class="commit_title">Goal 2</span><br>
                                        <span class="commit_body">{{ goals[1] }}</span>
                                    </v-flex>
                                        <v-flex xs1>
                                        <v-checkbox
                                        v-on:change="submitgoal($event,goals[1],'1')"
                                        v-model="tab1.goals[Object.keys(tab1.goals)[1]]['status']"
                                        small
                                        color="success"
                                        hide-details
                                        :disabled="tab1.disabled == 'true'? true:false"
                                        ></v-checkbox>
                                    </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            </v-flex>                         
                        </v-layout>
                    </v-timeline-item>

                    <v-timeline-item
                        color="#01B0EF"
                        large>
                        <v-layout pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs11>
                                            <span class="commit_title">Goal 3</span><br>
                                            <span class="commit_body">{{ goals[2] }}</span>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-checkbox
                                            v-on:change="submitgoal($event,goals[2],'2')"
                                            v-model="tab1.goals[Object.keys(tab1.goals)[2]]['status']"
                                            small
                                            color="success"
                                            hide-details
                                            :disabled="tab1.disabled == 'true'? true:false"
                                            ></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            </v-flex>                           
                        </v-layout>
                    </v-timeline-item>
                    
                    <v-timeline-item
                        color="#FE0000"
                        large>
                        <v-layout pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs11>
                                            <span class="commit_title">Goal 4</span><br>
                                            <span class="commit_body">{{ goals[3] }}</span>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-checkbox
                                                v-on:change="submitgoal($event,goals[3],'3')"
                                                v-model="tab1.goals[Object.keys(tab1.goals)[3]]['status']"
                                                small
                                                color="success"
                                                hide-details
                                                :disabled="tab1.disabled == 'true'? true:false"
                                            ></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>                
                        </v-layout>
                    </v-timeline-item> 
                </v-timeline>
            </v-card-text>
        </v-card>
    </v-tab-item>

        <v-tab-item :value="'tab-3'">
            <v-card flat>
                <v-card-text class="py-0 mt-3">
                     <v-timeline
                        align-top
                        dense
                        light>
                     <v-timeline-item
                        color="#7ac843"
                        large>
                    <v-layout pt-1>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs10>
                                            <span class="commit_title">Bonus Commitment</span><br>
                                            <span class="commit_body">{{ bonus[0] }}</span>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-checkbox
                                           v-on:change="submitbonus($event,bonus[0])"
                                            v-model="tab1.bonusgoal[Object.keys(tab1.bonusgoal)[0]]['status']"
                                            small  
                                            color="success"
                                            hide-details
                                            :disabled="tab1.disabled == 'true'? true:false"
                                            ></v-checkbox>
                                        </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>                 
                        </v-layout>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
        </v-card>
    </v-tab-item>    
</v-tabs-items>
</v-tabs>

</v-tab-item>
    </v-tabs-items>
        </v-tabs>
        <!-- <v-btn type="submit" class="primary">Submit</v-btn> -->
            </template>
                </v-flex>
                    </v-layout>
                        </v-form> 
                        <v-layout row justify-center>
                            <v-dialog
                            v-model="dialog"
                            max-width="290">
                            <v-card>
                                <v-card-title class="headline">Alert!</v-card-title>
                                    <v-card-text>
                                    Are you sure to end cycle? Ending cycle will delete your cycle data.
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
                                     @click="del()">
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
        dialog: false,
        modeltab:null,
        valid:false,
        tabs1:[],
        title:'',
        date:'',
        goals:[],
        commitments:[],
        bonus:'',
        sdate:'',
        edate:'',
        tabs: 'tab-1',
        crdate: moment().format('YYYY-MM-DD'),
        gol:'',
        check1:false,
        check2:false,
        check3:false,
        check4:false,       
        check01:false,
        check02:false,
        check03:false,
        check04:false,
        check5:false,
    }
},

mounted(){
    //console.log(this.crdate)
    this.$store.dispatch('getDetails',{
            user_id: this.$store.getters.loggedInUserId,
            my_cycle: this.$route.params.cycleId
        })
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
                this.$router.push({ name: 'login', params: { } })
        }else{
            this.title = response.data.cycleDetail.cyclename
            this.commitments = response.data.cycleDetail.Commitment
            this.goals = response.data.cycleDetail.linkedgoal
            this.bonus = response.data.cycleDetail.BonusCommitment
            this.sdate = response.data.cycleDetail.startdate
            this.edate = response.data.cycleDetail.enddate
            this.tabs1 = response.data.cycleDetail.tabs
            this.date = this.sdate
            var data = this.tabs1
            var currentdate = this.crdate
            Object.keys(data).forEach(function (item) {             
                
                if(data[item]['date'] == currentdate){             
                    data[item]['disabled'] = 'false'                               
                }
            })           
        }
    })
        .catch(error=>{
        error.response
    }) 
    const list = document .getElementsByClassName("v-tabs__bar"); 
    list[0].style.height = "75px"; 
    const list1 = document .getElementsByClassName("v-tabs__container"); 
    list1[0].style.height = "75px"; 
    
},

    methods:{
    cut(){
        this.$router.go(-1)
        },

    del(){
        this.dialog = false
        this.$store.dispatch('deleteCycle',{
        user_id: this.$store.getters.loggedInUserId,
        my_cycle: this.$route.params.cycleId, 
                     
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
   
submit(e,val,ind){  
            
            if(e==true)
            {
                e = 1
            }else if(e==false){
                e = 0
            }
            this.$store.dispatch('selectComit',{
            user_id: this.$store.getters.loggedInUserId,
            my_id: this.$route.params.cycleId,
            currdate:this.crdate,
            commitment: val,
            status: e,           
            comit_index: ind     
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
},
submitgoal(e,val,ind){    

        if(e==true)
        {
            e = 1
        }else if(e==false){
            e = 0
        }
        this.$store.dispatch('selectGoal',{
        user_id: this.$store.getters.loggedInUserId,
        my_id: this.$route.params.cycleId,
        currdate:this.crdate,
        goal: val,
        status: e,
        goal_index: ind  
            
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
},
submitbonus(e,val){  

        if(e==true)
        {
            e = 1
        }else if(e==false){
            e = 0
        }
        this.$store.dispatch('selectbon',{
        user_id: this.$store.getters.loggedInUserId,
        my_id: this.$route.params.cycleId,
        currdate:this.crdate,
        bonus: val,
        status: e                    
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
},
},    
}

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.font{
font-size: 15px;
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
.active{
color:black;
background-color: white;
}
.commit_title{
font-size: 11px;
font-family: 'Open Sans', sans- serif !important;
}
.commit_body{
font-size: 14px;
font-weight: bold;
font-family: 'Open Sans', sans- serif !important;
}

</style>
