/* eslint-disable space-before-function-paren */
/* eslint-disable no-sequences */
/* eslint-disable indent */
/* eslint-disable no-undef */

function getSlug(title) {
  var slug;

  // Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  // Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  // Xóa các ký tự đặt biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  // Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-');
  // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  // Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  // In slug ra textbox có id “slug”
  return slug;
}

(function () {


  let maxXcoordinate = 0;
  const widthBlog = 390;

  function displayBtn(isDisplay) {
    const prevBlogBtn = $('#prev-blog');
    const nextBlogBtn = $('#next-blog');
    if (isDisplay) {
      prevBlogBtn.css('display', 'block');
      nextBlogBtn.css('display', 'block');
    } else {
      prevBlogBtn.css('display', 'none');
      nextBlogBtn.css('display', 'none');
    }
  }

  function getPostTemplate(post) {
    const isEng = document.getElementById('lang-en');

    return `
      <div class="owl-item" style="width: 390px;">
        <div class="blog-item">
          <div class="blog-item-image"><img src="${post.image ? post.image.url : '/images/no-image.jpg'}" alt="" />
            <!--<div class="blog-item-date"><i class="fa fa-calendar-o"></i> 03.10.2016</div>
          <div class="blog-item-comments"><i class="fa fa-comments-o"></i> 7</div>-->
          </div>
          <div class="blog-item-title">
            <h3><a href="/post/${post._id}/5d23370dd622710023f29102/${getSlug(post.titleVie)}">${isEng ? post.titleVie : post.titleEng}</a></h3>
          </div>
          <!--<div class="blog-item-author"><a href="#">by Dr. Kaeden Bernard</a></div>-->
          <div class="blog-item-text">
            ${isEng ? post.briefVie : post.briefEng}
          </div>
          <!--<div class="blog-item-button"><a href="#" class="btn btn-primary-1">READ MORE</a></div>-->
        </div>
      </div>
    `;
  }

  function insertPostsToHtml(posts) {
    const lastPostEl = $('.owl-wrapper');
    const postsTemplate = posts.reduce(function (result, post) {
      return result + getPostTemplate(post);
    }, '');
    lastPostEl.html(postsTemplate);
  }

  function init() {

    const serviceId = $('#services ul li a').first().attr('data-service-id');
    $.get(
      `/api/posts?total=6&serviceId=${serviceId}`,
      function (posts) {
        // pending...
        console.log(posts);
        insertPostsToHtml(posts);
        const wrapPosts = $('.owl-wrapper');
        switch (posts.length) {
          case 4:
            maxXcoordinate = widthBlog;
            displayBtn(true);
            break;

          case 5:
            maxXcoordinate = widthBlog * 2;
            displayBtn(true);
            break;

          case 6:
            maxXcoordinate = widthBlog * 3;
            displayBtn(true);
            wrapPosts.css('transform', `translate3d(${maxXcoordinate}, 0px, 0px)`);
            break;

          default:

            maxXcoordinate = 0;
            displayBtn(false);
            break;
        }
      }
    );

    const wrapPosts = $('.owl-wrapper');
    let isAnimationEnd = true;

    const nextBlogBtn = $('#next-blog');

    nextBlogBtn.unbind();
    nextBlogBtn.on('click', function () {
      wrapPosts.css('transition', 'all 200ms ease 0s');

      if (isAnimationEnd) {
        isAnimationEnd = false;
        const matrix = wrapPosts.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
        if (parseInt(matrix[4]) * (-1) >= maxXcoordinate) {
          wrapPosts.css('transform', 'translate3d(0px, 0px, 0px)');
          console.log('restart blogs');
          console.log(parseInt(matrix[4]) * (-1));
          console.log(maxXcoordinate);
          return;
        }
        wrapPosts.css('transform', `translate3d(-${parseInt(matrix[4]) * (-1) + widthBlog}px, 0px, 0px)`);
      }
    });

    const prevBlogBtn = $('#prev-blog');
    prevBlogBtn.unbind();
    prevBlogBtn.on('click', function () {
      wrapPosts.css('transition', 'all 200ms ease 0s');

      if (isAnimationEnd) {
        isAnimationEnd = false;
        const matrix = wrapPosts.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
        if (parseInt(matrix[4]) * (-1) <= 0) {
          wrapPosts.css('transform', `translate3d(-${maxXcoordinate}px, 0px, 0px)`);
          console.log('restart blogs');
          return;
        }
        wrapPosts.css('transform', `translate3d(-${parseInt(matrix[4]) * (-1) - widthBlog}px, 0px, 0px)`);
      }
    });
    // document.getElementsByClassName('owl-wrapper')[0].addEventListener('webkitAnimationEnd', function (e) {
    //   isAnimationEnd = true;
    //   console.log('haha');
    // });
    wrapPosts.unbind();
    wrapPosts.on('transitionend', function () {
      isAnimationEnd = true;
    });
  }

  $(document).ready(function () {

    // init js
    init();

    const services = $('#services ul li a');
    services.first().addClass('active');

    services.on('click', function () {
      const serviceId = $(this).attr('data-service-id');
      $.get(
        `/api/posts?total=6&serviceId=${serviceId}`,
        function (posts) {
          // pending...
          // console.log(posts);
          insertPostsToHtml(posts);
          const wrapPosts = $('.owl-wrapper');
          switch (posts.length) {
            case 4:
              maxXcoordinate = widthBlog;
              displayBtn(true);
              break;

            case 5:
              maxXcoordinate = widthBlog * 2;
              displayBtn(true);
              break;

            case 6:
              maxXcoordinate = widthBlog * 3;
              displayBtn(true);
              wrapPosts.css('transform', `translate3d(${maxXcoordinate}, 0px, 0px)`);
              break;

            default:

              maxXcoordinate = 0;
              displayBtn(false);
              break;
          }
        }
      );
    });
  });
})();
