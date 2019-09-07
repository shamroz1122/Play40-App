<template>
  <div id="app">
    <v-app id="inspire">
    
      <v-content>
        <router-view></router-view>
      </v-content>
      
      <Footer/>
    </v-app>
  </div>
</template>

<script>

import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      drawer:null
    };
  }
};
</script>

<style>
.application--wrap {
  flex-direction: row;
}
</style>
