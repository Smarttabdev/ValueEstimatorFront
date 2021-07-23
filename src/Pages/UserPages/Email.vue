<template>
  <div class="cover">
    <!-- <b-button variant="success" size="lg" class="ml-3 user-login" @click="login"><i class="pe-7s-users"></i> Login</b-button> -->
    <b-btn variant="success" class="language-button" size="sm" @click="changeLang(lang)"><i class="pe-7s-shuffle"></i> en/fi</b-btn>
    <div class="cover-caption my-auto"  :style="normalFonts">
      <div class="container">
        <b-row>
          <b-col xl="5" lg="6" md="8" sm="10" cols="auto" class="mx-auto text-center custom-user-card p-4" :style="cardBack">
            <h1 class="text-left py-2"><translate>send quote</translate></h1>
            <v-form ref="validate" lazy-validation>
              <div class="px-2 text-left">
                <div class="custom-input">
                  <label class="bebasNeue  fsize-2 mb-0" :style="letterCol"><strong><translate>name</translate></strong><span class="text-danger">*</span></label>
                  <v-text-field v-model="name" :rules="rules.name" placeholder="Name: Jhane Doe" class="mt-0"></v-text-field>
                </div>
                <div class="custom-input">
                  <label class="bebasNeue  fsize-2 mb-0" :style="letterCol"><strong><translate>email</translate></strong><span class="text-danger">*</span></label>
                  <v-text-field v-model="email" :rules="rules.email" placeholder="Email: jane.doe@example.com" class="mt-0"></v-text-field>
                </div>
                <div class="custom-input">
                  <label class="bebasNeue  fsize-2 mb-0" :style="letterCol"><strong><translate>phone</translate></strong><span class="text-danger">*</span></label>
                  <v-text-field v-model="phone" :rules="rules.phone" placeholder="Like: 0452957554" class="mt-0"></v-text-field>
                </div>
                <div class='custom-input'>
                  <v-checkbox
                    color= "indigo darken-3"
                    v-model="professional"
                    hide-details
                  >
                    <template v-slot:label>
                      <translate>professional give a quote</translate>
                    </template>
                  </v-checkbox>
                  <v-checkbox
                    color= "indigo darken-3"
                    v-model="accept"
                    hide-details
                    @change="termChange"
                  >
                    <template v-slot:label>
                      <translate>accept terms</translate>
                    </template>
                  </v-checkbox>
                  <div class="v-text-field__details" v-if="termShow">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message">You have to accept terms</div>
                      </div>
                    </div>
                  </div>
                </div>
                <v-btn
                  class="user-button mt-4 w-100 ml-0"
                  color="#161616"
                  x-large
                  @click="requestValue"
                >
                  <span class="text-white text-transform-none text--white" ><translate>request value proposal</translate> <i class='fas fa-long-arrow-alt-right'></i></span>
                </v-btn>
                <v-btn
                v-if="!$route.params.detail && this.skipbutton"
                  class="user-button mt-4 w-100 ml-0"
                  color="white"
                  x-large
                  @click="skip"
                >
                  <span class=" text-transform-none" ><translate>skip to next step</translate> <i class='fas fa-long-arrow-alt-right'></i></span>
                </v-btn>
              </div>
            </v-form>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      class="error-alert"
    >
    {{errorValue}}
    </b-alert> -->
  </div>
</template>

<script>
import * as UserService from '@/services/user.service';
const style = {
    normalFont: 'FuturaStd',
    labelFont: 'BebasNeue',
    cardBackCol: '#ffffffe6',
    headerCol: '#161616',
    labelCol: '#161616',
    skipbutton: true
    // backImg: 'img/background6.bcc39fa0.jpg',
  }
