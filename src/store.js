import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)
axios.defaults.baseURL = 'https://www.cosmospk.com/my40app/public/api'
//axios.defaults.baseURL = 'http://localhost/my40app/public/api'
export default new Vuex.Store({
state: {
  token:localStorage.getItem('access_token') || null,
  userId:localStorage.getItem('user_id') || null,
  
},
getters: {
  loggedIn(state) {
    return state.token !== null
  },
  loggedInUserId(state) {
    return state.userId
  }
},
mutations: {
  retrieveToken(state, token) {
    state.token = token
  },
  retrieveUserId(state, user_id){
    state.userId = user_id
  },
  destroyToken(state) {
    state.token = null
    state.userId = null
  }
},

actions: {
  
  signup(context, data) {
    return new Promise((resolve, reject) => {
      var config = {
          headers: {"content-type":"application/json"}
      };
      axios.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },config)
        .then(response => {
          const token = response.data.token
          const user_id = response.data.user.id

          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)

          localStorage.setItem('user_id', user_id)
          context.commit('retrieveUserId', user_id)
          resolve(response)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  },

  authenticate(context, credentials){
    return new Promise((resolve, reject) => {
  
    var data = new FormData()
    data.append('email',credentials.email)
    data.append('password',credentials.password)
      axios.post('/login', data)
        .then(response => {
          
          const token = response.data.token
          const user_id = response.data.user.id

          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)

          localStorage.setItem('user_id', user_id)
          context.commit('retrieveUserId', user_id)
          resolve(response)
        })
        .catch(error => {
          reject(error.response)
        })
      })
  },


  submit_list(context, credentials) {
    //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
  
        var token_bearer =  context.state.token
  
        if (context.getters.loggedIn) {
          return new Promise((resolve, reject) => {
            var data = new FormData()
            data.append('user_id',credentials.user_id)
            data.append('lists',credentials.lists)
  
            axios.post('/lists?token='+token_bearer, data)
              .then(response => {
                if(response.data.status!=undefined && response.data.status=='Token is Expired')
                {
                  localStorage.removeItem('access_token')
                  localStorage.removeItem('user_id')
                  context.commit('destroyToken')
                }
                resolve(response)
              })
              .catch(error => {
                reject(error.response)
              })
          })
        }
  },

  getLists(context, credentials) {
    var data = new FormData()
    data.append("user_id",credentials.user_id)
    var token_bearer =  context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/getAllLists?token='+token_bearer,data)
            .then(response => {
            if(response.data.status!=undefined && response.data.status=='Token is Expired')
            {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user_id')
                context.commit('destroyToken')
            }

              resolve(response)
            })
            .catch(error => {

              reject(error)

            })
        })
      }
},

submit_goal(context, credentials) {
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      var token_bearer =  context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          var data = new FormData()
          data.append('user_id',credentials.user_id)
          data.append('addgoal',credentials.addgoal)
          data.append('radio',credentials.radio)

          axios.post('/goal?token='+token_bearer, data)
            .then(response => {
              if(response.data.status!=undefined && response.data.status=='Token is Expired')
              {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user_id')
                context.commit('destroyToken')
              }
              resolve(response)
            })
            .catch(error => {
              reject(error.response)
            })
        })
      }
},

getGoals(context, credentials) {
  var data = new FormData()
  data.append("user_id",credentials.user_id)
  var token_bearer =  context.state.token

    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios.post('/getgoal?token='+token_bearer,data)
          .then(response => {
          if(response.data.status!=undefined && response.data.status=='Token is Expired')
          {
              localStorage.removeItem('access_token')
              localStorage.removeItem('user_id')
              context.commit('destroyToken')
          }

            resolve(response)
          })
          .catch(error => {

            reject(error)

          })
      })
    }
},
getcyclegoals(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/cyclegoal?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }

          resolve(response)
        })
        .catch(error => {

          reject(error)

        })
    })
  }
},


