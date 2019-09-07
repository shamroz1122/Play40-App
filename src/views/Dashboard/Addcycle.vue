<template>
  <div id="inspire"> 
      <v-app>
      <v-form ref="form1" v-model="valid" lazy-validation @submit.prevent="saveCycle">
        <v-toolbar class="primary" dark fixed>
          <span class="subheading font-weight-thin" style=" font-family: 'Open Sans', sans- serif !important;">{{ title}}</span>
            <v-layout row wrap justify-center>
            <v-spacer></v-spacer>  
            </v-layout>      
            <v-btn icon type="submit" v-show="save">
            <span class=" pr-4 body-1 font-weight-thin" style=" font-family: 'Open Sans', sans- serif !important;">SAVE</span>
            </v-btn>
            <v-progress-circular
                  indeterminate
                  color="white"
                  v-show = "loader"
          ></v-progress-circular>
            </v-toolbar>
                
              <v-container class=" mt-3">
                  <v-layout row wrap  class="mt-5">
                      <v-flex xs12 sm12 md12 lg12>
                          <v-text-field
                              :rules="nameRules"
                              v-model="cyclename"
                              color="primary"
                              label="cycle/title name"
                              outline
                          ></v-text-field>
                      </v-flex>
                  </v-layout> 
                  <v-layout row wrap>
                      <v-flex xs6 >
                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              lazy
                              transition="scale-transition"
                              color="purple"
                              menu-props="offsetY"
                              min-width="100px">
                              <template v-slot:activator="{ on }">
                              <v-text-field
                                  v-model="startdate"
                                  label="Start Day(Day 1)"
                                  outline
                                  v-on="on"
                              ></v-text-field>
                              </template>
                              <v-date-picker  :min="currentDate" :allowed-dates="allowedDates" v-model="startdate" v-on:change="val" @input="menu2 = false"></v-date-picker>
                          </v-menu>
                      </v-flex>
                        <v-flex xs6>
                          <v-menu
                              v-model="menu3"
                              :close-on-content-click="false"
                              lazy
                              transition="scale-transition" 
                              readonly
                              min-width="100px">
                          <template v-slot:activator="{ on }">
                              <v-text-field
                                  v-model="enddate"
                                  label="End Day(Day 40)"
                                  outline
                                  readonly
                              ></v-text-field>
                              </template>
                              <v-date-picker v-model="enddate" @input="menu3 = false"></v-date-picker>
                          </v-menu>
                      </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                      <v-flex xs12 sm12 md12 lg12>
                          <v-select 
                              v-model="linkedgoal"
                              :items="items"
                              item-text="goal"
                              item-value="id"
                              chips
                              label="Add Linked Goals"
                              multiple
                              menu-props="offsetY"
                              outline>
                              </v-select>
                      </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12>
                          
                        <v-combobox
                          v-model="model"                         
                          :hide-no-data="!search"     
                          label="Enter Commitments"
                          multiple
                          outline
                          small-chips
                          solo>
                          <template v-slot:no-data>
                          <v-list-tile>
                              <span class="subheading">Create</span>
                                  <v-chip
                                  :color="`${colors[nonce - 1]} lighten-3`"
                                  label
                                  small> 
                                  </v-chip>
                          </v-list-tile>
                          </template>
                          <template v-slot:selection="{ item, parent }">
                          <v-chip
                              :color="`${item.color} `"
                              label
                              small>
                              <span class="pr-2">
                              {{ item.text }}
                              </span>
                              <v-icon
                              small
                              @click="parent.selectItem(item)"
                              >close</v-icon>
                          </v-chip>
                          </template> 
                          </v-combobox>
                      </v-flex>
                  </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12>
                            
                      <v-combobox
                          v-model="model1"                         
                          :hide-no-data="!search"
                          
                          label="Enter Bonus Commitments"
                          multiple
                          outline
                          small-chips
                          solo>
                          <template v-slot:no-data>
                          <v-list-tile>
                              <span class="subheading">Create</span>
                                  <v-chip
                                  :color="`${colors[nonce - 1]} lighten-3`"
                                  label
                                  small>
                                  </v-chip>
                          </v-list-tile>
                          </template>
                          <template v-slot:selection="{ item, parent }">
                          <v-chip
                              :color="`${item.color} `"
                              label
                              small>
                              <span class="pr-2">
                              {{ item.text }}
                              </span>
                              <v-icon
                              small
                              @click="parent.selectItem(item)"
                              >close</v-icon>
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-app>
          </div>
