<template>
  <!-- SE PUEDEN AGREGAR PRODUCTOS AL STORE Y PRODUCTOS DESTACADOS -->
  <div id="app" class="addFondo">
    <h2 class="pt-10">AGREGAR JUEGO A STORE</h2>

    <v-form class="mb-10 form" @submit.prevent="add_product">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field v-model="product.name" label="Name" required />

          <v-text-field
            v-model="product.description"
            label="Descripción"
            required
          />

          <v-row align="center">
            <v-col cols="6">
              <v-subheader class="grey--text">
                Selecciona una categoría
              </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="product.category"
                :hint="`${product.category}`"
                :items="items"
                item-text="items"
                label="Categoría"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>

          <v-text-field
            v-model.number="product.price"
            required
            label="Precio"
          />

          <v-row align="center">
            <v-col cols="6">
              <v-subheader class="black--text"> Oferta </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="product.clearance"
                required
                :hint="`${product.clearance}`"
                :items="sale"
                item-text="sale"
                label="Oferta"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>

          <v-text-field
            v-model.number="product.discount"
            required
            label="Descuento (%)"
          />

          <v-text-field v-model="product.src" required label="URL Imagen" />

          <v-btn class="mr-2 mb-10 " color="#21b36c" type="submit"
            >AÑADIR PRODUCTO</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-divider color="grey" class="mx-10"></v-divider>

    <h2 class="mt-10">AGREGAR JUEGO DE PORTADA</h2>

    <form class="form py-15" @submit.prevent="add_infoProduct">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field v-model="infoProduct.name" required label="Name" />
          <v-row align="center">
            <v-col cols="6">
              <v-subheader class="grey--text">
                Selecciona una categoría
              </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="infoProduct.category"
                :hint="`${infoProduct.category}`"
                :items="items"
                item-text="items"
                label="Categoría"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-text-field
            v-model.number="infoProduct.price"
            required
            label="Precio"
          />
          <v-row align="center">
            <v-col cols="6">
              <v-subheader class="black--text"> Oferta </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="infoProduct.clearance"
                required
                :hint="`${infoProduct.clearance}`"
                :items="sale"
                item-text="sale"
                label="Oferta"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-text-field
            v-model.number="infoProduct.discount"
            required
            label="Descuento (%)"
          />
          <v-text-field
            v-model="infoProduct.lanzamiento"
            required
            label="Fecha De Lanzamiento"
          />
          <v-text-field
            v-model="infoProduct.desarrollador"
            required
            label="Desarrolladores"
          />
          <v-text-field v-model="infoProduct.editor" required label="Editor" />
          <v-text-field
            v-model="infoProduct.ranking"
            required
            label="Nota Ranking"
          />

          <v-text-field
            v-model="infoProduct.src"
            required
            label="URL Imagen Portada"
          />
          <v-text-field
            v-model="infoProduct.infosrc"
            required
            label="URL Imagen Info"
          />
          <v-text-field
            v-model="infoProduct.textinfo"
            required
            label="Texto Info"
          />
          <v-text-field
            v-model="infoProduct.cardsrc"
            required
            label="URL Imagen Card"
          />
          <v-text-field
            v-model="infoProduct.gamesrc1"
            required
            label="URL Galeria Info Imagen 1"
          />
          <v-text-field
            v-model="infoProduct.gamesrc2"
            required
            label="URL Galeria Info Imagen 2"
          />
          <v-text-field
            v-model="infoProduct.gamesrc3"
            required
            label="URL Galeria Info Imagen 3"
          />
          <v-text-field
            v-model="infoProduct.gamesrc4"
            required
            label="URL Galeria Info Imagen 4"
          />
          <v-text-field
            v-model="infoProduct.gamesrc5"
            required
            label="URL Galeria Info Imagen 5"
          />

          <v-text-field v-model="infoProduct.id" label="ID Portada" required />

          <v-btn class="mr-2 mb-10" color="#21b36c" type="submit">
            AÑADIR PRODUCTO
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddProducts",
  data: () => ({
    items: ["Code", "Fisico", "Digital"],
    sale: ["true", "false"],
    product: {
      name: "",
      description: "",
      category: "",
      clearance: false,
      discount: null,
      price: null,
      src: "",
    },
    infoProduct: {
      name: "",
      cardsrc: "",
      category: "",
      clearance: false,
      discount: null,
      price: null,
      desarrollador: "",
      editor: "",
      src: "",
      infosrc: "",
      lanzamiento: "",
      ranking: "",
      id: "",
      gamesrc1: "",
      gamesrc2: "",
      gamesrc3: "",
      gamesrc4: "",
      gamesrc5: "",
      textinfo: "",
    },
  }),
  methods: {
    ...mapActions(["add_product", "add_infoProduct"]),
    add_product() {
      this.$store.dispatch("add_product", this.product);
      alert(
        `¡Genial! el producto ${this.product.name} ha sido agregado exitosamente`
      );
      this.product = {
        name: "",
        description: "",
        category: "",
        clearance: false,
        discount: null,
        price: null,
        src: "",
      };
    },
    add_infoProduct() {
      this.$store.dispatch("add_infoProduct", this.infoProduct);
      alert(`¡Genial!, ha sido agregado exitosamente`);
      this.infoProduct = {
        name: "",
        cardsrc: "",
        category: "",
        clearance: false,
        discount: null,
        price: null,
        desarrollador: "",
        editor: "",
        src: "",
        infosrc: "",
        lanzamiento: "",
        ranking: "",
        id: "",
        gamesrc1: "",
        gamesrc2: "",
        gamesrc3: "",
        gamesrc4: "",
        gamesrc5: "",
        textinfo: "",
      };
    },
  },
};
</script>

<style scoped>
.addFondo {
  background: url(https://media.istockphoto.com/vectors/black-military-camouflage-fabric-seamless-texture-camo-pattern-for-vector-id1261309158?b=1&k=6&m=1261309158&s=170667a&w=0&h=yTh_pO40iRy0M02G-p8ntCpJaauopGwMb3z9ickXbtI=) !important;
}
</style>
