<template>
  <v-app id="inspire">
    
    <v-footer class="primary" app inset dark>
      <v-bottom-nav
      
      :value="true"
      absolute
      color="primary"
    >
      <v-btn
        color="white"
        :to="{name:'lists'}" style="text-decoration:none;"
        flat
        value="recent"
      >
        <span class="fon">Lists</span>
        <v-icon>menu</v-icon>
      </v-btn>

      <v-btn
        color="white"
        :to="{name:'cycle'}" style="text-decoration:none;"
        flat
        value="favorites"
      >
        <span class="fon">Cycle</span>
        <v-icon>autorenew</v-icon>
      </v-btn>

      <v-btn
        color="white"
        flat
        value="nearby"
        :to="{name:'saved'}" style="text-decoration:none;"
      >
        <span class="fon">Completed</span>
        <v-icon>done_outline</v-icon>
      </v-btn>
    </v-bottom-nav>
    </v-footer> 
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

.fon{
  
  font-family: 'Open Sans', sans- serif !important;  
}
</style>