</template>

<script>
import moment from 'moment'

export default {

data () {
  return {
      status:'0',
      title:'Add Cycle',
      mycyclehid:'',
      valid:true,
      save:true,
      loader:false,
      cyclename:'',
      startdate:'',
      enddate:'',
      activator: null,
      attach: null,
      colors: ['#ff66ff', '#FFFF01', '#01B0EF', '#FE0000','#7ac843'],
      index: -1,
      nonce: 1,
      model:[],
      model1: [],
      search: null,
      tab:null,  
      row: null,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu3: false,
      currentDate:moment().format('YYYY-MM-DD'),
      items: [],
      linkedgoal: [],
      nameRules: [
        v => !!v || 'Cycle Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 30 characters'
      ],
  }
},

watch: {
      model (val, prev) { 
            if (val.length === prev.length) return
      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      }) 
      if (val.length > 4) {
        this.$nextTick(() => this.model.pop())
      }
    },

      model1 (val, prev) {
            if (val.length === prev.length) return
      this.model1 = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
      if (val.length > 1) {
        this.$nextTick(() => this.model1.pop())
      }
    }
  },
methods: {
    allowedDates(){
      return moment()
    },
  
    val(){
      var strtdate =   this.startdate
      var new_date = moment(strtdate).add('days', 40)
      var endate = moment(new_date).format("YYYY-MM-DD")
      //alert(endate)
      this.enddate = endate
    },

  saveCycle(){
      if (this.$refs.form1.validate()) {
          
          this.save = false
          this.loader = true
          
          this.$store.dispatch('submit_cycle',{
              cyclename: this.cyclename,
              user_id: this.$store.getters.loggedInUserId,
              startdate: this.startdate,
              enddate: this.enddate,
              linkedgoal: this.linkedgoal,
              mycyclehid:this.mycyclehid,  
              model: this.model, 
              model1: this.model1,
              cyclestatus: this.status         
          })
          .then(response => {
              response.data
              this.save = true
              this.loader = false
              if(response.data.status!=undefined && response.data.status=='Token is Expired')
              {
                this.$router.push({ name: 'login', params: { } })
              }else{            
                this.$router.push({ name: 'cycle', params: { } })
              }
          })
          .catch(error=>{
              error.response
              this.save = true
              this.loader = false
          })
        }
      }
},
mounted(){
      this.$store.dispatch('getcyclealldata',{
          user_id: this.$store.getters.loggedInUserId,
          my_cycle: this.$route.params.cycleId
      })
        .then(response => {
          if(response.data.status!=undefined && response.data.status=='Token is Expired')
          {
              this.$router.push({ name: 'login', params: { } })
          }else{
              this.title = 'Update Cycle'
              //console.log(response.data.cycleDetail)
              this.items = response.data.cycleDetail
              this.cyclename = response.data.cycleDetail.cyclename
              this.startdate = response.data.cycleDetail.startdate
              this.enddate = response.data.cycleDetail.enddate
              this.items = response.data.cycleDetail.linkedgoal
              this.model = response.data.cycleDetail.Commitment
              this.model1 = response.data.cycleDetail.BonusCommitment
              this.mycyclehid = response.data.cycleDetail.id
          }
        })
        .catch(error=>{
          error.response
        }) 
      this.$store.dispatch('getcyclegoals',{
            user_id: this.$store.getters.loggedInUserId,
        })
        .then(response => {

          if(response.data.status!=undefined && response.data.status=='Token is Expired')
          {
                this.$router.push({ name: 'login', params: { } })
          }else{           
              //console.log(response.data.goals)
              this.items = response.data.goals
              //this.goalId = reponnse.data.goals.id      
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
