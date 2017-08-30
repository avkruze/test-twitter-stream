import Vue from 'vue';
import VueResource from 'vue-resource';


import MainVue from './components/main.vue';

import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://localhost:8303');
Vue.use(VueResource);

export const Events = new Vue({});
const app = new Vue({
    el: '#app',

    sockets:{
        connect: function(){
            console.log('socket connected')
        },
    },
    components:{
        MainVue
    }

});
