<template>
  <div>
  <div style="display:flex;">
    <img v-for="image in home.images" :key="image" :src="image" width="200" height="150"> 
    </div>
    {{ home.title }}<br/>
    ${{ home.pricePerNight }} / night<br/>
    <img src="/images/marker.svg" width="20" height="20" alt="" /> {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br/>
    <img src="/images/star.svg" width="20" height="20" alt="" />{{ home.reviewValue }}<br/>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br/>
    <div style="height:800px;width:800px;" ref="map"></div>
  </div>
  
</template>
<script>
import homes from '@/data/homes'

export default {
  layout: 'red',
  head() {
    return {
      title: this.home.title,
      script: [{
        src:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDazpbk9HSmzoZsZ85CM7Bz8iH5E9QQeVs&libraries=places&callback=initMap&channel=GMPSB_addressselection_v1_cABC",
        hid: "map",
        defer: true,
      }]
    }
  },
  data() {
    return {
      home: {}
    }
  },
  mounted() {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
    }

    const map = new window.google.maps.Map(this.$refs.map, mapOptions)
  },
  async created() {
    const home = homes.find((home) => home.objectID == this.$route.params.id)
    const homeData = await this.$dataApi.getHome(this.$route.params.id)
    console.log(homeData);
    this.home = home
  }
}

</script>