submit_cycle(context, credentials) {
    var token_bearer =  context.state.token

    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        var data = new FormData()
        data.append('user_id',credentials.user_id)
        data.append('cyclename',credentials.cyclename)
        data.append('cyclestatus',credentials.cyclestatus)
        data.append('startdate',credentials.startdate)
        data.append('enddate',credentials.enddate)
        data.append('linkedgoal',credentials.linkedgoal)
        data.append('model',JSON.stringify(credentials.model))
        data.append('model1',JSON.stringify(credentials.model1))
        data.append('mycyclehid', credentials.mycyclehid)

        axios.post('/cycle?token='+token_bearer, data)
          .then(response => {
            if(response.data.status!=undefined && response.data.status =='Token is Expired')
            {
              localStorage.removeItem('access_token')
              localStorage.removeItem('user_id')
              context.commit('destroyToken')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
},

update_status(context, credentials) {
var token_bearer =  context.state.token
if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
    var data = new FormData()
    data.append('cyclestatus',credentials.cyclestatus)
    data.append('user_id',credentials.user_id)
    data.append("my_cycle",credentials.my_cycle)

    axios.post('/upstatus?token='+token_bearer, data)
      .then(response => {
        if(response.data.status!=undefined && response.data.status =='Token is Expired')
        {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          context.commit('destroyToken')
        }
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
},

update_archive(context, credentials) {
var token_bearer =  context.state.token
if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
    var data = new FormData()
    data.append('archivecycle',credentials.archivecycle)
    data.append('user_id',credentials.user_id)
    data.append("my_cycle",credentials.my_cycle)

    axios.post('/archcycle?token='+token_bearer, data)
      .then(response => {
        if(response.data.status!=undefined && response.data.status =='Token is Expired')
        {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          context.commit('destroyToken')
        }
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
},

getCycle(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getAllCycles?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }

          resolve(response)
        })
        .catch(error => {

          reject(error)

        })
    })
  }
},

getArch(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getAllArch?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }

          resolve(response)
        })
        .catch(error => {

          reject(error)

        })
    })
  }
},

getSaved(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getAllsave?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }

          resolve(response)
        })
        .catch(error => {

          reject(error)

        })
    })
  }
},

getDetails(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
data.append("my_cycle",credentials.my_cycle)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getCycleDet?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }
        resolve(response)
        })
        .catch(error => {
        reject(error)

        })
    })
  }
},

getcyclealldata(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
data.append("my_cycle",credentials.my_cycle)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getCycleDet?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }

          resolve(response)
        })
        .catch(error => {

          reject(error)

        })
    })
  }
},


selectComit(context, credentials) {
var token_bearer =  context.state.token

if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
    var data = new FormData()
    data.append('user_id',credentials.user_id)
    data.append('my_id',credentials.my_id)
    data.append('currdate',credentials.currdate)
    data.append('commit',credentials.commitment)
    data.append('comit_index',credentials.comit_index)
    data.append('status',credentials.status)

    axios.post('/dailyCommit?token='+token_bearer, data)
      .then(response => {
        if(response.data.status!=undefined && response.data.status =='Token is Expired')
        {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          context.commit('destroyToken')
        }
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
},

selectGoal(context, credentials) {
var token_bearer =  context.state.token

if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
    var data = new FormData()
    data.append('user_id',credentials.user_id)
    data.append('my_id',credentials.my_id)
    data.append('currdate',credentials.currdate)
    data.append('selgoal',credentials.goal)
    data.append('goal_index',credentials.goal_index)
    data.append('status',credentials.status)

    axios.post('/dailygoal?token='+token_bearer, data)
      .then(response => {
        if(response.data.status!=undefined && response.data.status =='Token is Expired')
        {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          context.commit('destroyToken')
        }
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
},

selectbon(context, credentials) {
var token_bearer =  context.state.token

if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
    var data = new FormData()
    data.append('user_id',credentials.user_id)
    data.append('my_id',credentials.my_id)
    data.append('currdate',credentials.currdate)
    data.append('selebonus',credentials.bonus)
    data.append('status',credentials.status)

    axios.post('/dailybonus?token='+token_bearer, data)
      .then(response => {
        if(response.data.status!=undefined && response.data.status =='Token is Expired')
        {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          context.commit('destroyToken')
        }
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
},

getcommit(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
data.append("my_cycle",credentials.my_cycle)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getCommit?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }
        resolve(response)
        })
        .catch(error => {
        reject(error)

        })
    })
  }
},
getgol(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
data.append("my_cycle",credentials.my_cycle)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getGol?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }
        resolve(response)
        })
        .catch(error => {
        reject(error)

        })
    })
  }
},
getbondetl(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
data.append("my_cycle",credentials.my_cycle)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/getBon?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }
        resolve(response)
        })
        .catch(error => {
        reject(error)

        })
    })
  }
},
deleteCycle(context, credentials) {
var data = new FormData()
data.append("user_id",credentials.user_id)
data.append("my_cycle",credentials.my_cycle)
var token_bearer =  context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      axios.post('/delcycle?token='+token_bearer,data)
        .then(response => {
        if(response.data.status!=undefined && response.data.status=='Token is Expired')
        {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            context.commit('destroyToken')
        }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
},
  
}
})
