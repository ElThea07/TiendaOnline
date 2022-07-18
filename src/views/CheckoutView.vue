<template>
  <div class="home">
    <section class="banner-checkout">
      <div class="bag-checkout pt-5">
        <div>
          <h4>🎉 ¡GRACIAS POR LA COMPRA!🎉</h4>
          <h4>🎉 TÚ PRODUCTO ESTA EN CAMINO 🎉</h4>
        </div>
        <div class="container text-center">
          <button type="button" class="button__reset">
            <router-link :to="{ name: 'products' }" class="nav-link"
              >SEGUIR COMPRANDO</router-link
            >
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CheckOut",
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}

section {
  width: 100%;
  height: 100vh;
  background: url(https://giffiles.alphacoders.com/161/161565.gif);
  background-size: cover;
  position: relative;
}

.button__reset a {
  color: #ffffff;
  text-decoration: none;
}
</style>
