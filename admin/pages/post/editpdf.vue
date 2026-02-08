<template>
    <title>Edit</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Edit</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                                </li>
                                <li class="breadcrumb-item active">
                                    <LazyNuxtLink to="/post/pdflist">Back to List</LazyNuxtLink>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content">
                <div class="container-fluid">
                    <!-- Start -->
                    <div class="card border-top border-0 border-4 border-info">
                        <div class="border p-4 rounded">
                            <form @submit.prevent="saveData()" id="formrest" class="forms-sample"
                                enctype="multipart/form-data">
                                <div class="card card-primary card-outline card-tabs">
                                    <div class="card-header p-0 pt-1 border-bottom-0">
                                        <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="custom-tabs-three-home-tab"
                                                    data-toggle="pill" href="#custom-tabs-three-home" role="tab"
                                                    aria-controls="custom-tabs-three-home"
                                                    aria-selected="true">General</a>
                                            </li>

                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content" id="custom-tabs-three-tabContent">
                                            <div class="tab-pane fade active show" id="custom-tabs-three-home"
                                                role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                                                <!-- General  -->
                                                <div class="row mb-3 required">
                                                    <label for="input-name-1"
                                                        class="col-sm-2 col-form-label required-label">Name</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" name="name" placeholder="Name"
                                                            autocomplete="off" v-model="insertdata.name"
                                                            class="form-control" />

                                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0]
                                                            }}</span>
                                                    </div>
                                                </div>

                                                <div class="row mb-3 d-none">
                                                    <label for="input-description-1"
                                                        class="col-sm-2 col-form-label">Short. Description</label>
                                                    <div class="col-sm-10">
                                                        <div ref="summernoteEditorShort" style="height: 100%;"></div>
                                                    </div>
                                                </div>

                                                <div class="row mb-3">
                                                    <label for="input-meta-description-1"
                                                        class="col-sm-2 col-form-label required-label">ePDF
                                                        Categories</label>
                                                    <div class="col-sm-10">
                                                        <div>
                                                            <!-- ======{{ postCat }}===== -->

                                                            <select id="category" class="form-control"
                                                                v-model="insertdata.categoryId">
                                                                <option value="">Select</option>
                                                                <option v-for="option in postCat" :value="option.id"
                                                                    :key="option.id">{{ option.name }}
                                                                </option>
                                                            </select>

                                                            <span class="text-danger" v-if="errors.categoryId">{{
                                                                errors.categoryId[0] }}</span>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mb-3">
                                                    <label for="input-description-1"
                                                        class="col-sm-2 col-form-label">Full Description</label>
                                                    <div class="col-sm-10">
                                                        <div ref="summernoteEditorFull" style="height: 100%;"></div>
                                                    </div>
                                                </div>
                                                <hr />


                                                <div class="row mb-3 required">
                                                    <label for="input-meta-title-1"
                                                        class="col-sm-2 col-form-label">Download Link</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" placeholder=""
                                                            v-model="insertdata.download_link" class="form-control"
                                                            autocomplete="off" />
                                                        <span class="text-danger" v-if="errors.download_link">{{
                                                            errors.download_link[0] }}</span>
                                                    </div>
                                                </div>


                                                <hr />

                                                <div class="alert alert-info" bis_skin_checked="1">
                                                    <i class="fas fa-info-circle"></i>PDF
                                                </div>
                                                <div class="row mb-3">
                                                    <label for="input-meta-description-1"
                                                        class="col-sm-2 col-form-label">PDF UPload</label>
                                                    <div class="col-sm-10">
                                                        <input type="file" value class="form-control" id="fileInput"
                                                            accept="application/pdf" ref="files"
                                                            @change="onFileSelected" />
                                                        <span class="text-danger" v-if="errors.files">{{
                                                            errors.files[0]
                                                            }}</span>
                                                        <div v-if="previewUrl" style="margin-top: 20px;">
                                                            <!-- Image Preview -->
                                                            <img v-if="isImage" :src="previewUrl" alt="Preview"
                                                                class="img-fluid" />

                                                            <!-- PDF Preview -->
                                                            <iframe v-if="isPdf" :src="previewUrl" width="100%"
                                                                height="600px" frameborder="0"></iframe>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="row mb-3 required">
                                                    <label for="input-meta-title-1"
                                                        class="col-sm-2 col-form-label">Status</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-control"
                                                            aria-label=".form-select-sm example"
                                                            v-model="insertdata.status">
                                                            <option selected>Select</option>
                                                            <option value="1">Active</option>
                                                            <option value="0">Inactive</option>
                                                        </select>




                                                    </div>
                                                </div>


                                                <div class="row mb-3 d-none">
                                                    <label for="input-meta-description-1"
                                                        class="col-sm-2 col-form-label">Additional Image</label>
                                                    <div class="col-sm-10">
                                                        <input type="file" multiple class="form-control"
                                                            accept="image/png,image/jpeg" @change="handleImageUpload"
                                                            id="fileInput" />
                                                        <div class="row mt-3">
                                                            <div class="col-md-3" v-for="(image, index) in images"
                                                                :key="index">
                                                                <div class="card">
                                                                    <img :src="image.url" class="card-img-top img-fluid"
                                                                        alt="Preview" />
                                                                    <div class="card-body">
                                                                        <button type="button"
                                                                            class="btn btn-danger btn-sm"
                                                                            @click="removeImage(index)">
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-success px-5 w-100">
                                                    <i class="bx bx-check-circle mr-1"></i> Save & Next
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- END -->
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const router = useRouter();
import 'summernote/dist/summernote-bs4.js';
import 'summernote/dist/summernote-bs4.css';
///import $ from 'jquery';
if (process.client) {
    window.Swal = swal;

}

