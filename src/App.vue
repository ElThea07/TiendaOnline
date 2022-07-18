<template>
  <v-app>
    <NavBar />
    <FooTer />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";
export default {
  name: "App",

  data: () => ({}),
  methods: {
    
  },
  components: {
    NavBar,
    FooTer
},
};
</script>
<style></style>
