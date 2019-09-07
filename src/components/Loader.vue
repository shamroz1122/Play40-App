<template>
  <div>
    <div class="below-loader" > 
      <v-progress-circular
        class="progress-bar"
        :size="50"
        color="#3F51B5"
        indeterminate >
        </v-progress-circular>
      </div>
    </div>
  </template>
<script>
  export default {
  data () {
  return {
       }
     }
  }

</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem   
</style>

<style scoped>
.progress-bar{
    margin: 0 auto;
    position: absolute;
    left: 45%;
    top: 30%;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
.below-loader{
    height: 100vh;
    width: 100%;
    top: 10%;
    left: 0;  
    background: white;
    position: fixed;
    z-index: 9;
} 
</style>