definePageMeta({
    middleware: 'is-logged-out',
})

const summernoteEditor = ref(null);
const insertdata = reactive({
    id: '',
    name: '',
    categoryId: '',
    question: '',
    answer: '',
    images: '',
    status: '',
});
// Define a ref to store the HTML content of the editor

const descriptionShort = ref('');
const descriptionFull = ref('');


const previewUrl = ref(null);
const images = ref([]);
const categoryId = ref(null);
const categories = ref('');
const searchResults = ref([]);
const showProCategories = ref([]);
const productImg = ref('');
const notifmsg = ref('');
const productAddImgs = ref([]);
const isImage = ref(false);    // Flag for image file
const isPdf = ref(false);      // Flag for PDF file
const selectedFile = ref(null); // To store the actual file object
const file = ref(null);
const files = ref(null);
const errors = ref({});
const summernoteEditorShort = ref({});
const summernoteEditorFull = ref({});
const postCat = ref([]);
// Initialize Summernote editor

// Define your methods

// Define your methods
const allPostCategory = async () => {
    try {
        const response = await axios.get(`/category/epdfCategory`);
        // console.log(response.data);
        postCat.value = response.data;

    } catch (error) {
        console.error(error);
    }
};


const checkImageDimensions = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            if (img.width === 300 && img.height === 300) {
                const url = e.target.result;

                // Ensure images.value is initialized as an array
                images.value = Array.isArray(images.value) ? images.value : [];

                images.value.push({
                    url,
                    file
                });
            } else {
                alert('Image dimensions must be 300x300 pixels.');
                // Reset file input
                const fileInput = document.getElementById('fileInput');
                if (fileInput) {
                    fileInput.value = '';
                }
            }
        };
    };
    reader.readAsDataURL(file);
};

const removeImage = (index) => {
    images.value.splice(index, 1);
};

const checkImageDimensionsThunbnail = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            previewUrl.value = e.target.result;
        };
    };
    reader.readAsDataURL(file);
    //resetInput();
};



const previewImage = (event) => {
    const file = event.target.files[0];
    previewUrl.value = URL.createObjectURL(file);
    checkImageDimensionsThunbnail(file);
};

const onFileSelected = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        selectedFile.value = file; // Store the selected file in selectedFile

        const fileType = file.type;
        const reader = new FileReader();

        // Determine if the file is an image or PDF
        isImage.value = fileType.startsWith("image/");
        isPdf.value = fileType === "application/pdf";

        // Read the file and generate a preview
        reader.onload = (e) => {
            previewUrl.value = e.target.result; // Set the result to previewUrl
        };

        reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        previewUrl.value = null;
        isImage.value = false;
        isPdf.value = false;
        selectedFile.value = null; // Clear the selected file if no file is selected
    }
};



const handleImageUpload = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        //readImage(file);
        checkImageDimensions(file);
    }
};

