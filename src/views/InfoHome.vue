<template>
  <!-- VISTA DE PRODUCTOS DESTACADOS PARA USUARIOS NO REGISTRADOS -->
  <v-main
    :class="{
      zelda: dataInfo.id == 'a004',
      elden: dataInfo.id == 'a002',
      ff: dataInfo.id == 'a003',
      gta: dataInfo.id == 'a001',
    }"
  >
    <!-- IMG PRINCIPAL -->
    <h1 class="mb-5 white--text">{{ dataInfo.name }}</h1>
    <div>
      <v-img :src="dataInfo.src"></v-img>
    </div>

    <v-row class="d-flex justify-center">
      <div>
        <v-card dark class="mx-auto my-6 white--text" max-width="400">
          <v-img height="100%" :src="dataInfo.infosrc"></v-img>
          <v-rating
            :value="dataInfo.ranking"
            color="amber"
            dense
            half-increments
            readonly
            size="18"
          ></v-rating>
          <div class="mt-5">
            <b>Editor:</b> {{ dataInfo.editor }}
            <br />
            <v-span
              ><b>Desarrolladores:</b> {{ dataInfo.desarrollador }}</v-span
            >
            <br />
          </div>
          <v-divider class="mx-4 mt-5"></v-divider>
          <h3 class="mx-4 mt-5">{{ dataInfo.name }}</h3>
          <i style="font-size: 15px">{{ dataInfo.textinfo }}</i>
          <v-divider class="mx-4 mt-5"></v-divider>
        </v-card>
      </div>

      <div class="d-flex justify-center my-6">
        <v-card color="#171a21">
          <v-img
            :src="dataInfo.cardsrc"
            class="ma-4"
            height="280"
            width="240"
          />
          <p>{{ dataInfo.name }}</p>

          <h3 class="white--text mt-2">
            -{{ dataInfo.discount }}% ${{
              parseInt(
                dataInfo.price - dataInfo.price * (dataInfo.discount / 100)
              ).toLocaleString("de-DE")
            }}
          </h3>
          <p class="grey--text">
            Antes {{ dataInfo.price.toLocaleString("de-DE") }}
          </p>
        </v-card>
      </div>
    </v-row>

    <v-row justify="center">
      <v-col class="col-12 col-md-5 col-sm-10">
        <v-sheet class="mx-auto" elevation="8" max-width="1500" color="#171a21">
          <v-slide-group class="pa-3 red--text" show-arrows>
            <v-img
              :src="dataInfo.gamesrc1"
              class="ma-4"
              height="280"
              width="190"
            />
            <v-img
              :src="dataInfo.gamesrc2"
              class="ma-4"
              height="280"
              width="190"
            />
            <v-img
              :src="dataInfo.gamesrc3"
              class="ma-4"
              height="280"
              width="190"
            />
            <v-img
              :src="dataInfo.gamesrc4"
              class="ma-4"
              height="280"
              width="190"
            />
            <v-img
              :src="dataInfo.gamesrc5"
              class="ma-4"
              height="280"
              width="190"
            />
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>

    <div>
      <v-img :src="dataInfo.src"></v-img>
    </div>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["get_products"]),
  },
  computed: {
    ...mapState(["infoProducts"]),
    ...mapActions(["get_infoProducts"]),
    dataInfo() {
      const { infoProducts } = this;
      const { id } = this.$route.params;
      this.infoProduct = infoProducts.find(
        (infoProductId) => infoProductId.id == id
      );
      return this.infoProduct;
    },
  },
  created() {
    this.get_infoProducts;
    this.get_products();
  },
};
</script>

<style>
.zelda {
  background: url(https://zelda.com/breath-of-the-wild/assets/img/patterns/black.jpg);
}
.elden {
  background: url(https://media.istockphoto.com/vectors/red-texture-of-molten-lava-vector-id1300258471?k=20&m=1300258471&s=612x612&w=0&h=zL9J-dgn7AwczZbc6cbun_e-UeVbGATvWygCGkkrgjM=);
}
.ff {
  background: url(https://www.finalfantasyxiv.com/imgs/bg.jpg);
}
.gta {
  background: url(https://media.istockphoto.com/vectors/seamless-vector-pattern-vector-id1024579518?k=20&m=1024579518&s=612x612&w=0&h=UodofiUVtbm9e-GoyFp3P3VS4QX62wQL-T-B1TRLCic=);
}
</style>
