<template>
<!-- VISTA DEL HOME PARA USUARIOS NO REGISTRADOS -->
  <div>
    <v-carousel show-arrows-on-hover cycle>
      <div v-for="(item, i) in infoProducts" :key="i">
        <v-carousel-item
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          @click="updateInfo(item.id)"
        ></v-carousel-item>
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

    <CarouselHome class="mb-10" />

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
            <ProductHome
              v-if="searchedProducts.length > 0"
              :productList="searchedProducts"
            ></ProductHome>
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
import ProductHome from "../components/ProductHome.vue";
import CarouselHome from "@/components/CarouselHome.vue";
export default {
  name: "HomeView",
  components: { ProductHome, CarouselHome },
  data() {
    return {
      routerEdit: "",
    };
  },
  methods: {
    updateInfo(id) {
      this.routerEdit = id;
      this.$router.push(`/home/${this.routerEdit}`);
    },
  },
  computed: {
    ...mapState(["search", "infoProducts"]),
    ...mapGetters(["searchedProducts"]),
    ...mapActions(["get_products", "get_infoProducts"]),
  },
  created() {
    this.get_products;
    this.get_infoProducts;
  },
};
</script>

<style></style>
