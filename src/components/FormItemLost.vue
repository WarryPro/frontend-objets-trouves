<template>
    <b-container>
        <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/> -->
        <el-form :model="itemFound" :rules="rules" ref="itemFound" class="form-item-found">
            <h4>J'ai perdu un objet</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque debitis, dignissimos, repellendus reprehenderit. Soluta, quas impedit?</p>
            <!-- Place  -->
            <el-form-item prop="title">
                <el-input v-model="itemFound.title" prefix-icon="el-icon-document-checked" placeholder="Nom de l'objet"></el-input>
            </el-form-item>

            <!-- Calendar -->
            <el-form-item>
                <el-date-picker
                    v-model="itemFound.date"
                    type="date"
                    placeholder="Date où vous l'avez perdu"
                    format="dd/MM/yyyy"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>

            <!-- city -->
            <el-form-item prop="city">
                <el-input v-model="itemFound.city" placeholder="Lieu ou ville où vous avez perdu l'objet" prefix-icon="el-icon-location"></el-input>
            </el-form-item>

            <el-form-item prop="category">
                <el-select v-model="itemFound.category" placeholder="Séléctionnez une catégorie">
                    <el-option
                    v-for="category in categories"
                    :key="category.value"
                    :label="category.label"
                    :value="category.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="description">
                <el-input type="textarea" v-model="itemFound.description" placeholder="Ajoutez une description de l'objet (couleur, type d'objet, etc)"></el-input>
            </el-form-item>
            
            <el-upload
                    class="upload-demo"
                    drag
                    :action="VUE_APP_URL + 'upload'"
                    ref="upload"
                    :auto-upload="false"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Glissez votre image ici ou <em>faites click pour la charger</em></div>
                    <div slot="tip" class="el-upload__tip">Seulement fichier en format jpg/png avec une taille plus petite que 5Mo</div>
            </el-upload>

            <el-form-item class="form-submit">
                <el-button type="primary" :loading="loading" @click="submitForm('itemFound')">{{messageButton}}</el-button>
            </el-form-item>
        </el-form>
    </b-container>
</template>

<script>
    import { Global } from "../../Global";
    import axios from "axios";
    import store from '../store';

    export default {
        name: 'FormItemLost',

        mounted() {
            this.getCategories();
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                loading: false,
                messageButton: "PUBLIER L'OBJET",
                itemFound: {
                    title: '',
                    city: '',
                    date: '',
                    description: '',
                    category: '',
                    type: 1,
                    status: 'actif'
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
                    response.data.forEach(resCategory => {
                        this.categories.forEach(element => {
                            element.value = resCategory.id
                            element.label = resCategory.name
                        });
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
                        axios.post(this.VUE_APP_URL + "items/new", this.itemFound, {
                            headers: {
                                "Authorization": store.getters.userToken
                            }
                        })
                        .then(res => {
                            if (res.data.status !== "error") {
                                setTimeout(() => {
                                    this.submitUpload();
                                    this.loading = false;
                                    this.resetForm(formName);
                                    this.messageButton = "PUBLIER L'OBJET"
                                    //Flash message 
                                    this.$message({
                                        type: 'success',
                                        message: "L'objet a été publié avec succès :)"
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
            },

            
            submitUpload() {
                this.$refs.upload.submit();
                this.$refs.upload.clearFiles();
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 0;
    }
    .form-item-found {
        max-width: 400px;
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