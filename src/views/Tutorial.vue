<template>
<v-app id="inspire"> 
<v-toolbar class="primary" dark fixed >   
<v-layout row wrap>
    <v-flex xs12 sm12 md12 lg12 class="text-xs-center">
        <span class="font">Tutorial</span>
    </v-flex>
</v-layout>
</v-toolbar>
<v-container>
    <v-layout row wrap justify-center align-center style="margin-top:18%;">
        <v-flex xs12 sm12 md12 lg12 >
            <v-carousel class="elevation-0" height="590" light hide-controls style="background:none;" >    
                    <v-carousel-item >
                    <v-card class="ma-1 pa-2  elevation-12" height="530">

                    <v-layout row wrap justify-center class="mt-5">
                        <v-flex xs8 md4 sm4 lg3>
                            <v-responsive>
                            <v-img
                            :src="require('../assets/logo_cropped.png')"
                            ></v-img>
                            </v-responsive>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" justify-center>
                        <v-flex xs3 sm2 md1 lg1 text-xs-center>
                            <span class="font1 headline">Step 1</span>
                        </v-flex>
                    </v-layout>
                        <v-layout row wrap class="mt-1" justify-center>
                        <v-flex xs10 sm10 md8 lg8 text-xs-center>
                            <span class="fon subheading font-weight-light">Create Your 4-Better Goals Lists</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-5" >
                        <v-flex xs12 sm6 md8 lg6>
                            <span class="fon body-2 font-weight-bold pl-2">Short term Goals</span><br>
                            <span class="fon pl-1" style="color:grey;">(Goals that will take less than 12 months to achieve)</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-2" >
                        <v-flex xs12 sm6 md8 lg6>
                            <span class="fon body-2 font-weight-bold pl-2">Long term Goals</span><br>
                            <span class="fon pl-1" style="color:grey; ">(Goals that will take more than 12 months to achieve)</span>
                        </v-flex>
                    </v-layout>
                    </v-card>
                </v-carousel-item> 
                
                <v-carousel-item>
                    <v-card class="ma-1 pa-2 elevation-10" height="530">
                    <v-layout row wrap justify-center class="mt-5">
                        <v-flex xs8 md4 sm4 lg3>
                            <v-responsive>
                            <v-img
                            :src="require('../assets/logo_cropped.png')"
                            ></v-img>
                            </v-responsive>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" justify-center>
                        <v-flex xs3 sm2 md1 lg1 text-xs-center>
                            <span class="font1 headline">Step 2</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-1" justify-center>
                        <v-flex xs10 sm2 md1 lg1 text-xs-center>
                            <span class="fon subheading font-weight-light">Create a Cycle</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" >
                        <v-flex xs12 sm6 md8 lg6>
                            <v-layout row wrap>
                                <v-flex xs1>
                                    <span class="pl-2"><v-icon class="font-weight-bold" small>done</v-icon></span>
                                </v-flex>
                                <v-flex xs10>
                                    <span class="fon body-2 pl-1">Create your 4-Now Goal</span>
                                    <br>
                                    <span class="fon body-2 ">(small goal to achieve during 40-day cycle)</span>
                                </v-flex>
                            </v-layout>
                            
                            <v-layout row wrap>
                                <v-flex xs1>
                                    <span class="pl-2"><v-icon class="font-weight-bold" small>done</v-icon></span>
                                </v-flex>
                                <v-flex xs11>
                                    <span class="fon body-2 pl-1">Select your start date</span>
                                </v-flex>
                            </v-layout>
                            
                            <v-layout row wrap>
                                <v-flex xs1>
                                    <span class="pl-2"><v-icon class="font-weight-bold" small>done</v-icon></span>
                                </v-flex>
                                <v-flex xs11>
                                    <span class="fon body-2 pl-1">Link goals from your 4-Better Goals lists(this 4-Now will help you achieve them later!)</span>
                                </v-flex>
                            </v-layout>
                            

                            <v-layout row wrap>
                                <v-flex xs1>
                                    <span class="pl-2"><v-icon class="font-weight-bold" small>done</v-icon></span>
                                </v-flex>
                                <v-flex xs11>
                                    <span class="fon body-2 pl-1">Create your daily commitments(the four things you will do Every Day to help you achieve your 4-Now Goal)</span>
                                </v-flex>   
                            </v-layout>
                            
                                <v-layout row wrap>
                                <v-flex xs1>
                                    <span class="pl-2"><v-icon class="font-weight-bold" small>done</v-icon></span>
                                </v-flex>
                                <v-flex xs11>
                                    <span class="fon body-2 pl-1">Create a bonus commitment(it can be anything)</span>
                                </v-flex>
                                </v-layout>
                        </v-flex>
                    </v-layout>
                    </v-card>
                </v-carousel-item>

                    <v-carousel-item>
                        <v-card class="ma-1 pa-2 pb-5 elevation-10" height="530">
                    <v-layout row wrap justify-center class="mt-5">
                        <v-flex xs8 md4 sm4 lg3>
                            <v-responsive>
                            <v-img
                            :src="require('../assets/logo_cropped.png')"
                            ></v-img>
                            </v-responsive>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" justify-center>
                        <v-flex xs3 sm2 md1 lg1 text-xs-center>
                            <span class="font1 headline">Step 3</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-1" justify-center>
                        <v-flex xs10 sm10 md8 lg8 text-xs-center>
                            <span class="fon subheading font-weight-light">Save your Cycle</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" justify-center text-xs-center>
                        <v-flex xs12 sm6 md8 lg6>
                            <span class="fon subheading">Congrats! You're a Goal Getter!</span>
                            <br>
                        </v-flex>
                    </v-layout>
                        </v-card>
                </v-carousel-item>

                    <v-carousel-item>
                        <v-card class="ma-1 pa-2 pb-5 elevation-10" height="530">
                    <v-layout row wrap justify-center class="mt-5">
                        <v-flex xs8 md4 sm4 lg3>
                            <v-responsive>
                            <v-img
                            :src="require('../assets/logo_cropped.png')"
                            ></v-img>
                            </v-responsive>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" justify-center>
                        <v-flex xs3 sm2 md1 lg1 text-xs-center>
                            <span class="font1 headline">Step 4</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-1" justify-center>
                        <v-flex xs10 sm10 md8 lg8 text-xs-center>
                            <span class="fon subheading font-weight-light">Ready.Set.Goal!</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4" justify-center text-xs-center>
                        <v-flex xs12 sm6 md8 lg6>
                            <span class="fon subheading">Start your cycle on the day selected.</span>
                            <br>
                            <br>
                            <br>
                            <router-link :to="{name:'account'}" style="text-decoration:none;">
                                <v-btn class="button" outline color="primary">
                                    <span class="details">Continue</span>
                                    <i style="color:#7ac843;" class="material-icons" >
                                        arrow_forward
                                    </i>
                                    </v-btn>
                                </router-link>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-carousel-item>          
            </v-carousel>
        </v-flex>
    </v-layout>
</v-container>
</v-app>
</template>

<script>

export default {

data() {
return {
    
};
},
mounted (){

    const list = document .getElementsByClassName("v-carousel__controls"); // get all p elements
    const listNew = document .getElementsByClassName("v-btn"); 

    list[0].style.background = "none"; 
    
    listNew[0].classList.add('v-btn')
}
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.font{
font-size: 16px;
font-family: 'Open Sans', sans- serif !important;
letter-spacing: 1px;

}
.fon{
font-family: 'Open Sans', sans- serif !important;

}
.font1{

color: grey;
font-weight: bold;
font-family: 'Open Sans', sans- serif !important;
letter-spacing: 1px;  
}
.details{
color:#7ac843; 
font-size:12px;
font-family: 'Open Sans', sans- serif !important;
letter-spacing: 2px;

}
.v-btn:before {
opacity: 0 !important; 
}
</style>
