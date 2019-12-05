<template>
  <el-form :inline="true" :model="homeSearch" class="" :rules="rules" ref="homeSearch">
    <!-- Calendar -->
    <el-form-item prop="date">
      <div class="search-label">Rechercher un objet</div>
      <el-date-picker
        v-model="homeSearch.date"
        type="date"
        placeholder="Date"
        format="dd/MM/yyyy"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-form-item>

    <!-- Place  -->
    <el-form-item prop="place">
      <el-input v-model="homeSearch.place" prefix-icon="el-icon-location" placeholder="Lieu"></el-input>
    </el-form-item>

    <!-- keyword -->
    <el-form-item prop="keyword">
      <el-input v-model="homeSearch.keyword" placeholder="Vous recherchez quoi?"></el-input>
    </el-form-item>

    <!-- Submit -->
    <el-form-item>
      <el-button 
        icon="el-icon-search" 
        type="primary" 
        @click="submitForm('homeSearch')">Rechercher</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: "HomeSearch",

  data() {
    return {
      homeSearch: {
        date: "",
        place: "",
        keyword: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Aujourd'hui",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Hier",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "Il y a une sem.",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },

      rules: {
        date: [
          {
            type: "date",
            required: true,
            message: "Date de l'événement",
            trigger: "change"
          }
        ],

        place: [
          {
            required: true,
            message: "Lieu où vous avez perdu l'objet",
            trigger: "change"
          }
        ],

        keyword: [
          {
            required: true,
            message: "Le nom, catégorie ou type de l'objet",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    async submitForm(formName) {
      await  this.$refs[formName].validate(valid => {
        if (valid) {
          axios.get("http://127.0.0.1:8000/homesearch/", 
          {
            params: {
              d: moment(this.homeSearch.date).format("YYYYMMDD"),
              c: this.homeSearch.place,
              q: this.homeSearch.keyword
            }
          }).then((res) => {
            let itemsSearch = res.data;
            // this.$emit("search", itemsSearch);
            this.$router.push({name:'search', params: {'homeItemsSearch': itemsSearch}})
          }).catch((error) =>{
            console.log(error);
          })

        } else {
          alert("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item:nth-child(1) {
  position: relative;
}
.search-label {
  position: absolute;
  top: calc(-100% - 5px);
  width: 100%;
  background-color: var(--dark);
  color: var(--white);
  border-radius: 5px;
}
.el-form-item,
.search-label {
  box-shadow: 0px 5px 10px -9px var(--dark);
}
</style>