<template>
  <div id="pageMigrate">
    <v-container grid-list-xl fluid>
      
      <v-layout row wrap>
        <!-- mini statistic start  icon="fa fa-facebook"-->
       
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon=""
            title="Uploaded"
            v-bind:sub-title="num"
            color="indigo"      
          >
          </mini-statistic>  
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic
           
            title="Uploading"
            sub-title="10"
            color="red"      
          >
          </mini-statistic>           
        </v-flex>          
        <v-flex lg3 sm6 xs12>
          <mini-statistic
           
            title="Errors"
            sub-title="1"
            color="light-blue"      
          >
          </mini-statistic>            
        </v-flex>        
        <v-flex lg3 sm6 xs12>
          <mini-statistic
           
            title="EXT"
            sub-title="EXT"
            color="purple"      
          >
          </mini-statistic>             
        </v-flex>   
        <!-- mini statistic  end -->   
        
        
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import API from '@/api';
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import EChart from '@/components/chart/echart';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import PostListCard from '@/components/widgets/card/PostListCard';
import ProfileCard from '@/components/widgets/card/ProfileCard';
import PostSingleCard from '@/components/widgets/card/PostSingleCard';
import WeatherCard from '@/components/widgets/card/WeatherCard';
import PlainTable from '@/components/widgets/list/PlainTable';
import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';
import VCircle from '@/components/circle/VCircle';
import BoxChart from '@/components/widgets/chart/BoxChart';
import ChatWindow from '@/components/chat/ChatWindow';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';
import { send } from 'q';
export default {
  components: {
    VWidget,
    MiniStatistic,
    VCircle,
    ProfileCard,
    EChart,
    LinearStatistic,
  },
  data: () => ({
    color: Material ,
    num: "5",
    stompClient: ''
  }),
  computed: {
    activity () {
      return API.getActivity();
    },
    posts () {
      return API.getPost(3);
    },
    siteTrafficData () {
      return API.getMonthVisit;
    },
    locationData () {
      return API.getLocation;
    },
    vnum: function(){
      return this.num;
    }
  },
  beforeMount() {
    // this.$http.
    // setInterval(test,3000);
    function test(){
      var dt = new Date();
      console.log("now: " + dt.getTime());
      // this.$http.get('/backend/data')
      //   .then(response => {

      //   }, response => {

      //   });
      // this.$http.get('/backend').then(res => {});
      // axios.get("/aaa")
      //   .then(response => {});
      this.num =  Math.floor(Math.random() * 100);
      console.log("num:" + this.num);
    }
  },
  mounted: function () {
      const self = this
      // setInterval(function () {
       
      //    self.num = Math.floor(Math.random() * 100) + "";
      //    console.log('updating ticker ' + self.num);
      // }, 1000)
      this.toConnect()
      // this.send()
      console.log("mounted")
  }, 
  methods:{
     send() {
        console.log("thisss : " + this.stompClient)
        let messageJson = JSON.stringify({"name": 'message'});
        this.stompClient.send("/app/hello", {}, messageJson);
        console.log("/app/sendTest 你发送的消息:" + message);
      },
      onMessageReceived(r){
        console.log(r)
      },
      onConnected(){
          this.stompClient.subscribe('/topic/public', this.onMessageReceived);

        // Tell your username to the server
          // this.stompClient.send("/app/chat.addUser"
          //   ,{}
          //   ,JSON.stringify({sender: username, type: 'JOIN'}))

      
      },
      onError(e){
          console.log(e)
      },
      
      toConnect() {
        // 建立连接对象（还未发起连接）
        var socket = new SockJS('http://localhost:8090/ws');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, this.onConnected, this.onError);
       
        
      },
      
  },
  created(){
      // this.send()
      console.log("created")
  }
  // mounted(){
  //    this.num =  Math.floor(Math.random() * 100) + "";
  //    function abc(){
  //      this.$num =  Math.floor(Math.random() * 100) + "";
  //      console.log("now: " + new Date().getTime());
  //      console.log("num:" + this.$num);
  //     //  this.$nextTick(function(){
  //     //  })
  //    }
  //    setInterval(abc,3000);
  // }

  

};
</script>
<style>
  #input-usage .v-messages {
    border: 1px dashed rgba(0,0,0, .4);
  }
</style>
