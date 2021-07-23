<template>
  <div class="pdf-value">
    <h4 class="py-0 text-left">
      <translate>value</translate>
    </h4>
    <h2 class="text-left py-2 font-weight-bold">{{ value.value }} €</h2>
    <div class="text-left">
      <div class="custom-input position-relative value-disable">
        <div class="position-absolute slider-left-1">
          <p>{{ value.min }}€</p>
        </div>
        <div class="position-absolute slider-right-1">
          <p>{{ value.max }}€</p>
        </div>
        <div class="position-absolute slider-left">
          <translate>min</translate>
        </div>
        <div class="position-absolute slider-right">
          <translate>max</translate>
        </div>
        <VueSimpleRangeSlider
          :min="value.min"
          :max="value.max"
          :disabled="true"
          v-model="value.value"
          barColor="#4d4d4d"
          activeBarColor="#161616"
        />
      </div>
      <b-row class="custom-input mt-5 mb-4">
        <b-col md="12">
          <strong><translate>property</translate>: </strong>
          {{ query.street }} ( {{ query.sqm }}m<sup>2</sup> )
        </b-col>
      </b-row>
      <b-row class="custom-input mt-5 mb-4">
        <b-col md="8" sm="8" cols="8" class="mt-4 font-weight-black">
          <translate>pridictionary</translate>
        </b-col>
        <b-col md="4" sm="4" cols="4" class="text-right mt-4">
          <p class="m-0">
            <span class="text-success">⚫</span>
            <span class="text-dark font-weight-bolder">{{ value.status }}</span>
          </p>
        </b-col>
      </b-row>
      <hr class="hr" />
      <b-row class="custom-input mb-4">
        <b-col md="8" sm="8" cols="8" class="font-weight-black">
          <translate>squaremeter</translate>
        </b-col>
        <b-col md="4" sm="4" cols="4" class="text-right">
          <p class="m-0">
            <span class="text-dark font-weight-bolder">{{ value.avSqm }}</span
            ><strong>m<sup>2</sup></strong>
          </p>
        </b-col>
        <b-col md="8" sm="8" cols="8" class="mt-3">
          <translate>price per squaremeter</translate>
        </b-col>
        <b-col md="4" sm="4" cols="4" class="text-right mt-3">
          <p class="m-0">
            <span class="text-dark"
              >€ {{ Math.floor(value.value / value.avSqm) }}</span
            >
          </p>
        </b-col>
      </b-row>
      <hr class="hr" />
      <b-row class="custom-input mb-4">
        <b-col md="8" sm="8" cols="8" class="font-weight-black">
          <translate>estimated time for sale</translate>
        </b-col>
        <b-col md="4" sm="4" cols="4" class="text-right">
          <p class="m-0">
            <span class="text-dark"
              >{{ value.time }} <translate>day</translate></span
            >
          </p>
        </b-col>
      </b-row>
      <b-row class="custom-input mb-4" v-if="value.soldmax">
        <b-col md="8" sm="8" cols="8" class="font-weight-black">
          <translate>highest sold</translate>
        </b-col>
        <b-col md="4" sm="4" cols="4" class="text-right">
          <p class="m-0">
            <span class="text-dark">€ {{ value.soldmax }}</span>
          </p>
        </b-col>
      </b-row>
      <b-row class="custom-input mb-4" v-if="value.soldmin">
        <b-col md="8" sm="8" cols="8" class="font-weight-black">
          <translate>lowest sold</translate>
        </b-col>
        <b-col md="4" sm="4" cols="4" class="text-right">
          <p class="m-0">
            <span class="text-dark">€ {{ value.soldmin }}</span>
          </p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import VueSimpleRangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/dist/vueSimpleRangeSlider.css";

export default {
  components: {
    VueSimpleRangeSlider,
  },
  props: {
    value: Object,
    query: Object,
    status: Boolean,
  },
  mounted() {
    console.log(this.value);
  },
};
</script>
