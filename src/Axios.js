import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const config = require('./config');
Vue.use(VueAxios,axios);
const Axios = axios.create({
    baseURL: config.UrlRestApi,
});
export default Axios;