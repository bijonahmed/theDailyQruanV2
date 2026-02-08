<template>
  <title>Add Product</title>
  <div>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <p>Add Product</p>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <LazyNuxtLink to="/admin/dashboard">Dashboard</LazyNuxtLink>
                </li>
                <li class="breadcrumb-item active">
                  <LazyNuxtLink to="/productmanagement/productlist">Back to List</LazyNuxtLink>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- <button @click="pageRedirect()">Pages</button> -->
      <section class="content">
        <div class="container-fluid">
          <!-- Start -->
          <div class="card border-top border-0 border-4 border-info">
            <div class="border p-4 rounded">
              <form @submit.prevent="saveData()" id="formrest" class="forms-sample" enctype="multipart/form-data">
                <div class="card card-primary card-outline card-tabs">
                  <div class="card-header p-0 pt-1 border-bottom-0">
                    <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill"
                          href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home"
                          aria-selected="true">General</a>
                      </li>

                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-three-tabContent">
                      <div class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel"
                        aria-labelledby="custom-tabs-three-home-tab">
                        <!-- General  -->
                        <div class="row mb-3 required">
                          <label for="input-name-1" class="col-sm-2 col-form-label required-label">Product Name</label>
                          <div class="col-sm-10">
                            <input type="text" name="name" placeholder="Product Name" v-model="insertdata.name"
                              class="form-control" />
                            <input type="hidden" name="id" id="id" class="form-control" />
                            <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label for="input-description-1" class="col-sm-2 col-form-label">Short. Description</label>
                          <div class="col-sm-10">
                            <div ref="summernoteEditorShort" style="height: 100%;"></div>

                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="input-description-1" class="col-sm-2 col-form-label">Full Description</label>
                          <div class="col-sm-10">
                            <div ref="summernoteEditorFull" style="height: 100%;"></div>
                          </div>
                        </div>
                        <hr />
                        <div class="row mb-3">
                          <label for="input-description-1" class="col-sm-2 col-form-label">Category</label>
                          <div class="col-sm-10">

                            <select v-model="selectedParentCategory" @change="updateSubCategories" class="form-control">
                              <option value="" selected>Select a category</option>
                              <option v-for="category in parentCategories" :key="category.id" :value="category.id">
                                {{ category.name }}
                              </option>
                            </select>
                            <span class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</span>
                            <p v-if="showPercentaAmt">Percentage {{ showPercentaAmt }} %</p>
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label for="input-description-1" class="col-sm-2 col-form-label">Sub Category</label>
                          <div class="col-sm-10">
                            <select v-if="subCategories" v-model="selectedsubCategory" class="form-control mt-2">
                              <option value="" selected>Select a category</option>
                              <option v-for="category in subCategories" :key="category.id" :value="category.id">
                                {{ category.name }}
                              </option>
                            </select>
                            <span class="text-danger" v-if="errors.subcategory_id">{{ errors.subcategory_id[0] }}</span>
                            
                          </div>
                        </div>
                        <hr />
                        <div class="row mb-3 d-none">
                          <label for="input-meta-description-1"
                            class="col-sm-2 col-form-label required-label">Categories</label>

                          <div class="col-sm-10">
                            <div>
                              <!-- ======{{ searchResults }}===== -->
                              <input v-model="categories" @input="search" class="form-control"
                                placeholder="Search..." />

                              <span class="text-danger" v-if="errors.category">{{ errors.category[0] }}</span>

                              <ul>

                                <li v-for="result in searchResults" :key="result.name">
                                  {{ result.category }}
                                  <span style="color: red;" v-if="result.percentage_amt">[{{ result.percentage_amt
                                    }}%]</span>

                                  <a href="javascript:void(0);" @click="addToSelected(result)"><i
                                      class="fas fa-plus"></i></a>
                                </li>
                              </ul>

                              <span class="d-none">
                                <textarea v-model="multi_categories" placeholder="Selected Value"
                                  class="w-100"></textarea>
                              </span>
                              <div v-if="selectedItems.length" class="bgColor">
                                <hr />
                                <div v-for="item in selectedItems" :key="item.id">
                                  {{ item.category }}
                                  <a href="javascript:void(0);" @click="removeFromSelected(item)"><i
                                      class="fas fa-trash-alt"></i></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mb-3 required">
                          <label for="input-meta-title-1" class="col-sm-4 col-form-label required-label">Selling
                            Price</label>
                          <div class="col-sm-8">
                            <input type="text" placeholder="Price" v-model="insertdata.selling_price"
                              class="form-control" @input="validateInput" @keyup="calculatePercentage()" />
                            <span class="text-danger" v-if="errors.selling_price">{{ errors.selling_price[0] }}</span>
                          </div>
                        </div>
                        <div class="row mb-3 required">
                          <label for="input-meta-title-1" class="col-sm-4 col-form-label">Profit</label>
                          <div class="col-sm-8">
                            <input type="text" placeholder="" v-model="insertdata.profit" class="form-control"
                              @input="validateInput" />
                            <span class="text-danger" v-if="errors.profit">{{ errors.profit[0] }}</span>
                          </div>
                        </div>

                        <div class="row mb-3 required">
                          <label for="input-meta-title-1" class="col-sm-4 col-form-label required-label">Buying
                            Price</label>
                          <div class="col-sm-8">
                            <input type="text" placeholder="" v-model="insertdata.buying_price" class="form-control"
                              @input="validateInput" />
                            <span class="text-danger" v-if="errors.buying_price">{{ errors.buying_price[0] }}</span>
                          </div>

                        </div>
                        <hr />

                        <div class="alert alert-info" bis_skin_checked="1">
                          <i class="fas fa-info-circle"></i> Must Upload
                          Products Images 300x300px
                        </div>
                        <div class="row mb-3 required">
                          <label for="input-meta-description-1" class="col-sm-2 col-form-label required-label">Thumbnail
                            Image</label>
                          <div class="col-sm-10">
                            <input type="file" value class="form-control" id="fileInput" accept="image/png,image/jpeg"
                              ref="files" @change="onFileSelected" />
                            <span class="text-danger" v-if="errors.files">{{
                errors.files[0]
              }}</span>
                            <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="img-fluids" />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="input-meta-description-1" class="col-sm-2 col-form-label">Additional Image</label>
                          <div class="col-sm-10">
                            <input type="file" multiple class="form-control" accept="image/png,image/jpeg"
                              @change="handleImageUpload" id="fileInput" />
                            <div class="row mt-3">
                              <div class="col-md-3" v-for="(image, index) in images" :key="index">
                                <div class="card">
                                  <img :src="image.url" class="card-img-top img-fluid" alt="Preview" />
                                  <div class="card-body">
                                    <button type="button" class="btn btn-danger btn-sm" @click="removeImage(index)">
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
import 'summernote/dist/summernote-bs4.js';
import 'summernote/dist/summernote-bs4.css';
const router = useRouter()
window.Swal = swal;
const insertdata = reactive({
  name: '',
  selling_price: '',
  profit: '',
  buying_price: '',
  images: '',
  status: 1,
});
// Define a ref to store the HTML content of the editor

