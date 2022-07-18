<template>
  
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="black">
          <b class="subheading"
            >¡Las distintas plataformas que trabajan con nosotros!</b
          >
          <v-spacer></v-spacer>
          <h3 id="title__h3" @click="footerReload()">⚔️TheaGames 🏹</h3>

          <v-spacer></v-spacer>
          <v-icon size="30px" class="mx-4 white--text">mdi-steam</v-icon>
          <v-icon size="30px" class="mx-4 white--text"
            >mdi-microsoft-windows</v-icon
          >
          <v-icon size="35px" class="mx-4 white--text">mdi-apple</v-icon>

          <v-icon size="40px" class="mx-4 white--text"
            >mdi-sony-playstation</v-icon
          >
          <v-icon size="30px" class="mx-4 white--text"
            >mdi-nintendo-switch</v-icon
          >
          <v-icon size="30px" class="mx-4 white--text"
            >mdi-microsoft-xbox</v-icon
          >
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          @{{ new Date().getFullYear() }} ⚔️TheaGames Corporation🏹 <br />
          Todos los derechos reservados. Todas las marcas registradas pertenecen
          a sus respectivos dueños. Todos los precios incluyen IVA (donde sea
          aplicable).
        </v-card-text>
      </v-card>
    </v-footer>
  
</template>

<script>
export default {
    name: "FooTer",
    methods: {
        footerReload() {
      this.$router.push("/");
    }
    },
}
</script>

<style>

</style>