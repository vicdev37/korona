import module from './module'
import jquery from 'jquery'
import 'jquery-mask-plugin'
window.$ = window.jQuery = jquery;


$(document).ready(() => {
  console.log($('body'))
  module()
  $(".header-call").click(function () {
    $(".popup-call").show();
  });

  $('.form-close ').click(function () {
    $(".popup-call").hide();
  });

  $(document).mouseup(function (e) {
    let div = $(".modal-content");
    if (!div.is(e.target) &&
      div.has(e.target).length === 0) {
      $(".popup-call").hide();
    }
  });

  $(function () {
    $("input[name=phone]").mask("+7(999) 999-99-99");
  });





  $('#form').on('submit', function (event) {
    event.preventDefault()
    let name = $('#name').val().trim();
    let phone = $('#phone').val().trim();


    const createHtmlForEmail = () => {
      return `<div>
          <div>
            name: <b>${name}</b>
          </div>
          <div>
            phone: <b>${phone}</b>
          </div>
        </div>`
    }

    if (phone == '') {
      $('#errorMassage').text("Введите контактные данные")
      return false;
    }
    $('#errorMassage').text('')


    const letterData = {
      to: 'justicejesus1237@gmail.com',
      subject: 'Форма заполнена',
      text: 'yo',
      html: createHtmlForEmail()
    }


    $.ajax({
      url: 'https://api.42.works/mailer',
      type: 'POST',
      cache: false,
      data: JSON.stringify(letterData),
      beforeSend: function () {
        $('.modal-submit').prop("disabled", true)
      },
      success: function (data) {
        if (!data) {
          alert('Произошла ошибка')
        } else {
          $('#form').trigger("reset")
        }
        $('.modal-submit').prop("disabled", false)
      },
      contentType: "application/json; charset=utf-8",
    });
  });


  $(".menu-btn").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("menu-btn_active");
    $(".header-nav__mobile").toggleClass("menu_active");
    $(".menu-overlay").toggleClass("menu-overlay-active");
  });


})