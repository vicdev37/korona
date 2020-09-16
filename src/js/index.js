import module from './module'
import jquery from 'jquery'
window.$ = window.jQuery = jquery;


$(document).ready(() => {
  console.log($('body'))
  console.log('a')
  module()
})

