<template>
    <div>
        <page-title
            :heading="heading"
            :subheading="subheading"
            :icon="icon"
        ></page-title>
        <div class="form-group row">
            <div class="col-sm-9">
                <b-button
                    @click="$refs.csvInput.click()"
                    variant="success"
                    class="btn-right mr-3"
                    ><i class="fas fa-file-csv"></i> CSV Input</b-button
                >
                <input
                    type="file"
                    style="display: none"
                    ref="csvInput"
                    class="form-control-file"
                    accept="csv"
                    multiple="false"
                    @change="onChange"
                />
            </div>
            <div class="col-sm-3">
                <b-button v-b-modal.confirmModal variant="secondary"
                    ><i class="fas fa-trash-alt"></i> All Data delete</b-button
                >
            </div>
        </div>
        <div class="table-responsive card p-3">
            <div class="flex justify-space-between">
                <div class="my-1 w-100p">
                    <b-form-group label="Per page" class="mb-0">
                        <b-form-select
                            :options="pageOptions"
                            v-model="perPage"
                        />
                    </b-form-group>
                </div>
                <div class=" my-1 w-400p">
                    <b-form-group label="Search" class="mb-0">
                        <b-form-input
                            v-model="filter"
                            placeholder="Type to Search"
                            @input="filterdItem"
                        />
                    </b-form-group>
                </div>
            </div>
            <b-table
                show-empty
                stacked="md"
                :items="items"
                :fields="fields"
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
                <template #cell(index)="row">
                    <p class="mb-0">{{ row.index + 1 }}</p>
                </template>
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
                </b-col>
            </b-row>
        </div>
        <b-modal
            size="sm"
            ref="inputModal"
            id="inputModal"
            class="lead-modal"
            hide-footer
            style="padding-right: 0px !important"
            title="Data Confirm"
        >
            <h3>Will you upload this file?</h3>
            <b-row class="pull-right p-4">
                <b-button class="mr-4 w-100p" variant="info" @click="input"
                    >OK</b-button
                >
                <b-button
                    class="mr-4 w-100p"
                    variant="outline-danger"
                    @click="hideInput"
                    >Сancel</b-button
                >
            </b-row>
            <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="purple"
            ></v-progress-circular>
        </b-modal>
        <b-modal
            size="md"
            ref="confirmModal"
            id="confirmModal"
            class="lead-modal"
            hide-footer
            title="Delete All Data?"
        >
            <h6>All data will be deleted...</h6>
            <b-row class="pull-right p-4">
                <b-button class="mr-4 w-100p" variant="info" @click="deleteAll"
                    >OK</b-button
                >
                <b-button
                    class="mr-4 w-100p"
                    variant="outline-danger"
                    @click="hideConfirm"
                    >Сancel</b-button
                >
            </b-row>
        </b-modal>
        <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="purple"
        ></v-progress-circular>
    </div>
</template>

<script>
import PageTitle from "@/Layout/Components/PageTitle.vue";
import moment from "moment";

import * as AdminService from "@/services/admin.service";

