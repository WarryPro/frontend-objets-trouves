<template>
    <b-container v-if="item !== null">
        <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/> -->
        <el-form :model="item" :rules="rules" ref="item" class="form-item-edit col-sm-12">
            <h4>Editer l'objet</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque debitis, dignissimos, repellendus reprehenderit. Soluta, quas impedit?</p>
            <!-- Place  -->
            <el-form-item prop="title">
                <el-input v-if="item.title !== null" v-model="item.title" prefix-icon="el-icon-document-checked" placeholder="Nom de l'objet"></el-input>
            </el-form-item>

            <!-- Calendar -->
            <el-form-item>
                <el-date-picker v-if="item.created.date !== null"
                    v-model="item.created.date"
                    type="date"
                    placeholder="Date où vous l'avez perdu"
                    format="dd/MM/yyyy"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>

            <!-- city -->
            <el-form-item prop="city">
                <el-input v-if="item.city !== null" v-model="item.city" placeholder="Lieu ou ville où vous avez perdu l'objet" prefix-icon="el-icon-location"></el-input>
            </el-form-item>

            <el-form-item prop="category">
                <el-select v-if="item.category !== null" v-model="item.category" placeholder="Séléctionnez une catégorie">
                    <el-option
                    v-for="category in categories"
                    :key="category.value"
                    :label="category.label"
                    :value="category.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="description">
                <el-input v-if="item.description !== null" type="textarea" v-model="item.description" placeholder="Ajoutez une description de l'objet (couleur, type d'objet, etc)"></el-input>
            </el-form-item>

            <el-form-item class="form-submit">
                <el-button type="primary" :loading="loading" @click="submitForm('item')">{{messageButton}}</el-button>
            </el-form-item>
        </el-form>
    </b-container>
</template>

<script>
    import { Global } from "../../Global";
    import axios from "axios";
    import store from '../store';

    export default {
        name: 'FormItemEdit',

        mounted() {
            this.getCategories();
            this.item = store.getters.currentItem;
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                loading: false,
                messageButton: "PUBLIER L'OBJET",
                item: {
                    created: {
                        date: 'now'
                    }
                },
                categories: [
                    {   value: '',
                        label: ''
                    }
                ],

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
                    title: [
                    {
                        required: true,
                        message: "Il faut tapez le titre",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        message: "Le doit avoir au moins 3 carcts.",
                        trigger: "blur"
                    }
                    ],
                    city: [
                    {
                        required: true,
                        message: "Il faut tapez le lieu ou ville où vous avez trouvé l'objet",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        message: "Ce champs doit avoir au moins 3 carcts.",
                        trigger: "blur"
                    }],

                    description: [
                    {
                        required: true,
                        message: "Tapez la déscription de l'objet",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        message: "Ce champs doit avoir au moins 20 carcts.",
                        trigger: "blur"
                    }],

                    category: [
                    { 
                        required: true,
                        message: "Il faut choisir une catégorie",
                        trigger: "blur"
                    }],

                    image: [
                    { 
                        required: true, 
                        message: "Il faut charger au moins une image",
                        trigger: "blur",
                    }],

                    date: [
                    { 
                        required: true, 
                        message: "Il faut choisir la date de l'événement",
                        trigger: "blur",
                    }]
                }
            }
        },

        methods: {
            getCategories() {
                axios.get(this.VUE_APP_URL+"categories")
                .then(response => {
                    this.categories = response.data;
                    this.categories.forEach(category => {
                        category.value = category.id
                        category.label = category.name
                    });
                })
                .catch(error => {
                    console.log(error);
                })
            },
            
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                    this.loading = true;
                    this.messageButton = "EN COURS..."
                    
                    setTimeout(() => {
                        axios.put(this.VUE_APP_URL + "items/edit/" + this.item.id, this.item, {
                            headers: {
                                "Authorization": store.getters.userToken
                            }
                        })
                        .then(res => {
                            if (res.data.status !== "error") {
                                setTimeout(() => {
                                    this.loading = false;
                                    this.messageButton = "PUBLIER L'OBJET"
                                    //Flash message 
                                    this.$message({
                                        type: 'success',
                                        message: "L'objet a été édité avec succès :)"
                                    });

                                }, 2000)

                            }else {
                                this.loading = false;
                                this.messageButton = "PUBLIER L'OBJET"
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                }); 
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    },2000)
                    } else {
                        this.$message({
                            type: 'error',
                            message: "Il faut remplir tous les champs"
                        }); 
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 0;
    }
    .form-item-edit {
        margin: 0 auto;
        padding: 2rem 1rem;
        border: 1px solid #DCDFE6;
        border-radius: 5px;
        input {
            width: 100%;
        }
        .el-alert {
            margin-bottom: 1rem;
        }
        .form-submit {
            margin-bottom: 0;
            .el-button {
                width: 100%;
            }
        }
    }
</style>