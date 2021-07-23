<template>
  <div class="app-container app-theme-white app-userpage" >
    <slot></slot>
  </div>
</template>

<script>
// import * as AuthService from '@/services/auth.service'
// import * as StorageService from '@/services/storage.service'

export default {
  name: "app",
  components: {},
  data() {
    return {
      admin: ''
    };
  },
  methods: {
  },
};
</script>
