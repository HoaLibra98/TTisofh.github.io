export const getTotalPage = (numberinpage, totalitem) => {
    var temp = totalitem / numberinpage;
    var _totalpage = Math.round(temp);
    var totalpage = (temp > _totalpage) ? (_totalpage + 1) : _totalpage;
    return totalpage;
}
export const getQueryStringHref = (name) => {
    name = name.toLowerCase();
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href.toLowerCase());
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
export const getQueryStringHash = (name) => {
    name = name.toLowerCase();
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash.toLowerCase());
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
export default {
    getTotalPage,
    getQueryStringHref,
    getQueryStringHash
}