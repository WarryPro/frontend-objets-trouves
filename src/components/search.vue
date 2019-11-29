<template>
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="Faites votre recherche"
      :trigger-on-focus=false 
      :hide-loading=true
      :clearable=true>
    </el-autocomplete>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'search',
        // props: ['items'],
        data() {
            return {
                items: [],
                state: ''
            };
        },
        methods: {
            loadAll(queryString) {
                axios.get("http://127.0.0.1:8000/search?q="+queryString).then(res => {
                    if (res.status == 200) {
                        console.log(res)
                         return this.items = res.data;
                    }
                    else {
                        console.log(res)
                    }
                });
            },
            querySearch(queryString) {
                this.loadAll(queryString);
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>