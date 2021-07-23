<template>
    <div class="cover">
        <b-btn
            variant="default"
            class="language-button"
            size="sm"
            @click="changeLang(lang)"
        >
            En/Fi</b-btn
        >
        <div class="cover-caption" :style="normalFonts">
            <!-- <b-button variant="success" size="lg" class="ml-3 user-login" @click="login"><i class="pe-7s-users"></i> Login</b-button> -->
            <div class="container">
                <div ref="calculator">
                    <b-row>
                        <b-col
                            xl="5"
                            lg="6"
                            md="8"
                            sm="10"
                            cols="auto"
                            class="mx-auto text-center custom-user-card p-4"
                            :style="cardBack"
                        >
                            <!-- <div class="close-frame" @click="closeCalculator">
              <i class="pe-7s-close fsize-3"></i>
            </div> -->
                            <h3 class="text-left py-2">{{ headerText }}</h3>
                            <!-- <h5 class="py-0 text-left">Fill in your house details</h5> -->
                            <v-form ref="validate" lazy-validation>
                                <div class="px-2 text-left">
                                    <div class="custom-input">
                                        <label
                                            class="bebasNeue  fsize-2 mb-0"
                                            :style="letterCol"
                                            ><strong
                                                ><translate
                                                    >street</translate
                                                ></strong
                                            ></label
                                        >
                                        <div class="auto-complete">
                                            <vue-google-autocomplete
                                                id="map"
                                                ref="autocomplete"
                                                classname="form-control auto-street"
                                                v-model="street"
                                                placeholder=""
                                                v-on:placechanged="
                                                    getAddressData
                                                "
                                                v-on:change="change"
                                                :country="['fi']"
                                            >
                                            </vue-google-autocomplete>
                                            <div
                                                class="auto-code"
                                                v-if="street"
                                            >
                                                {{ city }},<br />
                                                {{ zip }}
                                            </div>
                                        </div>
                                        <div
                                            class="v-text-field__details"
                                            v-if="validStreet"
                                        >
                                            <div
                                                class="v-messages theme--light error--text"
                                            >
                                                <div
                                                    class="v-messages__wrapper"
                                                >
                                                    <div
                                                        class="v-messages__message"
                                                    >
                                                        <translate
                                                            >street
                                                            required</translate
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="custom-input mt-2">
                                        <label
                                            class="bebasNeue fsize-2"
                                            :style="letterCol"
                                            ><strong
                                                ><translate
                                                    >type</translate
                                                ></strong
                                            ></label
                                        >
                                        <div class="building-type row m-0">
                                            <b-col
                                                :class="
                                                    item.value === buildingType
                                                        ? 'building-item active'
                                                        : 'building-item'
                                                "
                                                lg="3"
                                                md="3"
                                                sm="3"
                                                cols="3"
                                                v-for="item in buildingItems"
                                                :key="item.value"
                                                @click="selectType(item.value)"
                                            >
                                                <b-img
                                                    :src="getImgUrl(item.img)"
                                                    alt=""
                                                ></b-img>
                                                <div class="item-text">
                                                    <translate>{{
                                                        item.text
                                                    }}</translate>
                                                </div>
                                            </b-col>
                                        </div>
                                    </div>
                                    <div class="custom-input mt-2">
                                        <label
                                            class="bebasNeue fsize-2"
                                            :style="letterCol"
                                            ><strong
                                                ><translate
                                                    >house size</translate
                                                >
                                                [m<sup>2</sup>]</strong
                                            ></label
                                        >
                                        <b-row>
                                            <b-col
                                                md="8"
                                                sm="8"
                                                cols="12"
                                                lg="8"
                                                class="position-relative mt-4"
                                            >
                                                <div
                                                    class="position-absolute slider-left"
                                                >
                                                    <p>10</p>
                                                </div>
                                                <div
                                                    class="position-absolute slider-right"
                                                >
                                                    <p>200</p>
                                                </div>
                                                <vue-slider
                                                    ref="slider"
                                                    v-model="sqm"
                                                    v-bind="slider"
                                                ></vue-slider>
                                            </b-col>
                                            <b-col
                                                md="4"
                                                sm="4"
                                                cols="12"
                                                lg="4"
                                            >
                                                <b-row class="px-4">
                                                    <b-col
                                                        md="8"
                                                        sm="8"
                                                        cols="3"
                                                        lg="8"
                                                        class="mr-0 pr-0 pl-0"
                                                    >
                                                        <v-text-field
                                                            v-model="sqm"
                                                            type="number"
                                                            id="rangText"
                                                            placeholder=""
                                                            class="mt-0 pt-0"
                                                            min="10"
                                                            max="200"
                                                        ></v-text-field>
                                                    </b-col>
                                                    <b-col
                                                        md="3"
                                                        sm="4"
                                                        cols="4"
                                                        lg="4"
                                                    >
                                                        <label
                                                            class="form-label bebasNeue mt-3 px-0"
                                                            for="rangText"
                                                            ><strong
                                                                >m<sup
                                                                    >2</sup
                                                                ></strong
                                                            ></label
                                                        >
                                                    </b-col>
                                                </b-row>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="custom-input">
                                        <label
                                            class="bebasNeue fsize-2"
                                            :style="letterCol"
                                            ><strong
                                                ><translate
                                                    >house condition</translate
                                                ></strong
                                            ></label
                                        >
                                        <div class="option-container row m-0">
                                            <b-col
                                                :class="
                                                    item.value === condition
                                                        ? 'option-item active'
                                                        : 'option-item'
                                                "
                                                lg="3"
                                                md="3"
                                                sm="3"
                                                cols="3"
                                                mx="3"
                                                v-for="item in conditions"
                                                :key="item.value"
                                                @click="
                                                    houseCondition(item.value)
                                                "
                                            >
                                                <div class="item-text">
                                                    <translate>{{
                                                        item.text
                                                    }}</translate>
                                                </div>
                                            </b-col>
                                        </div>
                                    </div>
                                    <div class="custom-input mt-2">
                                        <b-row>
                                            <b-col md="6">
                                                <label
                                                    class="bebasNeue fsize-2"
                                                    :style="letterCol"
                                                    ><strong
                                                        ><translate
                                                            >construction
                                                            year</translate
                                                        ></strong
                                                    ></label
                                                >
                                                <v-text-field
                                                    :rules="rules.builtYear"
                                                    v-model="builtYear"
                                                    type="number"
                                                    placeholder="1990"
                                                    class="mt-0 pt-0"
                                                ></v-text-field>
                                            </b-col>
                                            <b-col md="6">
                                                <label class="bebasNeue fsize-2"
                                                    ><strong
                                                        ><translate
                                                            >plot</translate
                                                        ></strong
                                                    ></label
                                                >
                                                <div
                                                    class="option-container row m-0"
                                                >
                                                    <b-col
                                                        :class="
                                                            item.value === plot
                                                                ? 'option-item active'
                                                                : 'option-item'
                                                        "
                                                        lg="6"
                                                        md="6"
                                                        sm="6"
                                                        cols="6"
                                                        mx="6"
                                                        v-for="item in plots"
                                                        :key="item.value"
                                                        @click="
                                                            selectPlot(
                                                                item.value
                                                            )
                                                        "
                                                    >
                                                        <div class="item-text">
                                                            <translate>{{
                                                                item.text
                                                            }}</translate>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="custom-input mt-2">
                                        <label
                                            class="bebasNeue fsize-2"
                                            :style="letterCol"
                                            ><strong
                                                ><translate
                                                    >numbers of rooms</translate
                                                ></strong
                                            ></label
                                        >
                                        <div
                                            class="option-container position-relative"
                                        >
                                            <div
                                                class="minus-icon"
                                                @click="minusNumber"
                                            >
                                                <i
                                                    class="fas fa-minus-circle grey--text"
                                                ></i>
                                            </div>
                                            <div
                                                class="plus-icon"
                                                @click="plusNumber"
                                            >
                                                <i
                                                    class="fas fa-plus-circle grey--text"
                                                ></i>
                                            </div>
                                            <div class="text-center p-2">
                                                {{ roomNumber }}
                                            </div>
                                        </div>
                                    </div>
                                    <v-btn
                                        class="user-button w-70 mt-3 ml-0 w-100"
                                        color="#161616"
                                        x-large
                                        @click="showValue"
                                    >
                                        <span
                                            class="text-white text-transform-none text--white"
                                            ><translate>show value</translate>
                                            <i
                                                class="fas fa-long-arrow-alt-right"
                                            ></i
                                        ></span>
                                    </v-btn>
                                </div>
                            </v-form>
                        </b-col>
                    </b-row>
                </div>
                <!-- <div class="widget-opener widget-opener-6" id="view-value-estimator"  ref="calButton" @click="openCalculator">
          <div class="widget-button-style-6" id="js-btn-sidebar">
            <div class="widget-button-text-style-6 widget-main-color">
              Value Estimator
            </div>
          </div>
        </div> -->
            </div>
        </div>
    </div>
