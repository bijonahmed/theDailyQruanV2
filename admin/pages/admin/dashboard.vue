<template>
    <title>Admin Dashboard</title>
    <!--start page wrapper -->

    <div class="content-wrapper mt-3" v-if="userRoleIsAdmin">
        <section class="content" v-if="userStatusIsAdmin">
            <div class="container-fluid">
                <div class="row">
                    <center>
                        <div class="loading-indicator" v-if="loading" style="text-align: center;">
                            <Loader />
                        </div>
                    </center>
                    <div class="col-md-3 col-sm-6 col-12">
                        <div class="info-box">
                            <span class="info-box-icon bg-info"><i class="fa fa-money"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Today Deposit</span>
                                <span class="info-box-number">${{ today_deposit }}</span>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-3 col-sm-6 col-12">
                        <div class="info-box">
                            <span class="info-box-icon bg-success"><i class="fa fa-money-bill"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Total Service</span>
                                <span class="info-box-number">{{ total_service }}</span>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-3 col-sm-6 col-12">
                        <div class="info-box">
                            <span class="info-box-icon bg-warning"><i class="fas fa-user-circle"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Total Users</span>
                                <span class="info-box-number">{{ total_users }}</span>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-3 col-sm-6 col-12 d-none">
                        <div class="info-box">
                            <span class="info-box-icon bg-danger"><i class="fa fa-product-hunt"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Total Products</span>
                                <span class="info-box-number">{{ total_products }}</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    </div>
    <!--end page wrapper -->
</template>

<script setup>

import { useUserStore } from '~~/stores/user'
import { storeToRefs } from 'pinia';
import axios from "axios";

const router = useRouter()
const userStore = useUserStore()
const today_deposit = ref("");
const total_service = ref("");
const total_users = ref("");
const total_products = ref("");

const { email } = storeToRefs(userStore)
const loading = ref(true)
definePageMeta({
    middleware: 'is-logged-out',

})

const userRoleIsAdmin = computed(() => userStore.role_id === 1);
const userStatusIsAdmin = computed(() => userStore.status === 1);
const fetchData = async () => {
    try {
        const response = await axios.get(`/product/dashboardCounting`);
        today_deposit.value = response.data.today_deposit;
        total_service.value = response.data.total_service;
        total_users.value = response.data.total_users;
        total_products.value = response.data.total_products;
    } catch (error) {
        // Handle error
    } finally {
        //loading.value = false;
    }
};




onMounted(async () => {
    // After 5 seconds, hide the loading indicator
    setTimeout(() => {
        loading.value = false; // Hide the loading indicator after 5 seconds
    }, 500);

    try {
        fetchData();
        await userStore.getUser()
    } catch (error) {
        //  console.log(error)
    }
})


</script>