export default {
  components: {
  },

  computed: {
    backgroundImg(){
      return `background: url("${this.backImg}")`
    },
    cardBack() {
      return `background: ${this.cardBackCol}; color: ${this.headerCol};`
    },
    letterCol() {
      return `color: ${this.labelCol}; font-family: ${this.labelFont}`
    },
    normalFonts() {
      return `font-family: ${this.normalFont}`
    }
  },

  data: () => ({
    rules: {
      name: [
        value => !!value || 'Name is required',
      ],
      email: [
        value => !!value || 'Email is required',
        value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid'
      ],
      phone: [
        value => !!value || 'Phone number is required',
        value => value.length >= 8 || "Valid phone number digits 8-12",
        value => value.length <= 12 || "Valid phone number digits 8-12"
      ] 
    },
    name: '',
    email: '',
    phone: '',
    professional: false,
    accept: false,
    query: {},
    // dismissSecs: 10,
    // dismissCountDown: 0,
    // errorValue: '',
    normalFont: '',
    labelFont: '',
    cardBackCol: '',
    headerCol: '',
    labelCol: '',
    backImg: '',
    lang: 'fi',
    skipbutton: true,
    termShow: false
  }),

  methods: {
    getImgUrl(pet) {
      var images = require.context('@/assets/images/icons/', false, /\.png$/)
      return images('./' + pet + ".png");
    },
    houseCondition(value) {
      this.condition = value;
    },
    selectPlot(value) {
      this.plot = value;
    },
    selectType(value) {
      this.buildingType = value;
    },
    minusNumber() {
      this.roomNumber -= 1;
    },
    plusNumber() {
      this.roomNumber += 1;
    },
    getValue(status) {
      this.query.name = this.name
      this.query.email = this.email
      this.query.phone = this.phone
      UserService.getValue({
        name: this.name,
        email: this.email,
        phone: this.phone,
        city: this.query.city,
        zip: this.query.zip,
        street: this.query.street,
        buildingType: this.query.buildingType,
        builtYear: this.query.builtYear,
        sqm: this.query.sqm,
        condition: this.query.condition,
        plot: this.query.plot,
        roomNumber: this.query.roomNumber,
        status: status,
        toCompany: this.$store.state.toCompany
      }).then(res => {
          this.$store.state.value = null;
        if(res.status === 200){
          this.$router.push({ name: 'value', params: {status: status, query: this.query, value: res.data}}).catch(()=>{})
          // this.$store.state.value = res.data
        } else{
          this.$router.push({ name: 'value', params: {status: status, query: this.query}}).catch(()=>{})
        }
      })
    },
    requestValue() {
      if (this.$refs.validate.validate()) {
        if(this.accept){
          this.getValue('lead')
        }else{
          console.log('object')
          this.termShow = true
        }
      }
    },
    skip() {
        this.getValue('valuation')
    },
    termChange(e){
      console.log(e)
      if(e)
      this.termShow = false
    },
    changeLang(lang){
      if(lang === 'en'){
        this.$language.current = "en_EN"
        this.lang = 'fi'
      }else{
        this.$language.current = "fi_FI"
        this.lang = 'en'
      }
    }
    // login() {
    //   this.$router.push({ name: 'login' }).catch(()=>{})
    // }
  },
  mounted() {
    const company = this.$store.state.toCompany
    UserService.getCustomUi({company}).then(res => {
      if(res.data.ui) {
        if(res.data.ui){
          this.normalFont = res.data.ui.normalFont,
          this.labelFont = res.data.ui.labelFont,
          this.cardBackCol = res.data.ui.cardBackCol,
          this.headerCol =  res.data.ui.headerCol,
          this.labelCol = res.data.ui.labelCol,
          this.backImg = res.data.ui.backgroundImg  
          this.skipbutton = res.data.ui.skipButton
        }
      }else{
          this.normalFont = style.normalFont,
            this.labelFont = style.labelFont,
            this.cardBackCol = style.cardBackCol,
            this.headerCol =  style.headerCol,
            this.labelCol = style.labelCol,
            this.backImg = style.backImg,
            this.skipbutton = style.skipButton
        }
    })
     
  },
  created(){
    if(this.$route.params.query){
      this.query = this.$route.params.query
    }else{
      this.$router.push({name: 'calculator'})
    }
  }
}
</script>
