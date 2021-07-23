<template>
  <div class="custom-ui-option">
    <b-button variant="primary" class="mb-3" @click="changeUi">Save change</b-button>
    <b-row class="m-0">
      <b-col md="12" sm="12" cols="12" lg="6" class="mb-3 card pt-4">
        <b-row>
          <b-col md="6" cols="12" sm="6">
            <div class="custom-fieldset">
              <fieldset>
                <legend><h5>Card panel</h5></legend>
                  <chrome-picker class="mx-auto mb-0 w-100" v-model="cardBackCol" @input="(e) => updateColor(e, 'card')"></chrome-picker>
              </fieldset>
            </div>
          </b-col>
          <b-col md="6" cols="12" sm="6">
            <div class="custom-fieldset">
              <fieldset>
                <legend><h5>Label letter</h5></legend>
                  <chrome-picker class="mx-auto mb-0 w-100" v-model="labelCol" @input="(e) => updateColor(e, 'label')"></chrome-picker>
              </fieldset>
            </div>
          </b-col>
          <b-col md="6" cols="12" sm="6">
            <div class="custom-fieldset">
              <fieldset>
                <legend><h5>Header letter</h5></legend>
                <chrome-picker class="mx-auto mb-0 w-100" v-model="headerCol" @input="(e) => updateColor(e, 'header')"></chrome-picker>
                  <label class="fsize-1 mb-0 mt-3"><strong>Header Text</strong></label>
                <v-text-field v-model="headerText" class="mt-0 pt-0">{{headerText}}</v-text-field>
              </fieldset>
            </div>
          </b-col>
          <b-col md="6" cols="12" sm="6">
            <div class="custom-fieldset">
              <fieldset>
                <legend class="mb-0"><h5>Normal Font</h5></legend>
                <v-select
                  :items="fonts"
                  v-model="normalFont"
                  class="pt-0"
                >
                  <template #item="{item}">
                    <span :style="'font-family: ' + item.value"> 
                        {{item.text}}</span>
                  </template>
                </v-select>
              </fieldset>
            </div>
            <div class="custom-fieldset">
              <fieldset>
                <legend class="mb-0"><h5>Label Font</h5></legend>
                <v-select
                  :items="fonts"
                  v-model="labelFont"
                  class="pt-0"
                >
                  <template #item="{item}">
                    <span :style="'font-family: ' + item.value"> 
                        {{item.text}}</span>
                  </template>
                </v-select>
              </fieldset>
            </div>
            <div class="custom-fieldset">
              <fieldset>
                <legend class="mb-0"><h5>Skip button</h5></legend>
                <div class="flex">
                  <v-checkbox
                    v-model="skipbutton"
                  >
                  </v-checkbox>
                    <v-btn
                        class=" ml-0"
                        color="white"
                        x-large
                      >
                      <span class=" text-transform-none" >Skip to next step <i class='fas fa-long-arrow-alt-right'></i></span>
                    </v-btn>
                </div>
              </fieldset> 
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <div class="custom-fieldset">
              <fieldset>
                <legend><h5>Pop Up button</h5></legend>
                <b-row>
                  <b-col md="6">
                    <label class="fsize-1 mb-0"><strong>Text  </strong></label>
                    <v-text-field v-model="popupText" class="mt-0 pt-0">{{popupText}}</v-text-field>
                  </b-col>
                  <b-col md="6">
                    <chrome-picker class="mx-auto mb-0 w-100" v-model="popupCol" @input="(e) => updateColor(e, 'popupCol')"></chrome-picker> 
                  </b-col>
                </b-row>
              </fieldset>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="12" sm="12" cols="12" lg="6"  :style="normalFonts">
        <div class="cover position-relative">
          <button class="calculator-popup-button" :style="popupColor">{{popupText}}</button>
          <div class="cover-caption">
            <div class="container">
              <b-row>
                <b-col xl="7" lg="8" md="9" sm="10" cols="10" class="mx-auto text-center custom-user-card p-4" :style="cardBack">
                  <h2 class="text-left py-2">{{headerText}}</h2>
                  <!-- <h5 class="py-0 text-left">Fill in your house details</h5> -->
                  <v-form ref="validate" lazy-validation>
                    <div class="px-2 text-left">
                      <div class="custom-input">
                        <label class="bebasNeue  fsize-1 mb-0" :style="letterCol"><strong>Street Address</strong></label>
                        <v-text-field value="" class="mt-0"></v-text-field>
                      </div>
                      <div class="custom-input">
                        <label class="bebasNeue fsize-1" :style="letterCol"><strong>type</strong></label>
                        <div class="building-type row m-0">
                          <b-col :class="item.value === buildingType ? 'building-item active' : 'building-item'" lg="3" md="3" sm="3" cols="6" mx="6" v-for="item in buildingItems" :key="item.value">
                              <b-img :src="getIconUrl(item.img)" alt=""></b-img>
                            <div class="item-text">
                              {{item.text}}
                            </div>
                          </b-col>
                        </div>
                      </div>
                      <div class="custom-input mt-3">
                        <label class="bebasNeue fsize-1" :style="letterCol"><strong>house size [sqm]</strong></label>
                        <b-row>
                          <b-col md="8" sm="8" cols="8" lg="8" class="position-relative mt-4">
                            <div class="position-absolute slider-left">
                              <p>10</p>
                            </div>
                            <div class="position-absolute slider-right">
                              <p>200</p>
                            </div>
                           <vue-slider ref="slider" v-model="slider.value" v-bind="slider"></vue-slider>
                          </b-col>
                          <b-col md="4" sm="4" cols="4" lg="4" class="row">
                            <label class="form-label bebasNeue" for="rangText">160<strong>m<sup>2</sup></strong></label>
                          </b-col>
                        </b-row> 
                      </div>
                      <div class="custom-input">
                        <label class="bebasNeue fsize-1" :style="letterCol"><strong>House Condition</strong></label>
                        <div class="option-container row m-0">
                          <b-col :class="item.value === condition ? 'option-item active' : 'option-item'" lg="3" md="3" sm="3" cols="3" mx="3" v-for="item in conditions" :key="item.value">
                            <div class="item-text">
                              {{item.text}}
                            </div>
                          </b-col>
                        </div>
                      </div>
                      <div class="custom-input mt-3">
                        <b-row>
                          <b-col md="6">
                            <label class="bebasNeue fsize-1" :style="letterCol"><strong>Construction year</strong></label>
                            <v-text-field value="1993" type="number" class="mt-0"></v-text-field>
                          </b-col>
                          <b-col md="6">
                            <label class="bebasNeue fsize-1" :style="letterCol"><strong>Plot</strong></label>
                            <div class="option-container row m-0">
                              <b-col :class="item.value === plot ? 'option-item active' : 'option-item'" lg="6" md="6" sm="6" cols="6" mx="6" v-for="item in plots" :key="item.value">
                                <div class="item-text">
                                  {{item.text}}
                                </div>
                              </b-col>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="custom-input">
                        <label class="bebasNeue fsize-1" :style="letterCol"><strong>Numbers of rooms</strong></label>
                        <div class="option-container position-relative">
                          <div class="minus-icon">
                          <i class='fas fa-minus-circle grey--text'></i>
                          </div>
                          <div class="plus-icon">
                          <i class='fas fa-plus-circle grey--text'></i>
                          </div>
                          <div class="text-center p-2">10</div>
                        </div>
                      </div>
                      <v-btn
                        class="user-button w-70 mt-4 ml-0"
                        color="#161616"
                        x-large
                      >
                        <span class="text-white text-transform-none fsize-2" >Show Values <i class='fas fa-long-arrow-alt-right'></i></span>
                      </v-btn>
                    </div>
                  </v-form>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </b-row> 
  </div>
