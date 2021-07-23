<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
    <b-row>
      <b-col md="6">
        <b-form-group>
          <v-text-field v-model="email" label="Receive Email Address"></v-text-field>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-button variant="primary" @click="changeEmail">Change</b-button>
      </b-col>
    </b-row>
        <h4>Text for Contact</h4>
    <b-row>
      <b-col md="4">
        <b-form-group>
          <v-textarea data-gramm_editor="false" v-model="contactTextE" label="English"></v-textarea>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group>
          <v-textarea data-gramm_editor="false" v-model="contactTextF" label="Finnish"></v-textarea>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-button variant="primary" @click="changeText">Change</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import * as AdminService from '@/services/admin.service';

import PageTitle from "@/Layout/Components/PageTitle.vue"
import {
  faCog,
  faBusinessTime,
  faSearch,
  faStar
} from "@fortawesome/free-solid-svg-icons"


library.add(faCog, faBusinessTime, faSearch, faStar)


export default {
  components: {
    PageTitle,
  },
  data: () => ({
      heading: "Option Email",
      subheading: "Can set the email address that receive the lead and valuation",
      icon: "pe-7s-coffee icon-gradient bg-mixed-hopes",
      email: '',
      contactTextE: '',
      contactTextF: ''
    
  }),

  methods: {
    changeEmail(){
      AdminService.changeReceiverEmail({email: this.email}).then(res => {
        console.log(res)
      })
    },
    changeText(){
      AdminService.changeContactText({contactTextE: this.contactTextE, contactTextF: this.contactTextF}).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.email = this.$store.state.user.receiver
    this.contactTextE = this.$store.state.user.contactTextE
    this.contactTextF = this.$store.state.user.contactTextF
  }
}
</script>
