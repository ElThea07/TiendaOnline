import Vue from "vue";
import Vuex from "vuex";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    shoppingCart: [],
    products: [],
    infoProducts: [],
  },
  getters: {
    //LA BUSQUEDA SE VA MOSTRANDO SI COINCIDE CON UN NOMBRE, DESCRIPCION O CATEGORIA
    searchedProducts(state) {
      if (state.search === "") {
        return state.products;
      } else {
        return state.products.filter(
          (product) =>
            product.name.toLowerCase().includes(state.search.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.search.toLowerCase()) ||
            product.category.toLowerCase().includes(state.search.toLowerCase())
        );
      }
    },
    //PRODUCTOS CON DESCUENTO
    productSale(state) {
      return state.products.filter((product) => product.clearance == "true");
    },
    //BUSCA PRODUCTO POR NOMBRE Y AGRERA AL CARRO
    addProductShoppinCart(state) {
      return state.shoppingCart.map((item) => {
        const product = state.products.find(
          (product) => product.name === item.name
        );
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount,
          clearance: product.clearance,
          src: product.src,
          quantity: item.quantity,
        };
      });
    },

    //MONTO TOTAL EN EL CARRO
    totalCash(state) {
      return state.shoppingCart.reduce((accumulator, item) => {
        accumulator =
          accumulator + item.price * (1 - item.discount / 100) * item.quantity;
        return accumulator;
      }, 0);
    },
    //CANTITDAD TOTAL DE PRODUCTOS EN EL CARRO
    totalNumberProducts(state) {
      return state.shoppingCart.reduce((accumulator, item) => {
        accumulator = accumulator + item.quantity;
        return accumulator;
      }, 0);
    },
    //DESCUENTO TOTAL DE PRODUCTOS EN EL CARRO
    fullDiscountProducts(state) {
      return state.shoppingCart.reduce((accumulator, item) => {
        accumulator =
          accumulator +
          (item.price * item.quantity -
            item.price * (1 - item.discount / 100) * item.quantity);
        return accumulator;
      }, 0);
    },
  },
  //MUTATION
  mutations: {
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    GET_INFO_PRODUCTS(state, payload) {
      state.infoProducts = payload;
    },
    SET_SEARCH(state, newSearch) {
      state.search = newSearch;
    },
    ADD_PRODUCT_TO_CART(state, product) {
      state.shoppingCart.push({ ...product, quantity: 1 });
    },
    INCREMENT_PRODUCT(state, productAlreadyInShoppinCart) {
      productAlreadyInShoppinCart.quantity++;
    },
    REDUCE_PRODUCT(state, index) {
      state.shoppingCart[index].quantity--;
    },
    REMOVE_PRODUCTS(state, index) {
      state.shoppingCart.splice(index, 1);
    },
    CLEAR_CART(state) {
      state.shoppingCart = [];
    },
  },
  //ACTIONS
  actions: {
    //LLAMAR A PRODUCTO
    async get_products({ commit }) {
      try {
        const q = query(collection(db, "products"));
        onSnapshot(q, (querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            products.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_PRODUCTS", products);
        });
      } catch (error) {}
    },
    //AGREGAR NUEVO PRODUCTO
    async add_product({ commit }, product) {
      try {
        await addDoc(collection(db, "products"), {
          name: product.name,
          description: product.description,
          category: product.category,
          clearance: product.clearance,
          discount: product.discount,
          price: product.price,
          src: product.src,
          uid: auth.currentUser.uid,
        });
      } catch (error) {}
    },
    //LLAMAR A PRODUCTOS DESTACADOS
    async get_infoProducts({ commit }) {
      try {
        const q = query(collection(db, "infoProducts"));
        onSnapshot(q, (querySnapshot) => {
          const infoProducts = [];
          querySnapshot.forEach((doc) => {
            infoProducts.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_INFO_PRODUCTS", infoProducts);
        });
      } catch (error) {}
    },
    //AGREGAR PRODUCTOS DESTACADOS
    async add_infoProduct({ commit }, infoProduct) {
      try {
        await addDoc(collection(db, "infoProducts"), {
          name: infoProduct.name,
          cardsrc: infoProduct.cardsrc,
          desarrollador: infoProduct.desarrollador,
          editor: infoProduct.editor,
          lanzamiento: infoProduct.lanzamiento,
          ranking: infoProduct.ranking,
          infosrc: infoProduct.infosrc,
          textinfo: infoProduct.textinfo,
          gamesrc1: infoProduct.gamesrc1,
          gamesrc2: infoProduct.gamesrc2,
          gamesrc3: infoProduct.gamesrc3,
          gamesrc4: infoProduct.gamesrc4,
          gamesrc5: infoProduct.gamesrc5,
          category: infoProduct.category,
          clearance: infoProduct.clearance,
          discount: infoProduct.discount,
          price: infoProduct.price,
          src: infoProduct.src,
          id: infoProduct.id,
          uid: auth.currentUser.uid,
        });
      } catch (error) {}
    },

    //STRING DE BUSQUEDA
    setSearch(context, newSearch) {
      context.commit("SET_SEARCH", newSearch);
    },
    //BUSCA PRODUCTO Y LO AGREGA AL CARRO
    addProductToShoppingCart(context, product) {
      const productAlreadyInShoppinCart = context.state.shoppingCart.find(
        (productAlreadyInShoppinCart) =>
          product.name === productAlreadyInShoppinCart.name
      );
      if (productAlreadyInShoppinCart) {
        context.commit("INCREMENT_PRODUCT", productAlreadyInShoppinCart);
      } else {
        context.commit("ADD_PRODUCT_TO_CART", product);
      }
    },
    //REDUCE CANTIDAD DE PRODUCTOS EN CARRO HASTA ELIMINARLOS
    reduceProductQuantity(context, index) {
      if (context.state.shoppingCart[index].quantity > 1) {
        context.commit("REDUCE_PRODUCT", index);
      } else {
        context.commit("REMOVE_PRODUCTS", index);
      }
    },
    //ELIMINA CANTIDAD TOTAL DE LOS PRODUCTOS
    removeProductFromShoppingCart(context, index) {
      context.commit("REMOVE_PRODUCTS", index);
    },
    //AL COMPRAR SE LIMPIA CARRO
    clickOnCheckout(context) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("CLEAR_CART");
          resolve();
        }, 1000);
      });
    },
  },
  modules: {},
});
