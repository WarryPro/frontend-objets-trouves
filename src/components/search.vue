<template>
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="Faites votre recherche"
      :trigger-on-focus=false 
      :hide-loading=true
      :clearable=true
       suffix-icon="el-icon-search">
    </el-autocomplete>
</template>

<script>
    import {Global} from '../../Global'
    import axios from 'axios';
    export default {
        name: 'search',
        props: {
            defaultItems: null,
        },
        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                items: this.defaultItems,
                state: '',
                timeout: null
            };
        },
        methods: {
            loadAll(queryString) {
                axios.get(this.VUE_APP_URL + "search?q="+queryString).then(res => {
                    if (res.status == 200) {
                        console.log(res)
                         return this.items = res.data;
                    }
                    else {
                        console.log(res)
                    }
                });
            },
            querySearch(queryString, cb) {
                if(this.state == '') {
                    this.items = this.defaultItems;
                }else {
                    var items = this.defaultItems;
                    var results = queryString ? items.filter(this.createFilter(queryString)) : items;
                    // call callback function to return suggestions
                    
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                    cb(results);
                    }, 3000 * Math.random());
                    
                    if(results.length > 0) {
                        this.items = results;
                        this.$emit('search', this.items);
                        this.$emit('state', this.state);
                    }else {
                        this.loadAll(queryString);
                        this.$emit('search', this.items);
                        this.$emit('state', this.state);
                    }
                }
            },
            createFilter(queryString) {
                return (item) => {
                return (item.city.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>