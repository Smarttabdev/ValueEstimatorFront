<template>
  <div class="company">
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
    ></page-title>
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
          @row-selected="onSelectRow"
          select-mode="single"
        >
          <template #cell(index)="row">
            <p class="mb-0">{{row.index + 1}}</p> 
          </template>
          <template #cell(allow)="row">
            <v-switch
              v-model="row.item.allow"
              color="success"
              hide-details
              @change="allowChange(row)"
            ></v-switch>
          </template>
          <template #cell(actions)="row">
            <b-button variant="outline-danger" class="btn-sm" @click="del(row)">
              <i class="pe-7s-trash"></i>
            </b-button>
          </template>
        </b-table>
      </div>
       <b-row>
        <b-col md="6" class="my-1">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";

import * as AdminService from '@/services/admin.service';
// import VueCircle from "vue2-circle-progress";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import {
  faCog,
  faBusinessTime,
  faSearch,
  faStar
} from "@fortawesome/free-solid-svg-icons";


library.add(faCog, faBusinessTime, faSearch, faStar);

const items = [];

export default {
    components: {
      PageTitle,
    },
    data: () => ({
        heading: "Companies",
        subheading: "Can show list of real estate agents",
        icon: "pe-7s-coffee icon-gradient bg-mixed-hopes",
        items: items,
        filter: null,
        selectedRow: [],
        fields: [
          { key: 'select', label: '', class: 'align-middle text-center'},
          { key: 'index', label: 'No', class: "align-middle text-center"},
          { key: "username", label: "Company Name", sortable: true, class: "align-middle text-center font-weight-bold" },
          { key: "email", label: "Email", sortable: true, class: "align-middle text-center" },
          { key: "allow", label: "Access", sortable: true, class: "align-middle" },
          { key: "identify", label: "Identify", sortable: true, class: "align-middle" },
          { key: "actions", label: "Actions", sortable: true, class: "align-middle text-center" },
        ],
        totalRows: items.length,
        pageOptions: [5, 10, 15],
        currentPage: 1,
        perPage: 5,
        sortBy: 'index',
        sortDesc: false,
        sortDirection: "asc",
       
    }),

    methods: {
      onSelectRow(items){
        this.selectedRow = items;
        this.$root.$emit('bv::show::modal', 'viewModal', '#btnShow')
      },
      del(row) {
        const id = row.item.id
        AdminService.deleteUser({id}).then(res => {
          if(res.status === 200){
            this.items = this.items.filter((val, index) => index !== row.index)
          }else{
            console.log('error')
          }
        })
  
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      getAllCompany() {
        AdminService.getAllCompany().then(res => {
          this.items = res.data.companies
          this.totalRows = this.items.length
        })
      },
      allowChange(row) {
        const id = row.item.id
        const allow = row.item.allow
        AdminService.changeAllow({id, allow}).then(res => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.getAllCompany()
    }
};
</script>

<style scoped>
  .unit-flex {
    display: flex;
    justify-content: space-between;
  }

  .flex {
    display: flex;
  }

</style>
