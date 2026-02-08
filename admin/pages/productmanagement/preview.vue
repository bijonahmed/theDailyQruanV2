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
                                                        <td>Short Description</td>
                                                        <td><strong>:</strong></td>
                                                        <td class="description_short"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Full Description</td>
                                                        <td><strong>:</strong></td>
                                                        <td class="description_full"></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Selling Price</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.selling_price }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Profit</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.profit }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Buying Price</td>
                                                        <td><strong>:</strong></td>
                                                        <td>{{ productData.buying_price }}</td>
                                                    </tr>



                                                    <tr>
                                                                <td>Categories</td>
                                                                <td><strong>:</strong></td>
                                                                <td>
                                                                    <div class="output-container">
                                                                        <span class="show_categorys"></span>
                                                                    </div>
                                                                </td>
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

                                        <div class="col-md-9">
                                            <div class="alert alert-primary" role="alert">
                                                Additional Images
                                                <hr />
                                                <!-- productAddImgs -->
                                                <div class="row">
                                                    <div class="col-md-2" v-for="(data, index) in productAddImgs"
                                                        :key="index">
                                                        <img :src="data.images" alt="N/A"
                                                            class="img-fluid max-width-100 img-thumbnail" />
                                                    </div>
                                                </div>

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
    id: '',
    name: '',
    description: '',
    meta_title: '',
    category_id: '',
    meta_description: '',
    meta_keyword: '',
    description: '',
    parent_id: 0,
    mobile_view_class: '',
    product_tag: '',
    discount: '',
    sku: '',
    category_id: '',
    brand_name: '',
    external_link: '',
    price: '',
    unit: '',
    stock_qty: '',
    stock_mini_qty: '',
    stock_status: '',
    free_shopping: '',
    seller_name: '',
    flat_rate_status: '',
    shipping_days: '',
    vat: '',
    vat_status: '',
    tax: '',
    tax_status: '',
    status: '',
    manufacturer: '',
    download_link: ''
});

const ticketHistory = ref([]);
const historVarient = ref([{
    varient_id: '',
    sku: '',
    qty: '',
    price: '',
    file: ''
}]);
const productImg = ref('');
const productAddImgs = ref([]);
const notifmsg = ref('');
const errors = ref({});

 
const productDetails = () => {
    const product_id = router.currentRoute.value.query.parameter;
    axios.get(`/dropshippingpro/productrow/${product_id}`).then(response => {
        const data = response.data;
        productData.value.name = data.product.name;
        productData.value.category_id = data.category_id;
        productData.value.selling_price = data.product.selling_price;
        productData.value.profit = data.product.profit;
        productData.value.buying_price = data.product.buying_price;
        $(".description_short").html(data.product.description_short);
        $(".description_full").html(data.product.description_full);
        $(".show_categorys").html(` ${data.categoryName}, ${data.scategoryName}`);
        productImg.value = data.productImg;
        productAddImgs.value = data.product_imgs;
     

    });
};

onMounted(() => {
    productDetails();
   // varientHistory();
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
