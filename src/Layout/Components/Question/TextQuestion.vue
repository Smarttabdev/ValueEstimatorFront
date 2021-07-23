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
            :key="false"
            rows="3"
            class="mb-2"
            @change="changeQuestion"
          ></b-form-textarea>
        </b-col>
        <b-col md="4">
          <b-row>
          <b-col md="6">
            <b-form-input 
              placeholder="Next" 
              class="mt-3" 
              :value="next"
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
    </div>
  </div>
</template>

<script>

export default {
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
  methods: {
    remove(){
      this.deleteQuestion(this.node-1);
    },
    changeQuestion(e){
      this.updateData('question', e)
    },
    changeNext(e){
      this.updateData('next', e)
    },
    changeEnd(e){
      this.updateData('end', e)
    },
    updateQuestion(newData){
      this.question = newData
    },
    updateData(key, value) {
      this.$emit('updateData', {
        [key]: value
      }, this.index)
    },
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
  }

}
</script>