</template>

<script>
// import * as AuthService from '@/services/auth.service'
import * as UserService from "@/services/user.service";
import VueGoogleAutocomplete from "vue-google-autocomplete";
// import der from 'vue-simple-range-slider'
import vueSlider from "vue-slider-component";
import "vue-simple-range-slider/dist/vueSimpleRangeSlider.css";

const style = {
    normalFont: "FuturaStd",
    labelFont: "BebasNeue",
    cardBackCol: "#ffffffe6",
    headerCol: "#161616",
    labelCol: "#161616",
    headerText: "Calculator",
    backImg: "img/background6.bcc39fa0.jpg"
};

export default {
    components: {
        // VueSimpleRangeSlider,
        VueGoogleAutocomplete,
        vueSlider
    },

    computed: {
        backgroundImg() {
            return `background: url("${this.backImg}")`;
        },
        cardBack() {
            return `background: ${this.cardBackCol}; color: ${this.headerCol};`;
        },
        letterCol() {
            return `color: ${this.labelCol}; font-family: ${this.labelFont}`;
        },
        normalFonts() {
            return `font-family: ${this.normalFont}`;
        }
    },

    data: () => ({
        buildingItems: [
            {
                img: "apartment",
                text: "block of flats",
                value: "Kerrostalo"
            },
            {
                img: "row",
                text: "terraced house",
                value: "Rivitalo"
            },
            {
                img: "private",
                text: "town house",
                value: "Omakotitalo"
            },
            {
                img: "detached",
                text: "paritalo",
                value: "Paritalo"
            }
        ],
        conditions: [
            {
                text: "excellent",
                value: "Erinomainen"
            },
            {
                text: "good",
                value: "Hyvä"
            },
            {
                text: "satisfying",
                value: "Tyydyttävä"
            },
            {
                text: "bad",
                value: "Huono"
            }
        ],
        plots: [
            {
                text: "own",
                value: "Oma"
            },
            {
                text: "rental",
                value: "Vuokra"
            }
        ],
        slider: {
            value: 10,
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
            debug:
                process && process.env && process.env.NODE_ENV !== "production",
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
        buildingType: "Kerrostalo",
        rules: {
            builtYear: [
                value => !!value || "Construction Year is required",
                value => value > 1801 || "Please input correct year",
                value =>
                    value < new Date().getFullYear() + 1 ||
                    "Please input correct year"
            ]
        },
        street: "",
        validStreet: false,
        sqm: 100,
        condition: "Erinomainen",
        builtYear: "",
        plot: "Oma",
        zip: "",
        city: "",
        roomNumber: 2,
        normalFont: "",
        labelFont: "",
        cardBackCol: "",
        headerText: "Calculator",
        headerCol: "",
        labelCol: "",
        backImg: "",
        lang: "fi"
    }),
    methods: {
        getImgUrl(pet) {
            var images = require.context(
                "@/assets/images/icons/",
                false,
                /\.png$/
            );
            return images("./" + pet + ".png");
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
            if (this.roomNumber === 1) {
                this.roomNumber === 1;
            } else {
                this.roomNumber -= 1;
            }
        },
        plusNumber() {
            this.roomNumber += 1;
        },
        showValue() {
            if (this.street === "") {
                this.validStreet = true;
            } else if (this.$refs.validate.validate()) {
                let query = {
                    street: this.street,
                    zip: this.zip,
                    city: this.city,
                    buildingType: this.buildingType,
                    sqm: this.sqm,
                    condition: this.condition,
                    builtYear: this.builtYear,
                    plot: this.plot,
                    roomNumber: this.roomNumber
                };
                // this.$store.state.query = query
                this.$router
                    .push({
                        name: "sendEmail",
                        params: { query: query, detail: false }
                    })
                    .catch(() => {});
            }
        },
        getAddressData(addressData) {
            if (addressData.postal_code) {
                this.zip = addressData.postal_code;
            }
            if (addressData.street_number) {
                this.validStreet = false;
                this.$el.querySelector("#map").value =
                    addressData.route + " " + addressData.street_number;
                this.street =
                    addressData.route + " " + addressData.street_number;
            } else {
                this.validStreet = true;
                this.$el.querySelector("#map").value = addressData.route + " ";
                this.street = addressData.route;
            }
            if(addressData.locality)
            this.city = addressData.locality;
        },
        change(e) {
            this.street = e;
        },
        openCalculator() {
            this.$refs["calculator"].style.display = "block";
            this.$refs["calButton"].style.display = "none";
        },
        closeCalculator() {
            this.$refs["calculator"].style.display = "none";
            this.$refs["calButton"].style.display = "flex";
        },
        changeLang(lang) {
            if (lang === "en") {
                this.$language.current = "en_EN";
                this.lang = "fi";
            } else {
                this.$language.current = "fi_FI";
                this.lang = "en";
            }
        }
    },
    mounted() {
        const company = this.$store.state.toCompany;
        UserService.getCustomUi({ company }).then(res => {
            if (res.data.ui) {
                if (res.data.ui) {
                    (this.normalFont = res.data.ui.normalFont),
                        (this.labelFont = res.data.ui.labelFont),
                        (this.cardBackCol = res.data.ui.cardBackCol),
                        (this.headerCol = res.data.ui.headerCol),
                        (this.labelCol = res.data.ui.labelCol),
                        (this.headerText = res.data.ui.headerText),
                        (this.backImg = res.data.ui.backgroundImg);
                }
            } else {
                (this.normalFont = style.normalFont),
                    (this.labelFont = style.labelFont),
                    (this.cardBackCol = style.cardBackCol),
                    (this.headerCol = style.headerCol),
                    (this.labelCol = style.labelCol),
                    (this.headerText = style.headerText),
                    (this.backImg = style.backImg);
            }
        });
    }
};
</script>
