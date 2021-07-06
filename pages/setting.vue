<template>
    <div class="app-container" style="position: relative;">
        <client-only>
            <div v-for="(plugin, idx) in listPlugins" :key="idx">
                <component :is="plugin.name"/>
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
            listPlugins: [
                {
                    name: "settingComponent",
                    path: "http://localhost:8080/setting"
                }
            ],
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
    },
}
</script>