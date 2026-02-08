<template>
    <title>Product List</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Products Management</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Dashboard</LazyNuxtLink>
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content">
                <div class="container-fluid">

                    <div class="page_top  my-2">
                        <div class="row justify-content-between align-items-center my-2">
                            <div class="col-md-11">
                                <div class="row">
                                    <div class="col-lg-6 col-md-8 col-sm-12 mb-2">
                                        <input type="text" v-model="searchQuery" class="form-control"
                                            placeholder="Search Product" />
                                    </div>

                                    <div class="col-lg-2 col-md-3 col-sm-6 mb-2">
                                        <select v-model="selectedFilter" class="form-control" @change="filterData">
                                            <option value="1">Active Products</option>
                                            <option value="0">Inactive Products</option>
                                        </select>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                        <button @click="filterData()" class="btn btn-primary w-100">Filter</button>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                        <LazyNuxtLink to="/productmanagement/addproduct" class="btn btn-primary w-100">
                                            <i class="fas fa-plus"></i>Add
                                        </LazyNuxtLink>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                    <!-- table section start here  -->
                    <div class="card">
                        <!-- /.card-header -->
                        <div class="card-body table-responsive p-0">
                            <div class="filter_options">
                                <div class="loading-indicator" v-if="loading" style="text-align: center;">
                                    <Loader />
                                </div>
                            </div>
                            <table class="table w-100 table-wrapper">
                                <thead>
                                    <tr>
                                        <th class="text-left">SL</th>
                                        <th class="text-left">Category</th>
                                        <th class="text-left">Sub Category</th>
                                        <th class="text-left">Product Name</th>
                                        <th class="text-center">Sales price($)</th>
                                        <th class="text-center">Profit($)</th>
                                        <th class="text-center">Buying Price($)</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(pro, index) in productdata" :key="index">
                                        <td class="text-left">{{ pro.id }}</td>
                                        <td class="text-left">{{ pro.mainCategory }}</td>
                                        <td class="text-left">{{ pro.subCategory }}</td>
                                        <td class="text-left">{{ pro.name }}</td>
                                        <td class="text-center">{{ pro.selling_price }}</td>
                                        <td class="text-center">{{ pro.profit }}</td>
                                        <td class="text-center">{{ pro.buying_price }}</td>
                                        <td>
                                            <center>
                                                <div class="btn-group">
                                                    <button class="btn btn-default btn-sm btn-flat"
                                                        @click="edit(pro.id)"><i class="fas fa-edit"></i>Edit</button>
                                                    <button class="btn btn-default btn-sm btn-flat"
                                                        @click="preview(pro.id)"><i
                                                            class="fas fa-history"></i>Preview</button>
                                                </div>

                                            </center>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th class="text-left">SL</th>
                                        <th class="text-left">Category</th>
                                        <th class="text-left">Sub Category</th>
                                        <th class="text-left">Product Name</th>
                                        <th class="text-center">Sales price($)</th>
                                        <th class="text-center">Profit($)</th>
                                        <th class="text-center">Buying Price($)</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </tfoot>
                            </table>
                            <center>
                                <div class="pagination" style="text-align: center">
                                    <button :disabled="currentPage === 1" @click="fetchData(currentPage - 1)">
                                        Previous
                                    </button>
                                    <template v-for="pageNumber in displayedPages" :key="pageNumber">
                                        <button @click="fetchData(pageNumber)">
                                            {{ pageNumber }}
                                        </button>
                                    </template>
                                    <button :disabled="currentPage === totalPages" @click="fetchData(currentPage + 1)">
                                        Next
                                    </button>
                                </div>
                            </center>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- table section end here  -->
                </div>

            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

definePageMeta({
    middleware: 'is-logged-out',
})

const router = useRouter();
const loading = ref(false);
const currentPage = ref(1);
const pageSize = 10;
const totalRecords = ref(0);
const totalPages = ref(0);
const productdata = ref([]);
const searchQuery = ref(""); // Add a ref for the search query
const selectedFilter = ref(1); // Add a ref for the search query

const fetchData = async (page) => {
    try {
        loading.value = true;
        const response = await axios.get(`/product/getProductList`, {
            params: {
                page: page,
                pageSize: pageSize,
                searchQuery: searchQuery.value, // Pass the search query parameter
                selectedFilter: selectedFilter.value, // Pass the search query parameter
            },
        });
        productdata.value = response.data.data;
        totalRecords.value = response.data.total_records;
        totalPages.value = response.data.total_pages;
        currentPage.value = response.data.current_page;
    } catch (error) {
        // Handle error
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData(currentPage.value);
});

// Watch for changes in current page and fetch data accordingly
watch(currentPage, (newPage) => {
    fetchData(newPage);
});

// Define a method to handle editing
const edit = (id) => {

    router.push({
        path: '/productmanagement/editproduct',
        query: {
            parameter: id
        }
    });

    // Your logic for editing goes here
    console.log('Editing item with id:', id);
};

// Define a method to handle deleting
const deleteProduct = (id) => {
    // Your logic for deleting goes here
    console.log('Deleting item with id:', id);
};

// Define a method to handle previewing
const preview = (id) => {
    router.push({
        path: '/productmanagement/preview',
        query: {
            parameter: id
        }
    });
    console.log('Previewing item with id:', id);
};

// Compute the range of displayed pages
const displayedPages = computed(() => {
    const maxDisplayedPages = 10; // Maximum number of displayed pages
    const startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxDisplayedPages / 2)
    );
    const endPage = Math.min(
        totalPages.value,
        startPage + maxDisplayedPages - 1
    );
    return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );
});


const filterData = () => {
    fetchData(1); // Reset to first page when search query changes
};
</script>


<style>
.pagination {
    display: inline-block;
    text-align: center;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #2f2f2f;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination button:hover {
    background-color: #0056b3;
}

.pagination button[disabled] {
    background-color: #6c757d;
    cursor: not-allowed;
}

.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 0.5rem;
}

.btnSize {
    font-size: 12px;
    padding: 3px;
}

/* Table */
.table-wrapper {
    width: 100%;
    /* max-width: 500px; */
    overflow-x: auto;
}

.table td,
.table th {
    padding: .2rem;
    vertical-align: top;
    border-top: 1px solid #dae2ea;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 1px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr:hover {
    background-color: rgb(221, 221, 221);
}
</style>