const descriptionShort = ref('');
const descriptionFull = ref('');

const previewUrl = ref(null);
const images = ref([]);
const percetage_amount = ref([]);
const allCategories = ref([]);
const selectedsubCategory = ref('');
const subCategories = ref([]);
const multi_categories = ref('');
const totalPercentageAmt = ref('');
const selectedItems = ref([]);
const categories = ref('');
const showPercentaAmt = ref('');
const searchResults = ref([]);
//const description = ref('');
const notifmsg = ref('');
const file = ref(null);
const files = ref(null);
const errors = ref({});
const summernoteEditorShort = ref({});
const summernoteEditorFull = ref({});
const selectedParentCategory = ref('');


const parentCategories = computed(() => {
  return allCategories.value.filter(allCategories => allCategories.parent_id === 0);
});

const updateSubCategories = async () => {
  const categoryId = selectedParentCategory.value;

  try {
    const response = await axios.get(`/category/getCategoryUnderSubCat?categoryId=${categoryId}`);
    //Show Calcuation
    console.log("category: " + response.data.category);
    totalPercentageAmt.value = response.data.category.percentage_amt;
    showPercentaAmt.value = response.data.category.percentage_amt;
    //Show Sub Category
    subCategories.value = response.data.subcategory;

  } catch (error) {
    console.error(error);
  }

};

