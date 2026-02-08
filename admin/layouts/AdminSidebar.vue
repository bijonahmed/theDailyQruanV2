<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <!-- <center>
       ==={{ isActive }}===
      </center> -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li v-for="(menuItem, index) in menuItems" :key="index"
            :class="{ 'nav-item': true, 'menu-open': menuItem.children }">
            <router-link :to="menuItem.route ? menuItem.route : '#'" class="nav-link">
              <i :class="'nav-icon fas ' + menuItem.icon"></i>
              <p>
                {{ menuItem.label }}
                <i v-if="menuItem.children" class="right fas fa-angle-left"></i>
              </p>
            </router-link>

            <ul v-if="menuItem.children" class="nav nav-treeview">
              <li v-for="(childItem, childIndex) in menuItem.children" :key="childIndex" class="nav-item">
                <router-link :to="childItem.route" class="nav-link">
                  <p>{{ childItem.label }}</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const isActive = ref(null);
//const userStatusIsAdmin = computed(() => userStore.status === 1);
const fetchData = async () => {
  try {
    const response = await axios.post(`/auth/me`);
    console.log("====" + response.data.status);
    isActive.value = response.data.status;
  } catch (error) {
    console.log("--------------------" + error);
    // Handle error
  } finally {
  }
};
onMounted(async () => {
  fetchData();
});
const menuItems = ref([
  {
    label: "Dashboard",
    icon: "fa-home",
    badge: "New",
    open: false,
    route: "/admin/dashboard",
    children: null,
  },
  {
    label: "Profile",
    icon: "fa-th",
    badge: "New",
    open: false,
    route: "/user/my-profile",
    children: null,
  },
  {
    label: "User Management",
    icon: "nav-icon fas fa-users",
    badge: "6",
    open: false,
    route: null,
    children: [
      //{ label: 'Partners Downline', icon: 'fa-circle', route: '/usermanagement/store-management' },
      {
        label: "Super Admin list",
        icon: "fa-circle",
        route: "/usermanagement/superadmin-list",
      },
      // {
      //   label: "Admin list",
      //   icon: "fa-circle",
      //   route: "/usermanagement/admin-list",
      // },
      {
        label: "User list",
        icon: "fa-circle",
        route: "/usermanagement/userlist",
      },
      //{ label: 'Order History', icon: 'fa-circle', route: '/usermanagement/order-management' },
      //{ label: 'Bulk Order Status ', icon: 'fa-circle', route: '/usermanagement/bulk-order-status' },
      //{ label: 'Create Bulk Order ', icon: 'fa-circle', route: '/usermanagement/bulk-order' },
      //{ label: 'Manual dispatch', icon: 'fa-circle', route: '#'},
      //{ label: 'Agent list', icon: 'fa-circle', route: '/usermanagement/agent-list' },
    ],
  },

  {
    label: 'Post Management',
    icon: 'fa-folder',
    badge: '',
    open: false,
    route: null,
    children: [
      { label: 'Torrent List', icon: 'fa-circle', route: '/post/torrentlist' },
      { label: 'ePDF List', icon: 'fa-circle', route: '/post/pdflist' },
      { label: 'Post List', icon: 'fa-circle', route: '/post/postlist' },

    ]
  },


  //new menu
  {
    label: "System settings",
    icon: "nav-icon fas fa-cog",
    badge: "6",
    open: false,
    route: null,
    children: [
      { label: "Pre-Setting", icon: "fa-circle", route: "/setting/presetting" },
      {
        label: "Categories",
        icon: "fa-circle",
        route: "/productmanagement/categorylist",
      },
      {
        label: "ePDF Category",
        icon: "fa-circle",
        route: "/setting/ePdf/ePdf-category-list",
      },
      //{ label: "Community List", icon: "fa-circle", route: "/setting/community/list", },
      // { label: "Service Images", icon: "fa-circle", route: "/slider/list" },
      { label: 'Service List', icon: 'fa-circle', route: '/service/servicelist' },

      //{ label: 'System Configaration', icon: 'fa-circle', route: '#' },
      //{ label: 'Store Information', icon: 'fa-circle', route: '#' }
    ],
  },

  {
    label: "Wallet Management",
    icon: "nav-icon fas fa-cog",
    badge: "6",
    open: false,
    route: null,
    children: [
      //{ label: "Withdrawal Address", icon: "fa-circle", route: "/walletmanagement/withdrawal-address", },
      //{ label: "Manual Adjustment report", icon: "fa-circle", route: "/walletmanagement/manual-adjustment-report", },
     // { label: "Create Manual adjustment", icon: "fa-circle", route: "/walletmanagement/manual-adjustment",},
    //{ label: "User wallet", icon: "fa-circle", route: "/walletmanagement/user-wallet", },
    { label: "Deposit History ", icon: "fa-circle", route: "/walletmanagement/deposit-management", },
      //{ label: "Withdrawal History", icon: "fa-circle", route: "/walletmanagement/withdrawal-management",},
      // { label: 'Account details ', icon: 'fa-circle', route: '/walletmanagement/account-details' },
    ],
  },
]);

const toggleMenu = (item) => {
  item.open = !item.open;
};
</script>
<style>
body:not(.layout-fixed) .main-sidebar {
  min-height: 100vh;
  position: fixed;
}

.disabled {
  pointer-events: none;
  color: #ccc;
}
</style>