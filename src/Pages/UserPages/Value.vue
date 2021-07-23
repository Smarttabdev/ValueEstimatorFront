<template>
  <div class="cover my-auto">
    <b-btn
      variant="success"
      class="language-button"
      size="sm"
      @click="changeLang(lang)"
      ><i class="pe-7s-shuffle"></i> en/fi</b-btn
    >
    <div class="cover-caption my-auto" :style="normalFonts">
      <div class="container">
        <b-row>
          <b-col
            v-if="!value.value"
            xl="5"
            lg="6"
            md="8"
            sm="10"
            cols="auto"
            class="mx-auto text-center custom-user-card p-4"
            :style="cardBack"
          >
            <h4 v-if="status === 'valuation'">
              Unfortunately we are not able to give an estimate based on your
              given information. Please leave us your contact details and we
              will send you a detailed valuation via email.
            </h4>
            <h4 v-if="status === 'lead'">
              {{
                $store.state.contactTextE
                  ? lang === "en"
                    ? $store.state.contactTextF
                    : $store.state.contactTextE
                  : lang === "fi"
                  ? "Antamiesi tietojen pohjalta järjestelmämme ei voinut antaa sinulle riittävän tarkkaa arvioita. Jätä kuitenkin yhteystietosi niin välittäjämme tekevät arvion ja toimittavat sen sähköpostiisi."
                  : "Unfortunately we are not able to give an estimate based on your given information. But we receive your request. We will email you a detailed evaluation."
              }}
            </h4>
            <div v-if="status === 'valuation'">
              <v-form ref="validate" lazy-validation>
                <div class="custom-input">
                  <label class="bebasNeue fsize-2 mb-0" :style="letterCol"
                    ><strong><translate>name</translate></strong
                    ><span class="text-danger">*</span></label
                  >
                  <v-text-field
                    v-model="name"
                    :rules="rules.name"
                    placeholder="Name: Jhane Doe"
                    class="mt-0"
                  ></v-text-field>
                </div>
                <div class="custom-input">
                  <label class="bebasNeue fsize-2 mb-0" :style="letterCol"
                    ><strong><translate>email</translate></strong
                    ><span class="text-danger">*</span></label
                  >
                  <v-text-field
                    v-model="email"
                    :rules="rules.email"
                    placeholder="Email: jane.doe@example.com"
                    class="mt-0"
                  ></v-text-field>
                </div>
                <div class="custom-input">
                  <label class="bebasNeue fsize-2 mb-0" :style="letterCol"
                    ><strong><translate>phone</translate></strong></label
                  >
                  <v-text-field
                    v-model="phone"
                    :rules="rules.phone"
                    placeholder="Like: 0452957554"
                    class="mt-0"
                  ></v-text-field>
                </div>
              </v-form>
            </div>
            <v-btn
              v-if="status === 'valuation'"
              class="user-button w-40 mt-4 ml-0"
              color="white"
              x-large
              @click="sendEmail"
            >
              <span class="text-transform-none">
                <translate>send</translate> </span
              ><span class="float-left"
                ><i class="fas fa-long-arrow-alt-right"></i
              ></span>
            </v-btn>
            <v-btn
              v-if="status === 'lead'"
              class="user-button w-40 mt-4 ml-0"
              color="white"
              x-large
              @click="back"
            >
              <span class="float-left"
                ><i class="fas fa-long-arrow-alt-left"></i></span
              ><span class="text-transform-none"
                ><translate>back</translate></span
              >
            </v-btn>
            <v-btn
              v-if="status === 'valuation'"
              class="user-button w-100 mt-4 ml-0"
              color="#161616"
              x-large
              @click="orderDetail"
            >
              <span class="text-white text-transform-none"
                >{{ query.email }}<translate>order a more detail</translate>
                <i class="fas fa-long-arrow-alt-right"></i
              ></span>
            </v-btn>
          </b-col>
          <b-col
            v-else
            xl="5"
            lg="6"
            md="8"
            sm="10"
            cols="auto"
            class="mx-auto text-center custom-user-card p-4"
            :style="cardBack"
          >
            <value-component :value="value" :query="query"></value-component>
            <div class="flex justify-content-between">
              <v-btn
                class="user-button w-40 mt-4 ml-0"
                color="white"
                x-large
                @click="back"
              >
                <span class="float-left"
                  ><i class="fas fa-long-arrow-alt-left"></i></span
                ><span class="text-transform-none">
                  <translate>back</translate></span
                >
              </v-btn>
              <v-btn
                class="user-button w-40 mt-4 ml-0 white--text"
                color="green"
                x-large
                @click="showProperties"
              >
                <span class="float-left"></span
                ><span class="text-transform-none">
                  <translate>show property</translate></span
                >
              </v-btn>
            </div>
            <v-btn
              v-if="status === 'valuation'"
              class="user-button w-100 mt-4 ml-0"
              color="#161616"
              x-large
              @click="orderDetail"
            >
              <span class="text-white text-transform-none"
                ><translate>order a more detail</translate>
                <i class="fas fa-long-arrow-alt-right"></i
              ></span>
            </v-btn>
            <v-btn
              class="user-button ml-0 float-right"
              color="#e2c600"
              @click="downloadPdf"
            >
              <i class="fas fa-cloud-download-alt"></i>
              <span class="text-white text-transform-none ml-3"
                ><translate>download pdf</translate>
              </span>
            </v-btn>
            <VueHtml2pdf
              :manual-pagination="true"
              :enable-download="true"
              ref="DownloadComp"
            >
              <section slot="pdf-content">
                <div class="p-5 px-4">
                  <h3 class="text-danger">Caculator Condition</h3>
                  <b-row>
                    <b-col md="4 text-right">
                      <h6 class="font-weight-black">
                        <translate>street</translate>:
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>zipcode</translate>:
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>type</translate>:
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>house size</translate>
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>house condition</translate>:
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>construction year</translate>:
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>plot</translate>:
                      </h6>
                      <h6 class="font-weight-black">
                        <translate>numbers of rooms</translate>:
                      </h6>
                    </b-col>
                    <b-col md="8">
                      <h6>{{ query.street }}</h6>
                      <h6>{{ query.zip }}</h6>
                      <h6>{{ query.buildingType }}</h6>
                      <h6>{{ query.sqm }}</h6>
                      <h6>{{ query.condition }}</h6>
                      <h6>{{ query.builtYear }}</h6>
                      <h6>{{ query.plot }}</h6>
                      <h6>{{ query.roomNumber }}</h6>
                    </b-col>
                  </b-row>
                  <h3 class="mt-3 text-danger">Result</h3>
                  <value-component
                    :value="value"
                    :query="query"
                  ></value-component>
                </div>
              </section>
            </VueHtml2pdf>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal
      size="xl"
      ref="showProperty"
      id="showProperty"
      class="lead-modal"
      hide-footer
      style="padding-right: 0px !important"
      title="Data Confirm"
    >
      <div class="table-responsive card p-3">
        <div class="flex justify-space-between">
          <div class="my-1 w-100p">
            <b-form-group label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </div>
          <div class="my-1 w-400p">
            <b-form-group label="Search" class="mb-0">
              <b-form-input v-model="filter" placeholder="Type to Search" />
            </b-form-group>
          </div>
        </div>
        <b-table
          show-empty
          stacked="md"
          :items="items"
          :fields="fields"
          :filter="filter"
          @filtered="onFiltered"
          sort-icon-left
          responsive
          fixed
          id="dataTable"
          striped
          :current-page="currentPage"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-select
          select-mode="single"
        >
          <!-- <template #cell(select)="row">
            <v-checkbox
              color= "indigo darken-3 fsize-2"
              v-model="row.item.selected"
              class="mt-0"
              hide-details
            ></v-checkbox>
          </template> -->
          <template #cell(index)="row">
            <p class="mb-0">{{ row.index + 1 }}</p>
          </template>
          <!-- <template #cell(valuation)="row">
          <div v-b-tooltip.hover title="Tooltip directive content">dsds{{row.value}}</div>
          </template> -->
          <template #cell(saleDate)="row">
            <p class="mb-0">{{ dateFormat(row.item.saleDate) }}</p>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="totalRows"
              aria-controls="dataTable"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0"
            />
            <!-- <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav> -->
          </b-col>
        </b-row>
      </div>
      <b-row class="pull-right p-4">
        <!-- <b-button class="mr-4 w-100p" variant="info"  @click="input">OK</b-button> -->
        <b-button
          class="mr-4 w-100p"
          variant="outline-danger"
          @click="hideProperty"
          ><translate>cancel</translate></b-button
        >
      </b-row>
    </b-modal>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      class="success-alert"
    >
      {{ successValue }}
    </b-alert>
  </div>