// Initialize Summernote editor

definePageMeta({
  middleware: 'is-logged-out',
})

onMounted(() => {

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

// Define your methods
const search = async () => {
  try {
    const response = await axios.get(`/category/search?term=${categories.value}`);
    // console.log(response.data);
    searchResults.value = response.data;

  } catch (error) {
    console.error(error);
  }
};

const allcategory = async () => {
  try {
    const response = await axios.get(`/category/allCategorys`);
    allCategories.value = response.data;

  } catch (error) {
    console.error(error);
  }
};

const validateInput = () => {
  const fieldsToValidate = ['selling_price', 'profit', 'buying_price'];
  fieldsToValidate.forEach(field => {
    if (!/^[+-]?\d*\.?\d*$/.test(insertdata[field])) {
      insertdata[field] = insertdata[field].slice(0, -1);
    }
  });
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
      if (img.width === 300 && img.height === 300) {
        previewUrl.value = e.target.result;
      } else {
        alert('Image dimensions must be 300x300 pixels.');
      }
    };
  };
  reader.readAsDataURL(file);
  //resetInput();
};

const addToSelected = (result) => {
  selectedItems.value.push(result);
  multi_categories.value = selectedItems.value.map((item) => item.id).join(",");
  console.log("selectedItems.value:", selectedItems.value);
  let total_per_amt = selectedItems.value.filter(item => typeof item.percentage_amt === 'number' || !isNaN(parseFloat(item.percentage_amt)))
    .reduce((total, item) => total + parseFloat(item.percentage_amt), 0);
  //console.log("totalPercentageAmt:", total_per_amt); // Log the sum to see the result
  totalPercentageAmt.value = total_per_amt;

};

const calculatePercentage = () => {
  let s_price = insertdata.selling_price;
  const percetage_amount = (totalPercentageAmt.value * insertdata.selling_price) / 100;
  insertdata.profit = percetage_amount.toFixed(2);
  console.log("selling price : " + s_price + "profit:" + insertdata.profit);
  insertdata.buying_price = s_price - insertdata.profit;
}

const removeFromSelected = (item) => {
  insertdata.profit = "";
  const index = selectedItems.value.indexOf(item);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
    updatemulti_categories();

  }
};

const updatemulti_categories = () => {
  multi_categories.value = selectedItems.value.map((item) => item.id).join(",");
};

const previewImage = (event) => {
  const file = event.target.files[0];
  previewUrl.value = URL.createObjectURL(file);
  checkImageDimensionsThunbnail(file);
};

const onFileSelected = (event) => {
  previewImage(event)
  file.value = event.target.files[0];
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
  //console.log("---cate---" + selectedParentCategory.value);
  //console.log("---sub cate---" + selectedsubCategory.value);
  formData.append('files', file.value);
  formData.append('name', insertdata.name);
  formData.append('category_id', selectedParentCategory.value);
  formData.append('subcategory_id', selectedsubCategory.value);
  //formData.append('category', multi_categories.value);
  formData.append('description_short', descriptionShort.value);
  formData.append('description_full', descriptionFull.value);
  formData.append('selling_price', insertdata.selling_price);
  formData.append('profit', insertdata.profit);
  formData.append('buying_price', insertdata.buying_price);

  //console.log(formData);

  axios.post('/dropshippingpro/save', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    $('#formrest')[0].reset();
    success_noti();
    const product_id = res.data.product_id;
    // Redirect to product variant page
    router.push({
      path: '/productmanagement/preview',
      query: {
        parameter: product_id
      }
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
const filteredCategories = computed(() => {
  return allCategories.value.filter(category => category.parent_id === 0);
});

onMounted(() => {
  if (process.client) {
    allcategory();

  }
});

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
</style>
