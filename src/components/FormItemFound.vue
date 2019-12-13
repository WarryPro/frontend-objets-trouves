<template>
    <b-container>
        <el-form :model="itemFound" :rules="rules" ref="itemFound" class="form-item-found">
            <h4>J'ai trouvé un objet</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque debitis, dignissimos, repellendus reprehenderit. Soluta, quas impedit?</p>
            <!-- Place  -->
            <el-form-item prop="title">
                <el-input v-model="itemFound.title" prefix-icon="el-icon-document-checked" placeholder="Nom de l'objet"></el-input>
            </el-form-item>

            <!-- Calendar -->
            <el-form-item prop="itemFound.date">
                <el-date-picker
                    v-model="itemFound.date"
                    type="date"
                    placeholder="Date où vous l'avez trouvé"
                    format="dd/MM/yyyy"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>

            <!-- city -->
            <el-form-item prop="city">
                <el-input v-model="itemFound.city" placeholder="Lieu ou ville où vous avez trouvé l'objet" prefix-icon="el-icon-location"></el-input>
            </el-form-item>

            <el-form-item prop="itemFound.category">
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
                <el-input type="textarea" v-model="itemFound.description" placeholder="Ajoutez une description de l'objet trouvé"></el-input>
            </el-form-item>

            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Glissez votre image ici ou <em>faites click pour la charger</em></div>
                <div slot="tip" class="el-upload__tip">Seulement fichier en format jpg/png avec une taille plus petite que 5Mo</div>
            </el-upload>
        </el-form>
    </b-container>
</template>

<script>
    import { Global } from "../../Global";
    import axios from "axios";
    // import store from '../store';

    export default {
        name: 'FormItemFound',

        mounted() {
            this.getCategories();
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                itemFound: {
                    title: '',
                    city: '',
                    date: '',
                    description: '',
                    category: '',
                    type: '',
                    image: '',
                    status: 'test'
                },
                categories: [
                    {   value: 'Option1',
                        label: 'Option1'
                    }, 
                    {   value: 'Option2',
                        label: 'Option2'
                    }, 
                    {   value: 'Option3',
                        label: 'Option3'
                    }, 
                    {   value: 'Option4',
                        label: 'Option4'
                    }, 
                    {   value: 'Option5',
                        label: 'Option5'
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
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
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