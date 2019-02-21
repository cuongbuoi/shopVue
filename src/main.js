import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Axios from './Axios';
import Helper from './Helper'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(BootstrapVue)

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
const config = require('./config');
Vue.use({
    install: function (Vue, options) {
        Vue.prototype.$BaseUrl = config.BaseUrl;
        Vue.prototype.$BaseUrlApi = config.BaseUrlApi;
        Vue.prototype.$UrlImageBlog  = config.UrlImageBlog;
        Vue.prototype.$UrlImageProduct  = config.UrlImageProduct;
        Vue.prototype.$WebsiteName  = config.WebsiteName;
        Vue.prototype.$Http = Axios;
        Vue.prototype.$Helper = Helper;
    }
});

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2,options);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
