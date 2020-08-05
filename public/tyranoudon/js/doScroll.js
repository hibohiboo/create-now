function doScroll() {
  if (window.pageYOffset === 0) {
    window.scrollTo(0, 1)
  }
}
window.onload = function () {
  setTimeout(doScroll, 100)
}
