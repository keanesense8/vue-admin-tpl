<template>
  <div id="pageMigrate">
    <v-container grid-list-xl fluid>
      
      <v-layout row wrap>
        <!-- mini statistic start  icon="fa fa-facebook"-->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon=""
            title="Uploaded"
            sub-title="100"
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
    color: Material   
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
    }
  },
  beforeMount() {
    // this.$http.
    setInterval(test,3000);
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

    }
  }
  

};
</script>
