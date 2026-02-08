<template>
    <title>Product List</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Product List</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                                </li>
                                <li class="breadcrumb-item active">
                                    <LazyNuxtLink to="/post/postlist">Back to List</LazyNuxtLink>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content">
                <div class="container-fluid">

                    <div class="col-xl-12 mx-auto">
                        <div class="card border-top border-0 border-4 border-info">
                            <div class="card-body">
                                <div class="border p-4 rounded">
                                    <div class="card">

                                        <div class="row">
                                            <div class="col-md-12">
                                                <table class="table table-bordered w-100">
                                                    <tr>
                                                        <td width="40%">Product Name</td>
                                                        <td width="1%"><strong>:</strong></td>
                                                        <td width="50%">{{ productData.name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Full Description</td>
                                                        <td><strong>:</strong></td>
                                                        <td class="description_full"></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Category</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.category_name }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Meta Title</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.meta_title }}</td>
                                                    </tr>


                                                    <tr>
                                                        <td>Meta Description</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.meta_description }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Meta Keyword</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.meta_keyword }}</td>
                                                    </tr>
                                                   

                                                    
                                                </table>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="row">

                                        <div class="col-md-3">
                                            <div class="alert alert-primary" role="alert">
                                                <center><small>Thumbnail Images</small></center>
                                                <hr />
                                                <img :src="productImg" alt="N/A"
                                                    class="img-fluid max-width-100 img-thumbnail" />
                                            </div>
                                        </div>

                                         

                                    </div>

                                    <!-- END -->
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
const router = useRouter();
import axios from 'axios';
import swal from 'sweetalert2';
window.Swal = swal;

definePageMeta({
    middleware: 'is-logged-out',
})
const productData = ref({
  name: '',
  categoryId: '',
  meta_title: '',
  meta_description: '',
  meta_keyword: '',
  images: '',
  status: 1,
});


const productImg = ref('');
const productDetails = () => {
    const product_id = router.currentRoute.value.query.parameter;
    axios.get(`/post/postrow/${product_id}`).then(response => {
        //console.log("====" + response.data.data.name);
        productData.value.name = response.data.data.name;
        productData.value.category_name = response.data.data.category_name;

        productData.value.meta_title = response.data.data.meta_title;
        productData.value.meta_description = response.data.data.meta_description;
        productData.value.meta_keyword = response.data.data.meta_keyword;

        productData.value.categoryId = response.data.data.categoryId;
        productImg.value = response.data.images;
        $(".description_full").html(response.data.data.description_full);
    });
};

onMounted(() => {
    productDetails();
   
});
</script>

<style scoped>
.scrollable-container {
    max-height: 400px;
    /* Adjust the maximum height as needed */
    overflow-y: auto;
    border: 1px solid #dddddd;
    /* Optional: Add a border for styling */
    padding: 8px;
    /* Optional: Add padding for better appearance */
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 1px;
}

th {
    background-color: #f2f2f2;
}

.marleft {
    margin-left: -7px;
}

.output-container {
    white-space: pre-line;
    margin-left: -7px;
}
</style>