</template>

<script>
  // import VueSimpleRangeSlider from 'vue-simple-range-slider'
  import { Chrome } from "vue-color"
  import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css' 
  import vueSlider from "vue-slider-component";

  import * as AdminService from '@/services/admin.service'
  import * as UserService from '@/services/user.service'
  let defaultProps = {
    hex: "#194d33e6",
    hsl: {
      h: 150,
      s: 0.5,
      l: 0.2,
      a: 0.9
    },
    hsv: {
      h: 150,
      s: 0.66,
      v: 0.3,
      a: 0.9
    },
    rgba: {
      r: 25,
      g: 77,
      b: 51,
      a: 0.9
    },
    a: 0.9
  }
  export default {
    components: {
      // VueSimpleRangeSlider,
      vueSlider,
      "chrome-picker": Chrome,
    },
    // props: {
    //   backgroundImg: String,

    // },
    computed: {
      backgroundImg(){
        return `background: url("${this.backImgUrl}")`
      },
      cardBack() {
        return `background: ${this.cardBackCol}; color: ${this.headerCol};`
      },
      letterCol() {
        return `color: ${this.labelCol}; font-family: ${this.labelFont}`
      },
      normalFonts() {
        return `font-family: ${this.normalFont}`
      },
      popupColor() {
        return `background: ${this.popupCol}`
      }
    },
    data: () => ({
      buildingItems: [
        {
          img: 'apartment',
          text: 'Apartment',
          value: 'apartment',
        },
        {
          img: 'row',
          text: 'Row house',
          value: 'row-house',
        },
        {
          img: 'private',
          text: 'Private house',
          value: 'private-house',
        },
        {
          img: 'detached',
          text: 'Semidetached house',
          value: 'semidetached-house',
        },
      ],
      conditions: [
        {
          text: 'Erinom',
          value: 'Erinom'
        },
        {
          text: 'Hyvä',
          value: 'Hyvä'
        },
        {
          text: 'Tyydyttävä',
          value: 'Tyydyttävä'
        },
        {
          text: 'Huono',
          value: 'Huono'
        },
      ],
      plots: [
        {
          text: 'Oma',
          value: 'Oma'
        },
        {
          text: 'Vuokra',
          value: 'Vuokra'
        },
      ],
      backgroundImgs: [
        'background1', 'background2', 'background3', 'background5', 'background6'
      ],
      backImgUrl: 'img/background6.bcc39fa0.jpg',
      fonts: [
        {
          text: 'FuturaStd-Light',
          value: 'FuturaStd'
        },
        {
          text: 'BebasNeue-Regular',
          value: 'BebasNeue'
        },
        {
          text: 'Cursive',
          value: 'cursive'
        },
        {
          text: 'Monospace',
          value: 'monospace'
        },
        {
          text: 'Sans-Serif',
          value: 'sans-serif'
        }
      ],
      normalFont: 'FuturaStd',
      labelFont: 'BebasNeue',
      colors: defaultProps,
      cardBackCol: '#ffffffe6',
      headerCol: '#161616',
      headerText: 'Calculator',
      labelCol: '#161616',
      backImg: 'background6',
      buildingType: 'apartment',
      condition: 'Erinom',
      plot: 'Oma',
      file: '',
      slider: {
        value: 160,
        width: "auto",
        height: 2.5,
        direction: "horizontal",
        dotSize: 14,
        eventType: "auto",
        min: 10,
        max: 200,
        interval: 1,
        startAnimation: false,
        tooltipMerge: false,
        processDragable: false,
        minRange: null,
        maxRange: null,
        fixed: false,
        debug: process && process.env && process.env.NODE_ENV !== "production",
        disabled: false,
        show: true,
        enableCross: true,
        realTime: false,
        tooltip: "",
        clickable: true,
        tooltipDir: "top",
        piecewise: false,
        lazy: false,
        useKeyboard: true,
        reverse: false,
        speed: 0.5,
        focusStyle: null,
        bgStyle: null,
        sliderStyle: null,
        tooltipStyle: null,
        processStyle: null,
        piecewiseStyle: null,
        disabledStyle: null
      },
      popupText: 'Value Estimator',
      popupCol: '#161616',
      skipbutton: true
    }),
    methods: {
      getIconUrl(pet) {
        var images = require.context('@/assets/images/icons/', false, /\.png$/)
        return images('./' + pet + ".png")
      },
      getBackgroundUrl(pet) {
        var images = require.context('@/assets/images/background/', false, /\.jpg$/)
        return images('./' + pet + ".jpg")
      },
      updateColor(e, type){
        switch (type) {
          case 'card':
            this.cardBackCol = e.hex8 
            break;
          case 'header':
            this.headerCol = e.hex8 
            break;
          case 'label':
            this.labelCol = e.hex8 
            break;
          case 'popupCol':
            this.popupCol = e.hex8
            break;

          default:
            break;
        }
      },
      changeUi() {
        AdminService.customeUI({
          backImg: this.backImgUrl,
          normalFont: this.normalFont,
          labelFont: this.labelFont,
          cardBackCol: this.cardBackCol,
          headerCol: this.headerCol,
          labelCol: this.labelCol,
          popupText: this.popupText,
          popupCol: this.popupCol,
          headerText: this.headerText,
          skipButton: this.skipbutton
        }).then(res => {
          console.log(res)
        })
      },

      imgSelected(event){
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        const file = event.target.files[0]
        if(!allowedTypes.includes(file.type)){
          alert('Only images are required!')
        }else if(file.size>500000){
          alert('Too large, max size allowed: 500KB')
        }else{
          const formData = new FormData()
          formData.append('background', file)
          AdminService.imageUpload(formData).then(res => {
            this.backImgUrl = res.data.url
          })
        }
      }
    },
    mounted() {
      const company = this.$store.state.user.id
      UserService.getCustomUi({company}).then(res => {
        if(res.data.ui) {
          this.normalFont = res.data.ui.normalFont,
          this.labelFont = res.data.ui.labelFont,
          this.cardBackCol = res.data.ui.cardBackCol,
          this.headerCol =  res.data.ui.headerCol,
          this.labelCol = res.data.ui.labelCol,
          // this.backImgUrl = res.data.ui.backgroundImg
          this.popupText = res.data.ui.popupText 
          this.popupCol = res.data.ui.popupCol 
          this.headerText = res.data.ui.headerText
          this.skipbutton = res.data.ui.skipButton 
        }else if(status === 401){
          this.$router.push({name: 'calculator'}).catch(()=>{})
        }
      })
    }
    
  }
</script>

<style lang="scss">
.custom-ui-option {
  .custom-fieldset {
    margin-bottom: 20px;
    fieldset {
      padding: 10px;
      border-width: 2px;
      border-style: solid;
      border-color: #ff8100;
      border-radius: 3px;
      border-image: initial;
      legend {
        color: inherit;
        display: table;
        max-width: 100%;
        white-space: normal;
        margin-left: 30px;
        width: auto;
      }
      .v-input {
        flex: initial !important;
      }
      .background-bundle {
        width: 20%;
        height: 70px;
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 3px;
        &:hover {
          border: 2px solid #ff8100;
          border-radius: 3px;
          box-shadow: 3px 0px 8px 1px #ff8100;
        }
        &.active {
          border: 2px solid #ff8100;
          border-radius: 3px;
          box-shadow: 3px 0px 8px 1px #ff8100;
        }
      }
    } 
  }
  .cover {
    border: 2px solid #ff8100;
    border-radius: 4px;
  }

}
</style>