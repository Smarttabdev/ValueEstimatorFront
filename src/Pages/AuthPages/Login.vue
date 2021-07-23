<template>
  <div>
    <transition name="fade" mode="out-in" appear>
      <div class="h-100">
        <b-row class="h-100 no-gutters">
          <b-col lg="4" class="d-none d-lg-block">
            <div class="slider-light">
              <slick ref="slick" :options="slickOptions6">
                <div class="position-relative h-100 d-flex justify-content-center bg-login-slick-1" >
                  <div class="slide-img-bg " />
                  <div class="slider-content">
                  </div>
                </div>
                <div class="position-relative h-100 d-flex justify-content-center  bg-login-slick-2">
                  <div class="slide-img-bg" />
                  <div class="slider-content">
                  </div>
                </div>
                <div class="position-relative h-100 d-flex justify-content-center bg-login-slick-3">
                  <div class="slide-img-bg " />
                  <div class="slider-content">
                  </div>
                </div>
              </slick>
            </div>
          </b-col>
          <b-col lg="8" md="12" class="h-100 d-flex bg-white justify-content-center align-items-center">
            <b-col lg="9" md="10" sm="12" class="mx-auto app-login-box">
              
              <h4 class="mb-0">
                <div>Welcome back,</div>
                <span>Please sign in to your account.</span>
              </h4>
              <h6 class="mt-3">
                No account?
                <a href="/register" class="text-primary">Sign up now</a>
              </h6>
              <div class="divider" />
              <div>
                <v-form ref="validate" lazy-validation>
                  <b-row>
                    <b-col md="6">
                      <b-form-group>
                        <v-text-field v-model="email" :rules="rules.email" label="Email"></v-text-field>
                      </b-form-group>
                    </b-col>
                    <b-col md="6">
                      <b-form-group>
                        <v-text-field v-model="password" :rules="rules.password" type="password" label="Password"></v-text-field>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-checkbox name="check" id="exampleCheck">Keep me logged in</b-form-checkbox>
                  <div class="divider" />
                  <div class="d-flex align-items-center">
                    <div class="ml-auto">
                      <a href="/calculator" class="btn-lg btn btn-link"> <h5 class="m-auto">Go to calculator</h5> </a>
                      <b-button variant="primary" size="lg" @click="Login">Login</b-button>
                    </div>
                  </div>
                </v-form>
              </div>
            </b-col>
          </b-col>
        </b-row>
      </div>
    </transition>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      class="error-alert"
    >
    {{errorValue}}
    </b-alert>
  </div>
</template>

<script>
import * as AuthService from '@/services/auth.service';
import * as StorageService from '@/services/storage.service';
import Slick from "vue-slick";

export default {
  components: {
    Slick
  },
  data: () => ({
    slickOptions6: {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true
    },

    slide: 0,
    sliding: null,
    email: '',
    password: '',
    dismissSecs: 10,
    dismissCountDown: 0,
    errorValue: '',
    rules: {
      email: [
        v => !!v || "Email is required!"
      ],
      password: [
        v => !!v || "Password is required!"
      ]
    }
  }),

  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
    userRole() {
      if(this.$store.state.user){
        return this.$store.state.user.role;
      }else{
        return null;
      }
    }
  },
  created() {
    if (this.authenticated) {
      if(this.userRole === 'user'){
        this.$router.push({ name: 'calculator' }).catch(()=>{});
      } else {
        this.$router.push({ name: 'dashboard' }).catch(()=>{});
      }
    }
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    reInit() {
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    Login(){
      if (this.$refs.validate.validate()) {
        AuthService.logIn({
          email: this.email,
          password: this.password
        }).then(res => {
          if(res.status === 200){
            StorageService.setStorage('token', res.data.accessToken);
            this.$store.state.authenticated = true;
            this.$store.state.user = {
              email: res.data.email,
              id: res.data.id,
              receiver: res.data.receiver,
              name: res.data.username,
              role: res.data.role,
              identify: res.data.identify,
              contactTextE: res.data.contactTextE,
              contactTextF: res.data.contactTextF
            }
            switch (res.data.role) {
              case 'admin':
                this.$router.push({ name: 'dashboard' }).catch(()=>{});
                break;
              case 'company':
                this.$router.push({ name: 'dashboard' }).catch(()=>{});
                break;
              default:
                this.$router.push({ name: 'calculator' }).catch(()=>{});
                break;
            }
          } else {
            this.errorValue = res.data.message;
            this.dismissCountDown = 5
          }

        })
      }
    },

    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
.error-alert {
    position: absolute;
    top: 0;
    right: 0;
    background: #de5228;
    color: white;
    border-color: #d8ac2f;
    padding: 20px 30px;
    width: 300px;
}
</style>
