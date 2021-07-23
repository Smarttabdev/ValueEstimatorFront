<template>
  <div ref="previewDiv" class="question-preview bg-deep-blue">
    <component 
    :is="div.status"
    :question="div.question"
    :next="div.next"
    :end="div.end"
    :nextQuestion="nextQuestion"
    :answers="div.answers"
    >
    </component>
  </div>
</template>

<script>
  import Vue from 'vue'
  Vue.component('textQuestion', {
    template: '<div><h2 class="text-center">{{question}}</h2><b-form-textarea data-gramm_editor="false" rows="3" class="mt-5"></b-form-textarea><div class="text-right"><b-btn class="mt-5 w-40" variant="success" @click="nextQuestion(next, end)">Next</b-btn></div></div>',
    props: ['nextQuestion', 'question', 'next', 'end']
  })
  Vue.component('message', {
    template: '<div><h2 class="text-center">{{question}}</h2><div class="text-right"><b-btn class="mt-5 w-40" variant="success" @click="nextQuestion(next, end)">Next</b-btn></div></div>',
    props: ['nextQuestion', 'question', 'next', 'end']
  })
  Vue.component('single', {
    template: '<div><h2 class="text-center">{{question}}</h2><div class="mt-5 mx-5"><div v-for="answer in answers" class="my-2" :key="answer.answer"><b-btn variant="success" @click="nextQuestion(answer.next, answer.end)">{{answer.answer}}</b-btn></div></div></div>',
    props: ['nextQuestion', 'question', 'next', 'end', 'answers'],
    data: () => ({selected: null})
  })
  Vue.component('multiple', {
    template: '<div><h2 class="text-center">{{question}}</h2><div class="mt-5 mx-5"><div v-for="answer in answers" :key="answer.answer"><b-form-checkbox class="mx-1" switch size="lg"><h4>{{answer.answer}}</h4></b-form-checkbox></div></div><div class="text-right"><b-btn class="mt-5 w-40" variant="success" @click="nextQuestion(next, end)">Next</b-btn></div></div>',
    props: ['nextQuestion', 'question', 'next', 'end', 'answers'],
    data: () => ({selected: null})
  })
  const div = {}

export default {
  components:{
    // text
  },
  data: () => ({
    div: div,
  }),
  props: {
    previewData: Array
  },
  methods: {
    nextQuestion(next, end){
      if(end){
        console.log('End!')
      }else{
        this.div = this.previewData.filter(val => val.node === parseInt(next))[0]
      }
    }
  },
  mounted() {
    this.div = this.previewData[0]
  }
}
</script>