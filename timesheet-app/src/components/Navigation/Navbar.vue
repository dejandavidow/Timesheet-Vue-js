<template>
  <nav class="navbar navbar-expand-lg bg-light mt-5 mb-2">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Timesheet App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link navlinkcolors" to="/">Timesheets</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link navlinkcolors" to="/categories">Categories</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link navlinkcolors" to="/clients">Clients</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link navlinkcolors" to="/projects">Projects</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link navlinkcolors" to="/members">Members</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link navlinkcolors" to="reports">Reports</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {

}
</script>

<style>
.navlinkcolors {
  color: orange;
}
</style>