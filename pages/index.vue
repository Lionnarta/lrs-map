<template>
  <div class="app-container">
    <client-only>
      <div class="map-container" style="position: relative;">
        <div id="map" ref="map" class="map h-screen w-screen z-0"></div>
        <div v-if="map">
          <div v-for="(plugin, idx) in listPlugins" :key="idx">
            <component :is="plugin.name"/>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data: function() {
    return {
      map: null,
      option: {
        zoom: 5,
        center: [0.7893, 118.9213],
        zoomControl: false
      },
      listPlugins: [
        {
          name: "dataComponent",
          path: "http://localhost:8080/"
        },
      ]
    }
  },
  mounted() {
    this.listPlugins.forEach((el) => {
      Vue.component(el.name, function(resolve, reject) {
        axios.get(el.path)
          .then((response) => {
            resolve({
              template: response.data
            });
          });
      });
    });

    process.nextTick(() => {
      this.map = L.map(this.$refs.map, this.option);
      window.globalMap = this.map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    });
  },
  destroyed() {
    delete window.globalMap;
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
