<template>
  <div>
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
    ></page-title>
    <div class="form-group row">
      <div class="col-sm-9">
      </div>
      <div class="col-sm-3">
        <b-button v-b-modal.confirmModal variant="secondary"><i class="fas fa-trash-alt"></i> Delete selected data</b-button>
      </div>
    </div>
    <div class="row card p-3">
      <div class="flex justify-space-between">
        <div class="my-1 w-100p">
          <b-form-group label="Per page" class="mb-0">
            <b-form-select :options="pageOptions" v-model="perPage" />
          </b-form-group>
        </div>
        <div class=" my-1 w-400p">
          <b-form-group label="Search" class="mb-0">
            <b-form-input v-model="filter" placeholder="Type to Search" />
          </b-form-group>
        </div>
      </div>
      <b-col md="10">
      </b-col>
      <div class="table-responsive">
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
          striped
          :current-page="currentPage"
          :per-page="perPage"
          :sort-by.sync="sortBy" 
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection" 
          show-select 
          select-mode="single"
        >
          <template #cell(select)="row">
            <v-checkbox
              color= "indigo darken-3 fsize-2"
              v-model="row.item.selected"
              class="mt-0"
              hide-details
              @change="selectData(row)"
            ></v-checkbox>
          </template>
          <template #cell(index)="row">
            <p class="mb-0">{{row.index + 1}}</p> 
          </template>
          <template #cell(actions)="row">
            <b-button variant="outline-danger" class="btn-sm" @click="del(row)">
              <i class="pe-7s-trash"></i>
            </b-button>
          </template>
          <template #cell(createdAt)="row">
            {{formatDate(row.value)}}
          </template>
          <!-- <template #cell(valuation)="row">
          <div v-b-tooltip.hover title="Tooltip directive content">dsds{{row.value}}</div>
          </template> -->
        </b-table>
      </div>
       <b-row>
        <b-col md="6" class="my-1">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>
    </div>
    <b-modal size="md" ref="confirmModal" id="confirmModal" class="lead-modal" hide-footer title="Delete selected Data?">
      <h6>Selected data will be deleted...</h6>
      <b-row class="pull-right p-4">
        <b-button class="mr-4 w-100p" variant="info"  @click="deleteSelected">OK</b-button>
        <b-button class="mr-4 w-100p" variant="outline-danger"  @click="hideConfirm">Сancel</b-button>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import moment from 'moment'

import * as AdminService from '@/services/admin.service'

import PageTitle from "@/Layout/Components/PageTitle.vue"
import {
  faCog,
  faBusinessTime,
  faSearch,
  faStar
} from "@fortawesome/free-solid-svg-icons"


library.add(faCog, faBusinessTime, faSearch, faStar)

const items = []

export default {
  components: {
    PageTitle,
  },
  data: () => ({
      heading: "Valuations",
      subheading: "Can show list of queries",
      icon: "pe-7s-coffee icon-gradient bg-mixed-hopes",
      items: items,
      filter: null,
      fields: [
        { key: 'select', label: '', class: 'align-middle text-center p-0'},
        { key: 'index', label: 'No', class: "align-middle text-center"},
        { key: "street", label: "Address", sortable: true, class: "align-middle text-center" },
        { key: "zip", label: "Zip", sortable: true, class: "align-middle text-center" },
        { key: "price", label: "Price", sortable: true, class: "align-middle text-center" },
        { key: "city", label: "City", sortable: true, class: "align-middle text-center" },
        { key: "buildingType", label: "Property Type", sortable: true, class: "align-middle text-center" },
        { key: "valuation", label: "Valuation", sortable: true, class: "align-middle text-center" },
        { key: "sqm", label: "Sqm", sortable: true, class: "align-middle text-center" },
        { key: "builtYear", label: "Built Year", sortable: true, class: "align-middle text-center" },
        { key: "condition", label: "Condition", sortable: true, class: "align-middle text-center" },
        { key: "createdAt", label: "Date of submission", sortable: true, class: "align-middle text-center" },
        // { key: "actions", label: "Actions", sortable: true, class: "align-middle" },
      ],
      totalRows: items.length,
      pageOptions: [20, 50, 100],
      selectedRow: [],
      currentPage: 1,
      perPage: 20,
      sortBy: 'index',
      sortDesc: false,
      sortDirection: "asc",
    
  }),

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getAllValuations() {
      AdminService.getAllValuations().then(res => {
        if(res.status === 200) {
          this.items = res.data.valuations
          this.totalRows = this.items.length
        }
      })
    },
    selectData(row){
      if(row.item.selected){
        this.selectedRow.push(row.item._id)
      } else {
        this.selectedRow = this.selectedRow.filter(val => val !== row.item._id)
      }
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    hideConfirm() {
      this.$refs['confirmModal'].hide()
    },
    deleteSelected() {
      AdminService.selectedLeadValuationDelete({ids: this.selectedRow}).then(res => {
        if(res.status === 200) {
          this.getAllValuations()
          this.$refs['confirmModal'].hide()
        }
      })
    }
  },
  mounted() {
    this.getAllValuations()
  }
}
</script>
