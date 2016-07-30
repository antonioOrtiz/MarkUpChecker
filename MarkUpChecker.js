/* My original stab at the markup checker */
var AvonURLChecker = (function iffe() {
  var publicAPI = {
        getAvonURL: function() {
            for (var i = 0; i < arguments.length; i++) {
                return {
                    'smo': 'http://smo.rye.avon.com',
                    'smodev': 'http://smodev.rye.avon.com',
                    'youravon_sans_w': 'http://youravon.com',
                    'youravon': 'http://www.youravon.com',
                    'youravon2': 'http://www2.youravon.com'
                }[arguments[i]];
            }
        },
        searchAvonURL: function(url) {
            for (var i = 0, l = document.links.length; i < l; i++) {
                if (document.links[i].href.indexOf(publicAPI.getAvonURL(url) !== -1)) {
                    document.links[i].setAttribute("target", "_blank");
                }
            }
        }
    };

    return publicAPI;
})();
