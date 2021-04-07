<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3 font-weight-light"
                        >Sign in to CafeApp</h1>
                        <h4 class="text-center mt-3 font-italic font-weight-light">"Lupakan masalahmu, Sruput kopi bersamaku"</h4>
                        <v-form>
                          <v-text-field
                            prepend-icon="mdi-email"
                            label="Email"
                            color="teal accent-3"
                            v-model="loginData.email"
                            :rules="emailRules"
                          />
                          <v-text-field
                            prepend-icon="mdi-key"
                            label="Password"
                            type="password"
                            color="teal accent-3"
                            v-model="loginData.password"
                            :rules="passwordRules"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mb-5">
                        <v-btn rounded color="teal accent-3" dark @click="submitLogin(loginData)">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3 font-weight-light">Create Account</h1>
                        <v-form>
                          <v-text-field
                            label="Name"
                            prepend-icon="mdi-account"
                            color="teal accent-3"
                            :rules="nameRules"
                            v-model="registData.name"
                          />
                          <v-text-field
                            label="Email"
                            prepend-icon="mdi-email"
                            color="teal accent-3"
                            :rules="emailRules"
                            v-model="registData.email"
                          />

                          <v-text-field
                            label="Password"
                            prepend-icon="mdi-key"
                            type="password"
                            color="teal accent-3"
                            :rules="passwordRules"
                            v-model="registData.password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-5">
                        <v-btn rounded color="teal accent-3" dark @click="submitRegist(registData)">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Axios from 'axios';
export default {
  data: () => ({
    step: 1,
    loginData: {
      email: null,
      password: null
    },
    registData: {
      name: null,
      email: null,
      password: null,
      role: "user"
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
    ],
    firstcheckbox: false,
  }),
  props: {
    source: String
  },
  methods: {
    submitRegist(form) {
      const data = {
        username : form.name,
        email : form.email,
        password : form.password,
        role : form.role,
      }
      Axios({
        method: "POST",
        url:"http://localhost:3000/api/user", data,
        headers: {
          "Content-type" : "application/json"
        }
      })
      .then((res) => {
        alert("Succesfully Registered, Please Login")
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    },
    submitLogin(form) {
      const data = {
        email : form.email,
        password : form.password
      }
      console.log(data)
      this.$store.dispatch("login", data)
      .then((res) => {
        console.log(res.result[0].msg)
        if (res.result[0].msg != 'Succesfully created token') {
          alert(res.result[0].msg) 
        }
        if (res.result[0].msg === 'Succesfully created token') {
          if (res.result[0].role === 'admin') {
            alert("Welcome back Admin!")
          } else {
            alert("Login Succesfull, Welcome")
          }
          this.$router.push({ path: "/"}).catch((err) => {err})
          location.reload()
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    tes() {
      console.log(JSON.parse(localStorage.user).User.isAuth)
    }
  }
};
</script>