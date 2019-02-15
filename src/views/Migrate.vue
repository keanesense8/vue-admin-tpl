<template>
  <div id="pageMigrate">
    <v-container grid-list-xl fluid text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card dark color="indigo">
            <v-card-text class="px-0">
              <h1>剩余时间倒计时</h1>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg1>
          <v-card color="blue lighten-3">
            <v-card-text class="px-0">
              <h2>{{getDay}}</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg2>
          <v-card color="blue lighten-3">
            <v-card-text class="px-0">
              <h2>Days</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg1>
          <v-card color="blue lighten-3">
            <v-card-text class="px-0">
              <h2>{{getHour}}</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg2>
          <v-card color="blue lighten-3">
            <v-card-text class="px-0">
              <h2>Hours</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg1>
          <v-card>
            <v-card-text class="px-0">
              <h2>{{getMin}}</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg2>
          <v-card>
            <v-card-text class="px-0">
              <h2>Mins</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg1>
          <v-card>
            <v-card-text class="px-0">
              <h2>{{getSec}}</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg2>
          <v-card>
            <v-card-text class="px-0">
              <h2>Sec</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="indigo">
            <v-card-text class="px-0">已上传节目数：</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="deep-purple darken-2">
            <v-card-text class="px-0">上传中节目数：</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="red darken-4">
            <v-card-text class="px-0">错误的节目数：</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="deep-purple darken-2">
            <v-card-text class="px-0">上传的数据量：</v-card-text>
          </v-card>
        </v-flex>
        <!-- data of  -->
        <v-flex xs3>
          <v-card dark color="indigo">
            <v-card-text class="px-0">{{ migrateData.uploadedItemCount}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="deep-purple darken-2">
            <v-card-text class="px-0">{{ migrateData.uploadingItemCount }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="red darken-4">
            <v-card-text class="px-0">{{ migrateData.errorItemCount }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card dark color="deep-purple darken-2">
            <v-card-text class="px-0">{{ migrateData.uploadedData }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="headers1" :items="workingItems" class=" purple darken-2">
            <template slot="items" slot-scope="props">
              <td class="blue darken-3"></td>
              <td class="text-xs-left">{{ props.item.code }}</td>
              
              <td class="text-xs-left">{{ props.item.transferedData }}</td>
              <td class="text-xs-left">{{ props.item.starttime }}</td>

            </template>
          </v-data-table>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="headers2" :items="errorItems" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pink darken-4"></td>
              <td class="text-xs-right">{{ props.item.code }}</td>
              
              <td class="text-xs-right">{{ props.item.errorMsg }}</td>
              <td class="text-xs-right">{{ props.item.starttime }}</td>
              <td class="text-xs-right">{{ props.item.endtime }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/api";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import EChart from "@/components/chart/echart";
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";
import PostListCard from "@/components/widgets/card/PostListCard";
import ProfileCard from "@/components/widgets/card/ProfileCard";
import PostSingleCard from "@/components/widgets/card/PostSingleCard";
import WeatherCard from "@/components/widgets/card/WeatherCard";
import PlainTable from "@/components/widgets/list/PlainTable";
import PlainTableOrder from "@/components/widgets/list/PlainTableOrder";
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
import VCircle from "@/components/circle/VCircle";
import BoxChart from "@/components/widgets/chart/BoxChart";
import ChatWindow from "@/components/chat/ChatWindow";
import CircleStatistic from "@/components/widgets/statistic/CircleStatistic";
import LinearStatistic from "@/components/widgets/statistic/LinearStatistic";
import FlipCountdown from "vue2-flip-countdown";
import vueAwesomeCountdown from "vue-awesome-countdown";

// import { send } from 'q';
export default {
  components: {
    VWidget,
    MiniStatistic,
    VCircle,
    ProfileCard,
    EChart,
    LinearStatistic,
    FlipCountdown,
    vueAwesomeCountdown
  },
  data: () => ({
    color: Material,
    num: "5",
    stompClient: "",
    migrateData: {
      id: "-1",
      uploadedItemCount: 0,
      uploadingItemCount: 0,
      errorItemCount: 0,
      uploadedData: "0.0GB",
      speedDataByHour: "0.0",
      totalProcess: "0.0",
      runTime: "0 days, 0 hours, 0 minutes, 0 seconds",
      startTime: "1970/01/01 00:00:00",
      remainTime: "0 days, 0 hours, 0 minutes, 0 seconds",
      estimateFinishTime: "2020/01/01 00:00:00",
      totalData: "0.0"
    },
    workingItems: [],
    headers1: [
      {
        text: "正在处理的进程",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "code", value: "code" },
     
      { text: "transferedData", value: "transferedData" },
      { text: "starttime", value: "starttime" }
    ],
    errorItems: [],
    headers2: [
      {
        text: "错误的任务",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "code", value: "code" },
    
      { text: "errorMsg", value: "errorMsg" },
      { text: "starttime", value: "starttime" },
      { text: "endtime", value: "endtime" }
    ]
  }),
  computed: {
    getDay() {
      if (this.migrateData != null && this.migrateData.remainTime != null)
        return this.migrateData.remainTime
          .split(",")[0]
          .replace("days", "")
          .trim();
    },
    getHour() {
      if (this.migrateData != null && this.migrateData.remainTime != null)
        return this.migrateData.remainTime
          .split(",")[1]
          .replace("hours", "")
          .trim();
    },
    getMin() {
      if (this.migrateData != null && this.migrateData.remainTime != null)
        return this.migrateData.remainTime
          .split(",")[2]
          .replace("minutes", "")
          .trim();
    },
    getSec() {
      if (this.migrateData != null && this.migrateData.remainTime != null)
        return this.migrateData.remainTime
          .split(",")[3]
          .replace("seconds", "")
          .trim();
    },
    getUploadedItemCount() {
      return this.migrateData.uploadedItemCount + "";
    },
    activity() {
      return API.getActivity();
    },
    posts() {
      return API.getPost(3);
    },
    siteTrafficData() {
      return API.getMonthVisit;
    },
    locationData() {
      return API.getLocation;
    },
    vnum: function() {
      return this.num;
    }
  },
  beforeMount() {
    // this.$http.
    // setInterval(test,3000);
    function test() {
      var dt = new Date();
      console.log("now: " + dt.getTime());
      // this.$http.get('/backend/data')
      //   .then(response => {

      //   }, response => {

      //   });
      // this.$http.get('/backend').then(res => {});
      // axios.get("/aaa")
      //   .then(response => {});
      this.num = Math.floor(Math.random() * 100);
      console.log("num:" + this.num);
    }
  },
  mounted: function() {
    const self = this;
    // setInterval(function () {

    //    self.num = Math.floor(Math.random() * 100) + "";
    //    console.log('updating ticker ' + self.num);
    // }, 1000)
    this.toConnect();
    // this.send()
    console.log("mounted");
    console.log("migrate : " + this.migrateData);
  },
  methods: {
    send() {
      // console.log("thisss : " + this.stompClient)
      // let messageJson = JSON.stringify({"name": 'message'});
      // this.stompClient.send("/app/hello", {}, messageJson);
      // console.log("/app/sendTest 你发送的消息:" + message);
    },
    onMessageReceived(message) {
      const self = this;
      // console.log("receive from server : " + message.body)
      var obj = JSON.parse(message.body);
      /**
       * {"id":null
       * ,"uploadedItemCount":6323,"uploadingItemCount":0,"errorItemCount":53
       * ,"uploadedData":"5717.030GB","speedDataByHour":"4.0176","totalProcess":"0.4516"
       * ,"runTime":"0 days, 23 hours, 43 minutes, 10 seconds"
       * ,"startTime":"2019/2/1 11:48:00","remainTime":"218 days, 19 hours, 23 minutes, 12 seconds\n"
       * ,"estimateFinishTime":"2019/09/09 06:54:22\n","totalData":"1271441.579"}
       */
      // console.log(obj.uploadedItemCount)
      self.migrateData = obj.migrateProcess;
      self.workingItems = obj.workingItems;
      self.errorItems = obj.errorItems;
      console.log("working:" + self.workingItems);
      console.log("errorItems:" + self.errorItems);
      // console.log(self.migrateData.runTime)
    },
    onConnected() {
      this.stompClient.subscribe("/topic/public", this.onMessageReceived);

      // Tell your username to the server
      // this.stompClient.send("/app/init"
      // ,{}
      // ,JSON.stringify({content: 'init'}))
    },
    onError(e) {
      console.log("error:" + e);
    },

    toConnect() {
      // 建立连接对象（还未发起连接）
      // let socket = new SockJS('http://61.8.173.88:8090/ws');
      let socket = new SockJS("/ws");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        this.onConnected,
        this.onError
      );
    }
  },
  created() {
    // this.send()
    console.log("created");
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
  border: 1px dashed rgba(0, 0, 0, 0.4);
}
</style>
