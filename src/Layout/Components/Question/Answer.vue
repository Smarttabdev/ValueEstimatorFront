<template>
  <b-row class="pl-3 mt-3">
    <b-col md="1" class="pt-2">
      <span class="answer-num"><strong>{{node}}</strong></span>
    </b-col>
    <b-col md="6">
      <b-form-input placeholder="Answer..." :value="answer" @change="changeAnswer" class="mb-2"></b-form-input>
      <b-form-input placeholder="Enter Answer description..." :value="description" @change="changeDescription"></b-form-input>
    </b-col>
    <b-col v-if="status === 'single'" md="2">
      <b-form-input placeholder="Next"  :value="next" @change="changeNext"></b-form-input>
    </b-col>
    <b-col v-if="status === 'single'" md="1">
      <v-checkbox
        class="mt-2 mb-2 "
        color="indigo darken-3"
        :value="end"
        hide-details
        @change="changeEnd"
      ></v-checkbox>
      <!-- <b-form-input placeholder="Score" class="mt-1"></b-form-input> -->
    </b-col>
    
    <b-col md="2">
      <b-btn class="delete-answer" variant="danger" @click="remove"><i class="fas fa-trash"></i></b-btn>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    node: Number,
    deleteAnswer: Function,
    answer: String,
    description: String,
    next: String,
    status: String, 
    end: Boolean,
    index: Number
  },
  methods: {
    remove(){
      this.deleteAnswer(this.node - 1)
    },
    changeAnswer(e) {
      this.updateAnswerData('answer', e)
    },
    changeDescription(e){
      this.updateAnswerData('description', e)
    },
    changeNext(e){
      this.updateAnswerData('next', e)
    },
    changeEnd(e){
      this.updateAnswerData('end', e)
    },
    updateAnswerData(key, value) {
      this.$emit('updateAnswer', {
        [key]: value
      }, this.index)
    }
  }
}
</script>