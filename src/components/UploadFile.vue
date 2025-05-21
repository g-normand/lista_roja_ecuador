<script>
import axios from 'axios';
import JSZip from 'jszip';
import { eventBus } from "../main";
import UserData from "./userdata.js"

export default {
  data() {
    return {
	    showMyPg: false,
      userData : new UserData(),
      pgbar_width: '0%',
    }
  }
};


</script>