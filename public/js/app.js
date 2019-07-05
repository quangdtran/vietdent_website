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
    document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/' + ';domain=' + window.location.hostname;
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

  // initial:
  console.log('path: ', window.location);
  const url = window.location.pathname + window.location.search;
  $('#current-url-value').val(url);

  $('.close-my-alert').on('click', function () {
    $('#wrap-my-alert').css({ display: 'none' });
    var pathname = url.split('?')[0];
    let search = url.split('?')[1];
    let querystring = '';
    if (search) {
      search.split('&').forEach(param => {
        if (!param.includes('popup')) {
          querystring += (querystring === '') ? ('?' + param) : ('&' + param);
        }
      });
    }
    urlRemovePopup = pathname + querystring;
    window.history.pushState(null, null, urlRemovePopup);
  });

});
