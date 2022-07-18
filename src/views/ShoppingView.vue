<template >
<!-- VISTA DE CARRO DE COMPRAS -->
  <div class="shoppingFondo pt-1">
    <ShoppingCartComponent></ShoppingCartComponent>
  </div>
</template>

<script>
import ShoppingCartComponent from "../components/ShoppingCart.vue";
export default {
  name: "ShoppingCartView",
  components: { ShoppingCartComponent },
};
</script>

<style>
#shopping-cart {
  margin-top: 100px;
}

.shoppingFondo {
  background: url(https://media.istockphoto.com/vectors/black-military-camouflage-fabric-seamless-texture-camo-pattern-for-vector-id1261309158?b=1&k=6&m=1261309158&s=170667a&w=0&h=yTh_pO40iRy0M02G-p8ntCpJaauopGwMb3z9ickXbtI=);
}
</style>
