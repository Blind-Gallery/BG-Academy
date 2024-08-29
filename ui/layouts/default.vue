<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div>
    <header ref="header" class="tw-sticky tw-top-0 tw-py-4 tw-z-[1020] tw-px-2">
      <layout-PxHeader />
    </header>

    <notifications position="bottom right" />

    <Nuxt :style="mainContentStyle" />
    <footer ref="footer" class="tw-bg-gray-100">
      <layout-PxFooter />
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainContentStyle: {}
    }
  },
  mounted () {
    this.updateMainContentMinHeight()
    window.addEventListener('resize', this.updateMainContentMinHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateMainContentMinHeight)
  },
  methods: {
    updateMainContentMinHeight () {
      const headerHeight = this.$refs.header.offsetHeight
      const footerHeight = this.$refs.footer.offsetHeight

      const minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`

      this.mainContentStyle = {
        minHeight
      }
    }
  }
}
</script>

<style>
.main-content {
  min-height: calc(100vh - var(67px) - var(132px));
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: Poppins, Arial, Helvetica, sans-serif;
}

.course-route {
  text-decoration: none;
  color: inherit;
}

.course-route:hover {
  text-decoration: none;
  color: inherit;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

header {
  background-color: #fff;
  padding: 0.25rem 0rem;
}
a {
  color: #00b9cd;
}

a:hover {
  color: #009cad;
}

h1 {
  font-weight: bold;
}

h2,
h3,
h4,
h5 {
  font-weight: 600;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
}

.primary-btn {
  background-color: #00b9cd;
  border-radius: 5px;
  border: none;
  border: 1px solid #00b9cd;
  color: #fff;
  padding: 0.5rem 1.25rem;
  transition: all 0.3s;
}

.primary-btn:hover {
  background-color: #009cad;
  border: 1px solid #009cad;
}

.secondary-btn {
  border: 1px solid #00b9cd;
  border-radius: 5px;
  color: #00b9cd;

  background-color: #fff;
  padding: 0.5rem 1.25rem;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background-color: #f7f7f7;
}

.secondary-btn-black {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  min-width: 120px;
}

.secondary-btn-black:hover {
  background-color: #ffffff;
  color: #1a374b;
}

.tertiary-btn {
  background-color: transparent;
  border: none;
  color: #888888;
}

.modal-content {
  padding: 1rem;
}

.modal-header > h2 {
  font-size: 32px;
  font-weight: bold;
  color: #00b9cd;
}

.divider {
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0rem;
}

.divider > hr {
  margin: 0px;
  height: 1px;
  border: none;
  flex: 1 1 0%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.divider > span {
  font-size: small;
  color: #888888;
  padding: 0.3rem;
}

.invalid-feedback {
  font-size: small;
}

.header-pfp{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
}

@media (max-width: 425px) {
  .main-menu .nav-item,
  .main-menu .nav-item .primary-btn,
  .nav-item .secondary-btn {
    width: 100%;
  }
}
</style>
