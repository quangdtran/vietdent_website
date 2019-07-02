/* eslint-disable indent */
/* eslint-disable no-undef */

function setCookie (cookie) {
  let cookieAll = cookie.split('; ');
  let date = new Date();
  date.setTime(date.getTime() + 60 * 24 * 60 * 60 * 1000);
  for (let el of cookieAll) {
    el = el.split('=');
    let name = el[0];
    let value = el[1];
    document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/' + ';domain=0.0.0.0';
  }
  console.log('Đã chèn thành công !!');
}

$(document).ready(function () {
  // set vietnamese
  $('#lang-vi').on('click', function (evt) {
    evt.preventDefault();
    setCookie('lang=vietnamese');
    window.location.reload();
  });

  // set english
  $('#lang-en').on('click', function (evt) {
    evt.preventDefault();
    setCookie('lang=english');
    window.location.reload();
  });
});
