<template>
<div class="pdf">
  <pdf 
    :src="pdfUrl">
  </pdf>
</div>
</template>
<script>
import pdf from 'vue-pdf';
export default {
  name: 'Pdf',
  components:{
      pdf
  },
  data:() => ({
    pdfUrl:"http://localhost:9027/preview/emr/eastwill_phy_inspectRecord_Z00000019430.pdf",
  })
};
</script>