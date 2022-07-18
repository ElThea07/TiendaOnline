<template>
  <v-app>
    <v-app-bar app color="#171a21" extended class="white--text">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title @click="logoReload()"
        ><h3 id="title__h3" class="mt-5">⚔️TheaGames 🏹</h3></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-icon class="mt-10" color="amber" size="40px">mdi-triforce</v-icon>

      <div class="container_list">
        <div class="w100_list contenedor_list">
          <ul>
            <li>UF : ${{ ufValor.toLocaleString("de-DE") }}</li>
            <li>DOLAR : ${{ dolarValor.toLocaleString("de-DE") }}</li>
            <li>EURO : ${{ euroValor.toLocaleString("de-DE") }}</li>
            <li>IPC : {{ ipcValor }}%</li>
            <li>UTM : ${{ utmValor.toLocaleString("de-DE") }}</li>
            <li>IVP : ${{ ivpValor.toLocaleString("de-DE") }}</li>
            <li>IMACEC : {{ imacecValor }}%</li>
          </ul>
        </div>
      </div>

      <v-icon class="ml-5 mt-10" color="amber" size="40px">mdi-triforce</v-icon>

      <v-spacer></v-spacer>
      <v-row align="center" justify="space-around" v-if="!user">
        <v-btn class="white--text mt-5" color="#21b36c" @click="addCurso()">
          Log In / Sing Up
        </v-btn>
      </v-row>
      <span class="user-title mr-15" v-if="user"
        ><v-icon class="red--text">mdi-cards-heart</v-icon
        ><v-icon class="red--text">mdi-cards-heart</v-icon
        ><v-icon class="red--text">mdi-heart-half-full</v-icon>
        <b>{{ user.email }}</b></span
      >
      <v-icon
        color="white"
        class="mr-4"
        size="25px"
        v-if="user"
        @click="cerrarSesion"
        >mdi-logout</v-icon
      >
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary color="#171a21">
      <v-layout colum>
        <v-flex mx-3>
          <v-list-item class="text-center white--text">
            <v-list-item-title
              ><h3 id="title__h3" @click="logoReload()">
                ⚔️TheaGames 🏹
              </h3></v-list-item-title
            >
          </v-list-item>

          <v-list-item class="white--text" v-if="!user" to="/">
            <v-list-item-icon>
              <v-icon color="white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item class="white--text" v-if="userAdmin" to="/addproducts">
            <v-list-item-icon>
              <v-icon color="white">mdi-folder-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Products</v-list-item-title>
          </v-list-item>

          <v-list-item class="white--text" v-if="user" to="/">
            <v-list-item-icon>
              <v-icon color="white">mdi-storefront</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item>

          <v-list-item class="white--text" v-if="user" to="/shopping">
            <v-list-item-icon>
              <v-icon color="white">mdi-cart-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shopping</v-list-item-title>
          </v-list-item>

          <v-list-item class="white--text" v-if="user" @click="cerrarSesion">
            <v-list-item-icon>
              <v-icon color="white">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Exit</v-list-item-title>
          </v-list-item>

        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>

    <!-- LOGIN -->
    <v-card>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialogLogin" max-width="1080px">
            <v-card>
              <v-card-title class="shoppingg">
                <a style="color: #21b36c" @click="openRegister"
                  ><v-icon color="#21b36c" class="mr-4" size="25px"
                    >mdi-account</v-icon
                  >Log In</a
                >
                <v-spacer></v-spacer>
                <a class="grey--text" @click="openLoad"
                  ><v-icon color="grey" class="mr-4" size="25px"
                    >mdi-account-plus</v-icon
                  >Sign Up</a
                >
              </v-card-title>
              <v-card-text class="shoppingg">
                <v-container>
                  <v-form v-model="valid" ref="loginForm">
                    <v-row class="white--text" justify="center">
                      <v-col cols="8">
                        <v-text-field
                          v-model="userLoad.email"
                          label="Email"
                          :rules="emailRules"
                        />
                        <v-text-field
                          v-model="userLoad.password"
                          label="Password"
                          :rules="passwordRules"
                          :type="showPass ? 'text' : 'password'"
                          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                          @keyup.enter="loginUser"
                        />
                        <v-btn
                          class="mr-4 white--text"
                          color="#21b36c"
                          :disabled="!valid"
                          @click="loginUser"
                          >INICIAR</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-dialog v-model="loginError">
                    <v-card-title class="text-h5 error text-center">
                      ERROR
                    </v-card-title>
                    <v-card-text class="blue-grey lighten-5">
                      <v-form>
                        <v-container>
                          <v-row>
                            <v-col class="text-center" cols="12" md="12">
                              <p>{{ errorCode }}</p>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                  </v-dialog>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card>

    <!-- REGISTER -->

    <v-card>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialogRegister" max-width="1080px">
            <v-card>
              <v-card-title class="shoppingg">
                <a class="grey--text" @click="openRegister"
                  ><v-icon color="grey" class="mr-4" size="25px"
                    >mdi-account</v-icon
                  >Log In</a
                >
                <v-spacer></v-spacer>
                <a style="color: #21b36c" @click="openLoad"
                  ><v-icon color="#21b36c" class="mr-4" size="25px"
                    >mdi-account-plus</v-icon
                  >Sign Up</a
                >
              </v-card-title>
              <v-card-text class="shoppingg">
                <v-container>
                  <div>
                    <v-form v-model="registerValid" ref="registerForm">
                      <v-row justify="center">
                        <v-col cols="8">
                          <v-text-field
                            v-model="register.name"
                            label="Name"
                            :rules="registerNameRules"
                          />
                          <v-text-field
                            v-model="register.email"
                            label="Email"
                            :rules="registerEmailRules"
                          />
                          <v-text-field
                            v-model="register.password"
                            label="Password"
                            :rules="registerPasswordRules"
                          />
                          <v-text-field
                            v-model="register.repitPassword"
                            label="Repit Password"
                            :rules="registerRepitPasswordRules"
                            @keyup.enter="registerUser"
                          />
                          <v-btn
                            class="mr-4"
                            color="#21b36c"
                            :disabled="!registerValid"
                            @click="registerUser"
                            >REGISTRAR</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-form>

                    <v-dialog v-model="registerError">
                      <v-card-title class="text-h5 error text-center">
                        ERROR
                      </v-card-title>
                      <v-card-text class="blue-grey lighten-5">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-col class="text-center" cols="12" md="12">
                                <p>{{ errorCode }}</p>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>
                      </v-card-text>
                    </v-dialog>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card>
  </v-app>
