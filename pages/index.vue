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
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');

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

#src-container {
  position: absolute;
  z-index: 1000;
  top: 2%;
  left: 2%;
  background: white;
  width: 460px;
  padding: 5px;
  border-radius: 5px;
}

.flex-container {
  display: flex;
}

.icon-size {
  width: 30px;
  align-self: center;
  margin: 0 10px;
}

.icon-size:hover {
  cursor: pointer;
  background: #ece6e6;
}

#src-box {
  width: 400px;
  padding: 10px;
  border-bottom: 1px solid black;
  transition: 0.5s;
}

#src-box:focus {
  outline: none;
  border-bottom: 1px solid red;
}

#src-box-sec {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid black;
  transition: 0.5s;
}

#src-box-sec:focus {
  outline: none;
  border-bottom: 1px solid red;
}

#src-section {
  position: absolute;
  display: none;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 35%;
  height: 100vh;
  background: white;
}

.src-item {
  cursor: pointer; 
  padding: 2px 10px; 
  width: 100%; 
  text-align: left; 
  background: white;
}

.src-item:hover {
  background: #cfcfcf;
}
/* .section-open {
  display: block;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 35%;
  height: 100vh;
  background: white;
  -moz-transition: sectionOpen 4s ease-in-out;
  -webkit-transition: sectionOpen 4s ease-in-out;
  transition: sectionOpen 4s ease-in-out;
}

#section-close {
  display: none;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 35%;
  height: 100vh;
  background: white;
  -webkit-animation: sectionClose 1s ease-in-out;
  -moz-animation: sectionClose 1s ease-in-out;
  animation: sectionClose 1s ease-in-out;
} */

.sec-row-1 {
  display: flex;
  width: 100%;
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 52px;
}

.spacer {
  flex-grow: 1;
}

.sec-row-2 {
  width: 100%;
  padding: 10px;
}

.select-style {
  width: 100%;
  height: 40px;
  margin-left: 2px;
  background: #e0dddd;
  border-radius: 5px;
}

.select-style:focus {
  outline: none;
  cursor: pointer;
}

.sec-hr {
  border: 1px solid white;
  background: black;
}

.first-sec-p {
  font-family: 'Rubik Mono One', sans-serif;
  margin-left: 10px;
}

.slider {
  width: 80%;
}

.slider::-moz-range-thumb {
  background: red;
}

.submit-button {
  width: 40%;
  float: right;
  background: #2f73bb;
  font-weight: bold;
  color: white;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
}

.submit-button:hover {
  opacity: 0.7;
}

@keyframes sectionOpen {
  from {transform: scaleX(0);}
  to {transform: scaleX(1);}
}

@-moz-keyframes sectionOpen {
  from {transform: scaleX(0);}
  to {transform: scaleX(1);}
}

@-webkit-keyframes sectionOpen {
  from {transform: scaleX(0);}
  to {transform: scaleX(1);}
}

@keyframes sectionClose {
  from {transform: scaleX(1);}
  to {transform: scaleX(0);}
}

@-moz-keyframes sectionClose {
  from {transform: scaleX(1);}
  to {transform: scaleX(0);}
}

@-webkit-keyframes sectionClose {
  from {transform: scaleX(1);}
  to {transform: scaleX(0);}
}
</style>
