<template>
<v-container>
    <v-row>
      <v-flex v-for="item in productList" :key="item.nombre">
            
            <div class="cards">
            <div class="face img__card">
              <img :src="item.src" alt="" />
              <h3>{{ item.name }}</h3>
            </div>
            <div class="face info__card">
              <br />
              <h2>{{ item.name }}</h2>
              <p>Formato: {{ item.category }}</p>
              <p>
                {{ item.description }}
              </p>
              <h3><v-icon class="white--text">mdi-hand-heart</v-icon>
                ${{
                  parseInt(
                    item.price - item.price * (item.discount / 100)
                  ).toLocaleString("de-DE")
                }}
              </h3>
              <p class="precio">
                ${{ item.price.toLocaleString("de-DE") }}-<i>
                  {{ item.discount }}% Off</i
                >
              </p>
            </div>
          </div>

      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductHome",
  props: {
    productList: { type: Array, require: true },
  },
};
</script>

<style></style>