</template>

<script>
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      ufValor: "",
      dolarValor: "",
      euroValor: "",
      ipcValor: "",
      utmValor: "",
      ivpValor: "",
      imacecValor: "",
      drawer: false,
      user: null,
      userAdmin: null,
      dialogLogin: false,
      valid: false,
      loginError: false,
      errorCode: "",
      userLoad: {
        email: "",
        password: "",
      },
      showPass: false,
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo",
        (v) => !!v || "No existe",
        (v) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) || "Email incorrecto",
      ],
      passwordRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 7) || "Password sobre 8 caracteres",
      ],
      dialogRegister: false,
      registerValid: false,
      registerError: false,
      errorCode: "",
      register: {
        name: "",
        email: "",
        password: "",
        repitPassword: "",
      },
      registerNameRules: [
        (v) => !!v || "Ingrese un nombre",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => (v && v.length > 3) || "Nombre minimo 4 caracteres",
      ],
      registerEmailRules: [
        (v) => !!v || "Ingrese un email",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) || "Email incorrecto",
      ],
      registerPasswordRules: [
        (v) => !!v || "Ingrese password",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => (v && v.length > 7) || "Password minimo 8 caracteres",
      ],
      registerRepitPasswordRules: [
        (v) => !!v || "Confirme password",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => (v && v.length > 7) || "Password minimo 8 caracteres",
        (v) => v === this.register.password || "Debe ser la misma password",
      ],
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user.email == "thea@test.com") {
        this.userAdmin = true;
      }
    });
    axios.get("https://mindicador.cl/api").then(({ data }) => {
      (this.ufValor = data.uf.valor),
        (this.dolarValor = data.dolar.valor),
        (this.euroValor = data.euro.valor),
        (this.ipcValor = data.ipc.valor),
        (this.utmValor = data.utm.valor),
        (this.ivpValor = data.ivp.valor),
        (this.imacecValor = data.imacec.valor);
    });
  },
  methods: {
    addCurso() {
      this.dialogLogin = true;
    },
    openRegister() {
      this.dialogLogin = true;
      this.dialogRegister = false;
    },
    openLoad() {
      this.dialogLogin = false;
      this.dialogRegister = true;
    },
    async cerrarSesion() {
      await signOut(auth);
      this.userAdmin = null;
      this.$router.push("/home");
    },
    async loginUser() {
      try {
        const userLogin = await signInWithEmailAndPassword(
          auth,
          this.userLoad.email,
          this.userLoad.password
        );
        this.$router.push("/");
        (this.dialogLogin = false),
          (this.userLoad.email = ""),
          (this.userLoad.password = "");
      } catch (error) {
        this.loginError = true;
        switch (error.code) {
          case "auth/user-not-found":
            this.errorCode = "Usurario no registrado";
            break;
          case "auth/wrong-password":
            this.errorCode = "Contraseña incorrecta";
            break;
          default:
            this.errorCode = "FALLA DE SERVIDOR!";
        }
      }
    },
    async registerUser() {
      try {
        const userRegister = await createUserWithEmailAndPassword(
          auth,
          this.register.email,
          this.register.password
        );
        this.$router.push("/");
        this.dialogRegister = false;
        (this.register.name = ""),
          (this.register.email = ""),
          (this.register.password = ""),
          (this.register.repitPassword = "");
      } catch (error) {
        this.registerError = true;
        switch (error.code) {
          case "auth/email-already-in-use":
            this.errorCode = "Correo registrado!";
            break;
          default:
            this.errorCode = "falla de servidor";
        }
      }
    },
    logoReload() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.shoppingg {
  background: url(https://astatic.trovocdn.net/cat/img/5458b97.jpg?max_age=31536000);
}
.logo {
  cursor: pointer;
}
.container_list {
  max-width: 180px;
  width: 50%;
  margin-top: 40px;
}
.w100_list {
  width: 100%;
}
.contenedor_list {
  text-align: center;
  overflow: hidden;
  white-space: 200px;
  height: 50px;
}
.contenedor_list ul {
  list-style: none;
  animation-duration: 15s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  color: #ffc107;
}
@keyframes slidein {
  0%,
  100% {
    margin-top: 8%;
  }
  25% {
    margin-top: -25%;
  }
  50% {
    margin-top: -50%;
  }
  75% {
    margin-top: -75%;
  }
}
</style>
