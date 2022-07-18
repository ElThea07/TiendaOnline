<template>
  <div class="mt-10">
    <v-row justify="center">
      <v-col class="col-12 col-md-8 col-sm-6">
        <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="1500"
    color="#171a21"
  >
  <h3 class="white--text pt-5">Juegos en Oferta:</h3>
    <v-slide-group
      class="pa-3 red--text"
      show-arrows
    >
      <div
        v-for="n, i in productSale"
        :key="i"
      >
        <v-img
          :src="n.src"
          class="ma-4"
          height="280"
          width="190"
        />
              <p style="font-size:12px">{{n.name}}</p>
              <h3 class="white--text mt-2">-{{ n.discount }}% ${{
                parseInt(
                  n.price - n.price * (n.discount / 100)
                ).toLocaleString("de-DE")
              }}</h3>
              <p class="grey--text">Antes {{n.price.toLocaleString("de-DE")}}</p>
            
      </div>
    </v-slide-group>
  </v-sheet>
      </v-col>
      </v-row>
  </div>
  
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["productSale"]),
  },
};
</script>
<style>
.mdi-chevron-right::before {
    color: white;
}
.mdi-chevron-left::before {
    color: white;
}
</style>