const routes = {
  entries: [
    // {
    //   path: "*",
    //   name: "404 - Not found ...",
    //   component: () => import("@/Pages/ErrorPages/Error404"),
    // },
  ],
  allowedRoutes: [],

  addDynamicRoutes(entries) {
    entries.forEach((entry) => {
      this.allowedRoutes.push(entry.path);
      this.entries.push(entry);
    });
  },
  isRouteAllowed(path = null) {
    return path === "*"
      ? false
      : this.allowedRoutes.indexOf(path) === -1
      ? false
      : true;
  },
};

// Add routes after ...
routes.addDynamicRoutes([
   //Auth
        {
            path: '/',
            redirect: '/calculator',
            // name: 'calculator',
            // meta: { layout: 'apps' },
            // component: () => import('../Pages/UserPages/Calculator.vue'),
        },
        {
            path: '/login',
            name: 'login',
            meta: { layout: 'userpages' },
            component: () => import('../Pages/AuthPages/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            meta: { layout: 'userpages' },
            component: () => import('../Pages/AuthPages/Register.vue'),
        },
        {   
            path: '/pages/forgot-password',
            name: 'forgot-password',
            meta: { layout: 'userpages' },
            component: () => import('../Pages/AuthPages/ForgotPassword.vue'),
        },

        //User

        {
            path: '/calculator',
            name: 'calculator',
            meta: { layout: 'apps' },
            component: () => import('../Pages/UserPages/Calculator.vue')
        },
        // {
        //     path: '/calculator/:id',
        //     name: 'calculator',
        //     meta: { layout: 'apps' },
        //     component: () => import('../Pages/UserPages/Calculator.vue')
        // },
        {
            path: '/email',
            name: 'sendEmail',
            meta: { layout: 'apps' },
            component: () => import('../Pages/UserPages/Email.vue')
        },
        {
            path: '/value',
            name: 'value',
            meta: { layout: 'apps' },
            component: () => import('../Pages/UserPages/Value.vue')
        },

        // Admin

        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {
              layout: 'default',
              requiresAuth: true,
            },
            component: () => import('../Pages/AdminPages/Dashboard.vue')
        },
        {
            path: '/data-input',
            name: 'data-input',
            meta: {
              layout: 'default',
              requiresAuth: true,
            },
            component: () => import('../Pages/AdminPages/DataInput.vue')
        },
        {
            path: '/lead',
            name: 'lead',
            meta: {
              layout: 'default',
              requiresAuth: true
            },
            component: () => import('../Pages/AdminPages/Lead.vue')
        },
        {
            path: '/valuation',
            name: 'valuation',
            meta: {
              layout: 'default',
              requiresAuth: true,
            },
            component: () => import('../Pages/AdminPages/Valuation.vue')
        },
        {
            path: '/companies',
            name: 'company',
            meta: {
              layout: 'default',
              requiresAuth: true,
            },
            component: () => import('../Pages/AdminPages/Company.vue')
        },
        {
            path: '/option-ui',
            name: 'optionUi',
            meta: {
              layout: 'default',
              requiresAuth: true
            },
            component: () => import('../Pages/AdminPages/OptionUI.vue')
        },
        {
            path: '/option-receiver',
            name: 'OptionReceiver',
            meta: {
              layout: 'default',
              requiresAuth: true
            },
            component: () => import('../Pages/AdminPages/OptionEmail.vue')
        },
        {
            path: '/form-builder',
            name: 'FormBuilder',
            meta: {
              layout: 'default',
              requiresAuth: true
            },
            component: () => import('../Pages/AdminPages/FormBuilder.vue')
        },
        {
          path: '/iframe-script',
          name: 'Script',
          meta: {
            layout: 'default',
            requiresAuth: true
          },
          component: () => import('../Pages/AdminPages/Script.vue')
        }
]);

export default routes;