/* eslint-disable indent */
module.exports = {
  getUrlCategory: function (child, parent) {
    console.log('converter: ', child);
    if (child.type === 'post') {
      return `/post-list/${child.nameVie}/?categoryId=${child.id}&section=${parent.id}`;
    }
    else if (child.type === 'page') {
      return `/page/${child.nameVie}/?categoryId=${child.id}&section=${parent.id}`;
    }
    else return '';
  },
};
