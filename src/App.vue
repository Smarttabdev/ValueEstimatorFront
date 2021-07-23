<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
const default_layout = "apps"
import * as StorageService from '@/services/storage.service'
import * as AuthService from '@/services/auth.service'

export default {
  computed: {
    layout() {
      this.getUser()
      return (this.$route.meta.layout || default_layout) + "-layout"
    }
  },
  methods: {
     logout() {
      AuthService.logOut()
      this.$store.state.user = null
      // this.$store.state.query = null
      this.$store.state.value = null
      this.$store.state.authenticated = false
    },
    async getUser() {
      const token = StorageService.getStorage('token')
      const fullPath = this.$route.fullPath
            
      if(fullPath.split('-')[0] === '/VEC'){
        const result = await AuthService.getCompany({identify: fullPath.split('-')[1]})
        this.$store.state.toCompany = result.data.toCompany
        this.$store.state.receiver = result.data.receiver
        this.$router.push({ name: 'calculator' }).catch(()=>{})
      }
      if(token) {
        const res = await AuthService.getUser()
          if(res.status === 200){
            this.$store.state.authenticated = true;
            this.$store.state.user = {
              email: res.data.email,
              id: res.data.id,
              receiver: res.data.receiver,
              name: res.data.username,
              role: res.data.role,
              identify: res.data.identify,
              contactTextE: res.data.contactTextE, 
              contactTextF: res.data.contactTextF 
            }
          }else{
            this.logout()
            // this.$router.push({ name: 'calculator' }).catch(()=>{})
          }
      }else{
        this.logout()
        // this.$router.push({ name: 'calculator' }).catch(()=>{})
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "assets/base.scss";
</style>
