<template>
  <div>
    <b-row>
      <b-col md="3" >
        <div class="position-fixed w-18">
          <div v-for="option in questionOption" :key="option.title">
            <v-btn 
              color="primary"
              class="w-100 text-transform-none"
              @click="appendClick(option.append)"
            >{{option.title}}</v-btn>
          </div>
        </div>
      </b-col>
      <b-col md="9">
        <h4 v-if="!appendComponents.length">Add your first question...</h4>
        <div v-for="(component, index) in appendComponents"
          :key="index"
          :is="component.name"
          :node="index+1"
          :deleteQuestion="onDelete"
          :status="component.status"
          :question.sync="component.question"
          :subHeading.sync="component.subHeading"
          :end.sync="component.end"
          :next.sync="component.next"
          :answers.sync="component.answers"
          :name="component.name"
          :index="index"
          :title="component.title"
          @updateData="updateData"
        >
        </div>
        <div class="flex justify-content-around mb-5 mt-3" v-if="appendComponents.length">
          <v-btn color="primary" class="text-transform-none px-lg-5" @click="save"><i class="fa fa-check mr-2 "></i>Save</v-btn>
          <v-btn color="success" class="text-transform-none px-lg-5" @click="preview"><i class="fas fa-desktop mr-2"></i>Preview</v-btn>
          <v-btn color="default" class="text-transform-none px-lg-5" @click="cancel"><i class="fa fa-ban mr-2"></i>Cancel</v-btn>
        </div>
      </b-col>
    </b-row>
    <b-modal size="lg" ref="previewModal" id="previewModal" class="lead-modal h-500p" hide-footer style="padding-right: 0px !important" title="Preview">
      <preview
        :previewData="appendComponents"
      ></preview>
      <b-row class="pull-right p-4">
        <b-button class="mr-4 w-100p" variant="info"  @click="hidePreview">OK</b-button>
        <b-button class="mr-4 w-100p" variant="outline-danger"  @click="hidePreview">Сancel</b-button>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import VuePerfectScrollbar from "vue-perfect-scrollbar"

import * as AdminService from '@/services/admin.service'
// import PageTitle from "@/Layout/Components/PageTitle.vue"
import Choice from "@/Layout/Components/Question/Choice.vue"
import TextQuestion from '@/Layout/Components/Question/TextQuestion.vue'
import Message from '@/Layout/Components/Question/Message.vue'
import Preview from '@/Layout/Components/Question/Preview.vue'

import {
  faCog,
  faBusinessTime,
  faSearch,
  faStar
} from "@fortawesome/free-solid-svg-icons"



library.add(faCog, faBusinessTime, faSearch, faStar)

const appendComponents = []

export default {
  components: {
    // PageTitle,
    VuePerfectScrollbar,
    Choice,
    TextQuestion,
    Message,
    Preview
  },
  data: () => ({
    heading: "Add more questions",
    subheading: "Can add more questions and choice, message",
    icon: "pe-7s-coffee icon-gradient bg-mixed-hopes",
    tempData: [],
    questionOption: [
      {
        title: 'Add Single choice',
        append: 'single'
      },
      {
        title: 'Add Multiple choice',
        append: 'multiple'
      },
      {
        title: 'Add Text question',
        append: 'textQuestion'
      },
      {
        title: 'Add Message',
        append: 'message'
      }
    ],
    appendComponents: appendComponents
  }),

  methods: {
    appendClick(append) {
      const component = {
        question: '',
          subHeading: '',
          end: false,
          next: '',
          node: this.appendComponents.length + 1,
          answers: [
            {
              name: 'Answer',
              answer: '',
              description: '',
              next: '',
              end: false
            }
          ]
      }
      switch (append) {
        case 'single':
          component.status = 'single'
          component.name = 'Choice'
          component.title = 'Single Choice'
          break;
        case 'multiple':
          component.status = 'multiple'
          component.name = 'Choice'
          component.title = 'Multiple Choice'
          break;
        case 'textQuestion':
          component.status = 'textQuestion'
          component.name = 'TextQuestion'
          component.title = 'Text Question'
          break;
        case 'message':
          component.status = 'message'
          component.name = 'Message'
          component.title = "Message"
          break;
      
        default:
          break;
      }
      this.appendComponents.push(component);
    },
    onDelete(index) {
      this.appendComponents.splice(index, 1);
      this.appendComponents = this.appendComponents.map((com, i) => {
          return({
            ...com,
            node: i + 1,
          })
      })
    },
    save() {
      AdminService.saveQuestions({questions: this.appendComponents}).then(res => {
        console.log(res)
      })
    },
    preview() {
      this.$refs['previewModal'].show()
    },
    hidePreview(){
      this.$refs['previewModal'].hide()
    },
    cancel() {
      this.appendComponents = [...this.tempData]
    },
    updateData(newData, index) {
      this.appendComponents[index] = {
        ...this.appendComponents[index],
        ...newData
      }
      this.appendComponents[index].node = index + 1
    }
  },
  mounted() {
    AdminService.getQuestions().then(res => {
      if(res.data.questions){
        this.appendComponents = res.data.questions
        this.tempData = [...res.data.questions]
      }
    })
  }
}
</script>
