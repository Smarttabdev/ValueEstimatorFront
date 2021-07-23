<template>
  <div class="choice-card">
    <div class="header">
      <div>{{node}}. {{title}}</div>
      <div class="close-icon" @click="remove"><i class="pe-7s-close fsize-3"></i></div>
    </div>
    <div class="body">
      <b-row class="pl-3">
        <b-col md="8" class="p-3">
          <b-form-textarea
            data-gramm_editor="false"
            :value="question"
            placeholder="Enter question..."
            rows="3"
            class="mb-2"
            @change="changeQuestion"
          ></b-form-textarea>
          <b-form-textarea
            data-gramm_editor="false"
            :value="subHeading"
            placeholder="Enter sub heading..."
            @change="changeHeading"
            rows="2"
          ></b-form-textarea>
        </b-col>
        <b-col md="4">
          <b-row>
          <b-col md="6">
            <b-form-input 
              placeholder="Next" 
              class="mt-3" 
              @change="changeNext"
            ></b-form-input>
          </b-col>
          <b-col md="6">
            <v-checkbox
              label="End"
              color="indigo darken-3"
              :value="end"
              hide-details
              @change="changeEnd"
            ></v-checkbox>
          </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr class="w-95 m-auto">
      <b-row class="pl-3 mt-3">
        <b-col md="1">
          <b-btn 
            class="add-answer" 
            variant="success" 
            size="sm"
            @click="addAnswer"
          >
            <i class="fas fa-plus"></i>
          </b-btn>
        </b-col>
        <b-col md="5" class="mt-1">
          <strong>Text</strong>
        </b-col>
        <b-col md="2" class="mt-1"><strong>Next</strong></b-col>
        <b-col md="1" class="mt-1"><strong>End</strong></b-col>
        <b-col md="2" class="mt-1"><strong>Delete</strong></b-col>
      </b-row>
      <div 
        v-for="(answer, index) in answerComponents" 
        :key="index" 
        :is="answer.name"
        :node="index+1"
        :deleteAnswer="deleteAnswer"
        :end="answer.end"
        :answer="answer.answer"
        :description="answer.description"
        :next="answer.next"
        :index="index"
        @updateAnswer="updateAnswer"
      ></div>
    </div>
  </div>
</template>

<script>
import Answer from '@/Layout/Components/Question/Answer.vue'

export default {
  components: {
    Answer
  },
  data: () => ({
    answerComponents: []
  }),
  props: {
    name: String,
    node: Number,
    deleteQuestion: Function,
    status: String,
    question: String,
    subHeading: String,
    end: Boolean,
    next: String,
    title: String,
    answers: Array,
    index: Number
  }, 
   computed: {
    local() {
      return this.value ? this.value : { type: 'Person' }
    },
  },
  methods: {
    remove(){
      this.deleteQuestion(this.node-1);
    },
    addAnswer(){
      this.answerComponents.push({
        name: 'Answer',
        end: false,
        answer: '',
        description: '',
        next: '',
      })
      
      this.updateData('answers', this.answerComponents)
    },
    deleteAnswer(index){
      this.answerComponents = this.answerComponents.filter((com, ind) => ind !== index)
      this.updateData('answers', this.answerComponents)
    },
    changeQuestion(e){
      this.updateData('question', e)
    },
    changeHeading(e){
      this.updateData('subHeading', e)
    },
    changeEnd(e){
      this.updateData('end', e)
    },
    changeNext(e){
      this.updateData('next', e)
    },
    updateAnswer(newData, index){
      this.answerComponents[index] = {
        ...this.answerComponents[index],
        ...newData
      }
    },
    updateData(key, value) {
      this.$emit('updateData', {
        [key]: value
      }, this.index)
    }
  },
  mounted(){
    // this.answerComponents.push({
    //   // name: 'Answer',
    //   detail: {
    //     end: false,
    //     answer: '',
    //     description: '',
    //     next: '',
    //   }
    // })
    this.answerComponents = this.answers
  }

}
</script>