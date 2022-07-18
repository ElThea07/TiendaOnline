<template>
<!-- VISTA DEL HOME PARA USUARIOS REGISTRADOS -->
  <div>
    <v-carousel show-arrows-on-hover cycle>
      <div  v-for="item, i in infoProducts" :key="i">
      <v-carousel-item
        :src="item.src"
        @click="updateInfo(item.id)"
      >
      </v-carousel-item>
      </div>
    </v-carousel>

    
        <v-card class="d-flex justify-center black">
        <v-card-title>
          <v-icon size="50px" class="mx-4 white--text">mdi-steam</v-icon>
          <v-icon size="50px" class="mx-4 white--text"
            >mdi-microsoft-windows</v-icon
          >
          <v-icon size="50px" class="mx-4 white--text">mdi-apple</v-icon>

          <v-icon size="60px" class="mx-4 white--text"
            >mdi-sony-playstation</v-icon
          >
          <v-icon size="50px" class="mx-4 white--text"
            >mdi-nintendo-switch</v-icon
          >
          <v-icon size="50px" class="mx-4 white--text"
            >mdi-microsoft-xbox</v-icon
          >
        </v-card-title>
      </v-card>


    <CarouselList class="mb-10" />

    <v-row justify="center" class="my-6">
      <v-col cols="7">
        <form>
          <input
            class="input__list"
            type="search"
            placeholder="🔎Busca tus productos..."
            aria-label="Search"
            :value="search"
            @input="$store.dispatch('setSearch', $event.target.value)"
          />
        </form>

        <div>
          <div v-if="searchedProducts.length > 0">
            <ProductList
              v-if="searchedProducts.length > 0"
              :productList="searchedProducts"
            ></ProductList>
          </div>
          <div v-else>
            <div class="product-not-found my-5">Ups! Nada por aquí</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ProductList from "../components/ProductList.vue";
import CarouselList from "@/components/CarouselList.vue";
export default {
  name: "ProductsView",
  components: { ProductList, CarouselList },
  data() {
    return {
      routerEdit:""
    }
  },
  methods: {
    updateInfo(id) {
      this.routerEdit = id;
      this.$router.push(`/products/${this.routerEdit}`);
    },
  },
  computed: {
    ...mapState(["search","infoProducts"]),
    ...mapGetters(["searchedProducts"]),
    ...mapActions(["get_products", "get_infoProducts"]),
  },
  created() {
    this.get_products;
    this.get_infoProducts;
  },
};

//
</script>

<style>
/* body *{
  border: solid 1px red;
} */
.v-carousel .v-window-item {
    cursor: pointer;
}
</style>
