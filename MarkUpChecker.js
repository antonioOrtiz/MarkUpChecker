var MarkUpChecker = (function iffe() {
    var publicAPI = {
        var urlManager = {
            getURL: function() { // Instead of using a switch statement I am using a function which returns a object to do the job
                for (var i = 0; i < arguments.length; i++) { // Using a for loop to allow unlimited arguments to be passed in
                    var URLS = {
                        'smo': 'http://smo.rye.avon.com',
                        'smodev': 'http://smodev.rye.avon.com',
                        'youravon_sans_w': 'http://youravon.com',
                        'youravon': 'http://www.youravon.com',
                        'youravon2': 'http://www2.youravon.com'
                    };
                }
                return URLS[arguments[i]];
            },
            searchURL: function() {
                var link, url, parser, newPathName = '',
                    newstr;
                for (var i = 0, len = arguments.length; i < len; i++) { // Using a for loop to allow unlimited arguments to be passed in
                    url = this.getURL(arguments[i]); // We are calling the publicApi.getURL() method and passing the looped argument from above
                    for (var j = 0, jlen = document.links.length; j < jlen; j++) { // This loop goes over the whole documents links...
                        link = document.links[j];
                        if (link.href.indexOf(url) !== -1) { //...and we are checking each argument passed in to see if it matches the object value stored in the getURL function e.g. like a switch statement..
                            parser = document.createElement('a'); //...if so we are essentially adding a blank tag to all the documents in the document
                            parser.href = link.href;

                            link.setAttribute('target', '_self');
                            newPathName = parser.pathname;

                            if (newPathName.search(/Executive|District|Division|National/) != -1) { // Added check for these strings for SMO page
                                newPathName = newPathName.split('/').pop();
                                newstr = newPathName;
                            }
                            link.href = newstr;

                        } else {
                            link.setAttribute('target', '_blank');

                        }

                    }
                }
            }
        };
    };
    return publicAPI;
})();