const items = [];
export default {
    name: "DataInput",
    components: {
        PageTitle
    },
    data: () => {
        return {
            heading: "Data input",
            subheading:
                "Can show property dat list and input new data with CSV file.",
            icon: "pe-7s-home  icon-gradient bg-mean-fruit",
            csvData: [],
            pageOptions: [20, 50, 100],
            currentPage: 1,
            perPage: 20,
            file: null,
            sortBy: "index",
            inputData: [],
            sortDesc: false,
            sortDirection: "asc",
            filter: "",
            items: items,
            tempitems: [],
            totalRows: items.length,
            isLoading: false,
            fields: [
                {
                    key: "select",
                    label: "",
                    class: "align-middle text-center p-0"
                },
                // { key: 'index', label: 'No', class: "align-middle text-center"},
                {
                    key: "buildingType",
                    label: "Building Type",
                    sortable: true,
                    sortDirection: "desc",
                    class: "align-middle m-auto text-center font-weight-bold"
                },
                {
                    key: "city",
                    label: "City",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "cityPart",
                    label: "City Part",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "zip",
                    label: "Zip",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "street",
                    label: "Street",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "sqm",
                    label: "Sqm",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "sqmPrice",
                    label: "SqmPrice",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "builtYear",
                    label: "Built Year",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "roomNumber",
                    label: "Rooms",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "price",
                    label: "Price",
                    sortable: true,
                    class: "align-middle text-center"
                },
                // { key: "averageSqm", label: "average Sqm", sortable: true, class: "align-middle text-center" },
                {
                    key: "plot",
                    label: "Plot",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "saleDate",
                    label: "Sale Date",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "condition",
                    label: "Condition",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "consideration",
                    label: "Consideration",
                    sortable: true,
                    class: "align-middle text-center"
                },
                {
                    key: "transactionTime",
                    label: "Transaction Time",
                    sortable: true,
                    class: "align-middle text-center"
                }
            ]
        };
    },
    computed: {
        isValid() {
            return this.csvData.length !== 0;
        },
        displayCsvData() {
            return this.isValid && this.csvData.slice(1);
        },
        displayCsvHeader() {
            return this.isValid && this.csvData[0];
        }
    },
    methods: {
        onChange(event) {
            const allowedTypes = ["application/vnd.ms-excel"];
            this.file = event.target.files[0];
            if (!allowedTypes.includes(this.file.type)) {
                alert("You can select only CSV file!");
            } else {
                this.$refs["inputModal"].show();
            }
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        filterdItem() {
            this.items = this.tempitems.filter(
                row =>
                    row.buildingType.includes(this.filter) ||
                    String(row.buildingType).includes(this.filter) ||
                    row.city.includes(this.filter) ||
                    String(row.cityPart).includes(this.filter) ||
                    row.zip.includes(this.filter) ||
                    row.street.includes(this.filter) ||
                    String(row.sqm).includes(this.filter) ||
                    String(row.price).includes(this.filter) ||
                    String(row.sqmPrice).includes(this.filter) ||
                    String(row.builtYear).includes(this.filter) ||
                    String(row.roomNumber).includes(this.filter) ||
                    String(row.plot).includes(this.filter) ||
                    row.saleDate.includes(this.filter) ||
                    row.condition.includes(this.filter) ||
                    String(row.consideration).includes(this.filter) ||
                    String(row.transactionTime).includes(this.filter)
            );
            this.totalRows = this.items.length;
            this.currentPage = 1;
        },
        pad(n, width, z) {
            z = z || "0";
            n = n + "";
            if (n.length == width) {
                return n;
            } else {
                return new Array(width - n.length + 1).join(z) + n;
            }
        },
        input() {
            this.isLoading = true;
            const formData = new FormData();
            formData.append("csvFile", this.file);
            AdminService.csvUpload(formData).then(res => {
                if (res.status === 200) {
                    this.$refs["inputModal"].hide();
                    this.items = this.items.concat(res.data.addedProperty);
                    this.totalRows = this.items.length;
                    this.isLoading = false;
                    this.tempitems = this.items;
                }
            });
        },
        hideInput() {
            this.$refs["inputModal"].hide();
            this.isLoading = false;
        },
        hideConfirm() {
            this.$refs["confirmModal"].hide();
            this.isLoading = false;
        },
        dateFormat(date) {
            return moment(date).format("YYYY-MM-DD");
        },
        deleteAll() {
            AdminService.deleteAllProperty().then(res => {
                if (res.status === 200) {
                    this.items = [];
                    this.totalRows = this.items.length;
                    this.$refs["confirmModal"].hide();
                    this.tempitems = [];
                }
            });
            this.$refs["confirmModal"].hide();
        },
        getAllProperty() {
            this.isLoading = true;
            AdminService.getAllProperty().then(res => {
                if (res.status === 200) {
                    this.items = res.data.property;
                    this.totalRows = this.items.length;
                    this.isLoading = false;
                    this.tempitems = this.items;
                }
            });
        }
    },
    mounted() {
        this.getAllProperty();
    }
};
</script>
