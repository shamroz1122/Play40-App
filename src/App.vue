<template>
  <div id="app">
        
        <router-view></router-view>
     
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>

<style media="screen">

</style>
