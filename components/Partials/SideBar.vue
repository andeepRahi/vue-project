<template>
    <aside class="main-sidebar sidebar-dark-warning elevation-4">
    <!-- Brand Logo -->
    <a href="" class="brand-link bg-primary pb-2 d-flex justify-content-center">
        <img src="" alt="BPC Logo" class="brand-image brand-text">
    </a>
    <div class="clearfix"></div>

    <div class="sidebar">
        <!-- Sidebar user (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="" width="50" height="50" class="img-circle" />
            </div>
            <div class="info">
                <a href="" onclick="prevent(event)" class="d-block"></a>
            </div>
        </div>
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                <li class="nav-item">
                    <a href="/bpc-admin/" class="nav-link ">
                        <i class="fas fa-tachometer-alt nav-icon"></i>
                        <p>Dashboards</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="" class="nav-link">
                    <i class="fas fa-bars nav-icon"></i>
                        <p>Categories</p>
                    </a>
                </li>
                <li class="nav-item has-treeview  ">
                <a href="#" class="nav-link">
                <i class="fas fa-user-circle nav-icon"></i>
                        <p>Users<i class="right fa fa-angle-left"></i></p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="" class="nav-lin" >
                                <i class="nav-icon"></i>
                                <p>All Users</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link ">
                                <i class="nav-icon"></i>
                                <p>Add New</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                            <i class="nav-icon"></i>
                                <p>Roles</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link ">
                            <i class="nav-icon"></i>
                                <p>Permissions</p>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="nav-item has-treeview">
                <a href="#" class="nav-link">
                <i class="fab fa-acquisitions-incorporated"></i>
                        <p>Questions Sets<i class="right fa fa-angle-left"></i></p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                             <router-link :to="{ name: 'sets'}" class="nav-link ">
                                <i class="nav-icon"></i>
                                <p>All Sets</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link ">
                            <i class="nav-icon"></i>
                                <p>Questions</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                            <i class="nav-icon"></i>
                                <p>Types</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item has-treeview ">
                    <a href="#" class="nav-link">
                        <i class="fas fa-sliders-h nav-icon"></i>
                        <p>Configuration<i class="right fa fa-angle-left"></i></p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/bpc-admin/settings" class="nav-link">
                                <i class="fas fa-cog nav-icon"></i>
                                <p>Settings</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="/admincp/users" class="nav-link" >
                        <i class="fas fa-power-off nav-icon"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>

</template>

<script>
export default {

}
</script>

<style>

</style>