const saveData = () => {
    const formData = new FormData();
    images.value.forEach((image, index) => {
        formData.append('images[]', image.file);
    });
    formData.append('id', insertdata.id);
    formData.append('files', selectedFile.value); // Add the file to 'files' key
    formData.append('name', insertdata.name);
    formData.append('categoryId', insertdata.categoryId);
    formData.append('description_full', descriptionFull.value);
    formData.append('download_link', insertdata.download_link);
    formData.append('status', insertdata.status);
    console.log(formData);

    axios.post('/post/updateePdf', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {

        insertdata.name = "";
        insertdata.download_link = "";
        //$('#formrest')[0].reset();
        success_noti();
        const product_id = res.data.product_id;
        // Redirect to product variant page
        router.push({
            path: '/post/pdflist',
        });

    }).catch(error => {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            // Handle other types of errors here
            console.error("An error occurred:", error);
        }
    });
};

const success_noti = () => {
    //alert("Your data has been successfully inserted.");
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Your data has been successfully inserted."
    });
};


const removeImages = (id) => {

    axios.get(`/dropshippingpro/additionaIMagesDelete`, {
        params: {
            images_id: id
        }
    }).then(response => {
        // Handle response if needed
        // For example, you might want to show a message or update data
        productrow();
    }).catch(error => {
        console.error('Error removing image:', error);
    });
};
//Find Product Row
const productrow = () => {
    const id = router.currentRoute.value.query.parameter;
    axios.get(`/post/epdfRow/${id}`).then(response => {
        console.log("Status: " + response.data.data.status);
        insertdata.id = response.data.data.id;
        insertdata.categoryId = response.data.data.categoryId;
        categoryId.value = response.data.data.categoryId;
        insertdata.name = response.data.data.name;
        insertdata.status = response.data.data.status;
        insertdata.description_full = response.data.data.description_full
        insertdata.download_link = response.data.data.download_link
        previewUrl.value = response.data.images;
        const uploadurl = response.data.images;


        previewUrl.value = uploadurl;
        isPdf.value = uploadurl && uploadurl.endsWith('.pdf'); // Check if the file is a PDF

        if (summernoteEditorShort.value) {
            // Initialize Summernote
            const editor = window.$(summernoteEditorShort.value);
            editor.summernote({
                callbacks: {
                    onChange: handleEditorChange
                }
            });
            editor.summernote('code', response.data.data.description_short);
        }

        if (summernoteEditorFull.value) {
            // Initialize Summernote
            const editor = window.$(summernoteEditorFull.value);
            editor.summernote({
                callbacks: {
                    onChange: handleEditorChangeFull
                }
            });
            editor.summernote('code', response.data.data.description_full);
        }

    });
};

const handleEditorChange = (content) => {
    summernoteEditorShort.value = content;
    // Handle editor content change here
};

const handleEditorChangeFull = (content) => {
    summernoteEditorFull.value = content;
    // Handle editor content change here
};

// Call the loadeditor function when the component is mounted
onMounted(async () => {
    productrow();
    allPostCategory();

    $(summernoteEditorShort.value).summernote({
        callbacks: {
            onChange: (contents) => {
                descriptionShort.value = contents;
            }
        }
    });

    $(summernoteEditorFull.value).summernote({
        callbacks: {
            onChange: (contents) => {
                descriptionFull.value = contents;
            }
        }
    });

});
// 
</script>

<style scoped>
.required-label::after {
    content: "\2605";
    color: red;
    margin-right: 4px;
}

/* CSS */
ol,
ul {
    padding-left: 0rem;
}

ul {
    list-style: none;
}

.bgColor {
    background-color: #c8c8c8;
    padding: 1px;
    border-radius: 2px;
}

.img-fluid {
    width: 300px;
    height: 150px;
}

.img-fluids {
    margin-top: 10px;
    width: 300px;
    height: 300px;
}

/* for checkbox */
.multiselect {
    position: relative;
    font-family: Arial, sans-serif;
    width: 100%;
}

.select-box {
    border: 1px solid #ccc;
    padding: 8px;
    cursor: pointer;
    background-color: #fff;
}

.dropdown {
    border: 1px solid #ccc;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: #fff;
    z-index: 1;
}

label {
    display: block;
    padding: 5px;
}

input[type="checkbox"] {
    margin-right: 8px;
}

.widthtxtbox {
    width: 50px;
}

.autocomplete-list {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 100%;
}

.autocomplete-item {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.autocomplete-item:hover {
    background-color: #f2f2f2;
}

.checkbox-wrapper {
    display: flex;

}
</style>