</template>

<script>
import * as UserService from "@/services/user.service";
import moment from "moment";
import VueHtml2pdf from "vue-html2pdf";
import ValueComponent from "./valueCompenent.vue";

const style = {
  normalFont: "FuturaStd",
  labelFont: "BebasNeue",
  cardBackCol: "#ffffffe6",
  headerCol: "#161616",
  labelCol: "#161616",
  // backImg: 'img/background6.bcc39fa0.jpg',
};

const items = [];

export default {
  components: {
    VueHtml2pdf,
    ValueComponent,
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
    },
  },

  data: () => ({
    value: {
      value: null,
      min: "",
      max: "",
      time: "0",
      status: "",
      avSqm: "",
      properties: [],
    },
    rules: {
      name: [(value) => !!value || "Name is required"],
      email: [
        (value) => !!value || "Email is required",
        (value) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "E-mail must be valid",
      ],
      phone: [
        (value) => !!value || "Phone number is required",
        (value) => value.length >= 8 || "Valid phone number digits 8-12",
        (value) => value.length <= 12 || "Valid phone number digits 8-12",
      ],
    },
    status: "",
    normalFont: "",
    labelFont: "",
    cardBackCol: "",
    headerCol: "",
    labelCol: "",
    backImg: "",
    query: {},
    dismissSecs: 10,
    dismissCountDown: 0,
    email: "",
    name: "",
    phone: "",
    successValue: "",
    pageOptions: [20, 50, 100],
    currentPage: 1,
    perPage: 20,
    sortBy: "index",
    sortDesc: false,
    sortDirection: "asc",
    filter: "",
    items: items,
    totalRows: items.length,
    lang: "fi",
    fields: [
      { key: "select", label: "", class: "align-middle text-center p-0" },
      // { key: 'index', label: 'No', class: "align-middle text-center"},
      {
        key: "buildingType",
        label: "Building Type",
        sortable: true,
        sortDirection: "desc",
        class: "align-middle m-auto text-center font-weight-bold",
      },
      {
        key: "city",
        label: "City",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "cityPart",
        label: "City Part",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "zip",
        label: "Zip",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "street",
        label: "Street",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "sqm",
        label: "Sqm",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "sqmPrice",
        label: "SqmPrice",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "builtYear",
        label: "Built Year",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "roomNumber",
        label: "Rooms",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "price",
        label: "Price",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "sqmPrice",
        label: "SqmPrice",
        sortable: true,
        class: "align-middle text-center",
      },
      // { key: "averageSqm", label: "average Sqm", sortable: true, class: "align-middle text-center" },
      {
        key: "plot",
        label: "Plot",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "saleDate",
        label: "Sale Date",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "condition",
        label: "Condition",
        sortable: true,
        class: "align-middle text-center",
      },
      {
        key: "consideration",
        label: "Consideration",
        sortable: true,
        class: "align-middle text-center",
      },
      // { key: "material", label: "Construction material", sortable: true, class: "align-middle text-center" },
      {
        key: "transactionTime",
        label: "Transaction Time",
        sortable: true,
        class: "align-middle text-center",
      },
    ],
  }),
  beforeMount() {
    if (this.$route.params.query) {
      this.query = this.$route.params.query;
      if (this.$route.params.value) {
        this.value = this.$route.params.value;
      }
    } else {
      this.$router.push({ name: "calculator" });
    }
  },
  methods: {
    getImgUrl(pet) {
      var images = require.context("@/assets/images/icons/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
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
    orderDetail() {
      this.$router
        .push({
          name: "sendEmail",
          params: {
            query: this.query,
            detail: true,
          },
        })
        .catch(() => {});
    },
    back() {
      this.$router.push({ name: "calculator" }).catch(() => {});
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    sendEmail() {
      if (this.$refs.validate.validate()) {
        UserService.getValue({
          name: this.name,
          phone: this.phone,
          email: this.email,
          city: this.query.city,
          zip: this.query.zip,
          street: this.query.street,
          buildingType: this.query.buildingType,
          builtYear: this.query.builtYear,
          sqm: this.query.sqm,
          condition: this.query.condition,
          plot: this.query.plot,
          roomNumber: this.query.roomNumber,
          status: "lead",
          toCompany: this.$store.state.toCompany,
        }).then((res) => {
          this.successValue = "Success!";
          this.dismissCountDown = this.dismissSecs;
          this.value.status = res.data.status;
        });
      }
    },
    showProperties() {
      this.items = this.value.properties;
      this.totalRows = this.items.length;
      this.$refs["showProperty"].show();
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    hideProperty() {
      this.$refs["showProperty"].hide();
    },
    changeLang(lang) {
      if (lang === "en") {
        this.$language.current = "en_EN";
        this.lang = "fi";
      } else {
        this.$language.current = "fi_FI";
        this.lang = "en";
      }
    },
    downloadPdf() {
      this.$refs.DownloadComp.generatePdf();
    },
  },
  mounted() {
    const company = this.$store.state.toCompany;
    UserService.getCustomUi({ company }).then((res) => {
      if (res.data.ui) {
        if (res.data.ui) {
          (this.normalFont = res.data.ui.normalFont),
            (this.labelFont = res.data.ui.labelFont),
            (this.cardBackCol = res.data.ui.cardBackCol),
            (this.headerCol = res.data.ui.headerCol),
            (this.labelCol = res.data.ui.labelCol),
            (this.backImg = res.data.ui.backgroundImg);
        }
      } else {
        (this.normalFont = style.normalFont),
          (this.labelFont = style.labelFont),
          (this.cardBackCol = style.cardBackCol),
          (this.headerCol = style.headerCol),
          (this.labelCol = style.labelCol),
          (this.backImg = style.backImg);
      }
    });
  },

  created() {
    if (this.$route.params.status) {
      this.status = this.$route.params.status;
    }
  },
};
</script>
