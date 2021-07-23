<template>
  <div :class="sidebarbg" class="app-sidebar sidebar-shadow"
    @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
    <div class="app-header__logo">
      <div class="logo" >
        <!-- <h3>Value estimator</h3> -->
      </div>
      <div class="header__pane ml-auto">
        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll">
        <sidebar-menu v-if="admin == 'admin'" showOneChild :menu="adminMenu" /> 
        <sidebar-menu v-if="admin == 'company'" showOneChild :menu="companyMenu" /> 
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    SidebarMenu,
    VuePerfectScrollbar
  },
  data() {
    return {
      isOpen: false,
      sidebarActive: false,
      admin: '',
      adminMenu: [
        {
          title: 'Dashboard',
          icon: 'pe-7s-home',
          href: '/dashboard',
        },
        {
          title: 'Data input',
          icon: 'pe-7s-date',
          href: '/data-input',
        },
        {
          title: 'Leads',
          icon: 'pe-7s-date',
          href: '/lead',
        },
        {
          title: 'All valuations',
          icon: 'pe-7s-date',
          href: '/valuation',
        },
        {
          title: 'Companies',
          icon: 'pe-7s-date',
          href: '/companies',
        },
      ],
      companyMenu: [
        {
          title: 'Dashboard',
          icon: 'pe-7s-home',
          href: '/dashboard',
        },
        {
          title: 'Leads',
          icon: 'pe-7s-date',
          href: '/lead',
        },
        {
          title: 'All valuations',
          icon: 'pe-7s-date',
          href: '/valuation',
        },
        {
          title: 'Settings',
          icon: 'pe-7s-notebook',
          href: '/option-ui',
          child: [
            {
              href: "/option-ui",
              title: "Option to customise UI"
            },
            {
              href: "/option-receiver",
              title : "Option to define lead receiver"
            },
            {
              href: "/form-builder",
              title: "Add more questions"
            },
            {
              href: "/iframe-script",
              title: "Iframe/Script"
            }
          ]
        },
      ],
     
      collapsed: true,

      windowWidth: 0
    };
  },
  props: {
    sidebarbg: String
  },
  methods: {
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1350") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },
  beforeMount() {
    if(this.$store.state.user){
      this.admin = this.$store.state.user.role;

    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  }
};
</script>
