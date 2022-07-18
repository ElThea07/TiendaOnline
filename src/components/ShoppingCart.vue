<template>
  <div>
      <v-row>
          <v-col class="col-12 col-md-12 col-sm-12">
    <div class="text-center mx-auto">
      <div v-if="$store.state.shoppingCart.length > 0">
        <h4>
          TOTAL A PAGAR: ${{
            parseInt($store.getters["totalCash"]).toLocaleString(
              "de-DE"
            )
          }}
        </h4>
        <div v-if="$store.getters['fullDiscountProducts'] > 0">
          <p>
            Llevas {{ $store.getters.totalNumberProducts }} productos en
            tu carro
            <br />
            <v-icon class="white--text">mdi-hand-heart</v-icon>Descuento de ${{
              parseInt(
                $store.getters["fullDiscountProducts"]
              ).toLocaleString("de-DE")
            }}
            tú compra
          </p>
        </div>
        <div v-else>
          <p>
            Tienes
            {{ $store.getters.totalNumberProducts }} productos en tu
            carro de compras
          </p>
        </div>
        <div class="container">
          <button class="button__neon" @click="clickOnCheckout">Comprar</button>
        </div>
      </div>
      <h4 v-else>No tienes productos en tu carrito de compras actualmente</h4>
    </div>

    <table class="table__cart">
      <tbody>
        
            <tr v-for="(item, $index) in cartItems" :key="$index">
          <td class="td__img">
            <img :src="item.src" alt="" />
          </td>
          <td class="text-center">
            <h2>
              {{ item.name }}
            </h2>
            <p>{{ item.description }}</p>
            <div>
              <div v-if="item.clearance === true">
                <p>
                  ${{
                    parseInt(
                      item.price * (1 - item.discount / 100)
                    ).toLocaleString("de-DE")
                  }}
                </p>
                <p>
                  Precio Original: ${{ item.price.toLocaleString("de-DE") }} |
                  {{ item.discount }}% Off
                </p>
              </div>
              <div v-else>
                <p>${{ item.price.toLocaleString("de-DE") }}</p>
              </div>
            </div>
          </td>
          <td class="text-center">
            <button class="button__neon" @click="increaseItemQuantity(item)">
              +
            </button>
            <p>{{ item.quantity }}</p>
            <button class="button__neon" @click="reduceItemQuantity($index)">
              -
            </button>
            <br />
            <br />
            <button
              class="button__neon"
              @click="removeFromShoppingCart($index)"
            >
              Eliminar
            </button>
          </td>

          <td class="text-center">
            <h5 style="color:#FF3D00">Total Producto</h5>
            <h4 style="color:#FF3D00">
              ${{
                parseInt(
                  item.price * (1 - item.discount / 100) * item.quantity
                ).toLocaleString("de-DE")
              }}
            </h4>
          </td>
          
        </tr>
          
        
      </tbody>
      
    </table>
    </v-col>
        </v-row>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  computed: {
    cartItems() {
      return this.$store.getters.addProductShoppinCart;
    },
  },
  methods: {
    increaseItemQuantity(item) {
      this.$store.dispatch("addProductToShoppingCart", item);
    },

    reduceItemQuantity(index) {
      this.$store.dispatch("reduceProductQuantity", index);
    },

    removeFromShoppingCart(index) {
      this.$store.dispatch("removeProductFromShoppingCart", index);
    },

    async clickOnCheckout() {
      await this.$store.dispatch("clickOnCheckout");
      this.$router.push("/checkout");
    },
  },
};
</script>

<style>
</style>
