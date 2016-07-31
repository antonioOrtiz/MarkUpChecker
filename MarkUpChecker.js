var MarkUpChecker = (function iffe() {
    'use strict';

    var URLS = { // Instead of using a switch statement I am using a function which returns a object to do the job
            'smo': 'http://smo.rye.avon.com',
            'smodev': 'http://smodev.rye.avon.com',
            'youravon_sans_w': 'http://youravon.com',
            'youravon': 'http://www.youravon.com',
            'youravon2': 'http://www2.youravon.com'
        },

        publicAPI;

    function getURL() {
        for (var i = 0; i < arguments.length; i++) { // Using a for loop to allow unlimited arguments to be passed in
            return URLS[arguments[i]];
        }
    }

    publicAPI = {

        addURL: function() {
            for (var i = 0; i < arguments.length; i += 2) {
                URLS[arguments[i]] = arguments[i + 1];
            }
            console.dir(URLS);
            return URLS;
        },

        addTag: function() {
            var doc = document,
                internal_h1 = doc.querySelectorAll('.internal_h1'),
                sheet = doc.createElement('style');
            for (var i = 0; i < internal_h1.length; i++) {
                internal_h1[i].innerHTML = '<h1>' + internal_h1[i].innerHTML + '</h1>';
                sheet.innerHTML = 'h1 {font-family: Helvetica, Arial, sans-serif !important; font-weight: 200!important; font-size: 22px !important; color: #333; margin: 3px 0px 6px; line-height: 24px !important;};'
                doc.body.appendChild(sheet);
            }
        },

        searchURL: function() {
            var link, url, parser, newPathName = '',
                emailUrl = /\/img\//,
                newstr = '',
                doc = document,
                avon_rep_container,
                avon_rep_container_links,
                avon_rep_container_images,
                documentTableWrapper,
                docBodyFirstChild;

            if (!doc.getElementById('avon_rep_container')) {
                avon_rep_container = doc.createElement('div');
                avon_rep_container.setAttribute('id', 'avon_rep_container');

                avon_rep_container_links = avon_rep_container.getElementsByTagName('a');
                documentTableWrapper = doc.getElementsByTagName('table')[0];
                avon_rep_container.appendChild(documentTableWrapper);
                avon_rep_container.className = 'container-avon-representative-news';
                docBodyFirstChild = doc.body.firstChild;
                doc.body.insertBefore(avon_rep_container, docBodyFirstChild);

            } else {
                avon_rep_container_links = doc.getElementById('avon_rep_container').getElementsByTagName('a');
            }
            avon_rep_container_images = avon_rep_container.getElementsByTagName('img');
            for (var i = 0; i < avon_rep_container_images.length; i++) {
                avon_rep_container_images[i].src = avon_rep_container_images[i].src.replace(emailUrl, '/images/avon_manager_news/');
            }

            for (var i = 0, len = arguments.length; i < len; i++) { // Using a for loop to allow unlimited arguments to be passed in
                url = this.getURL(arguments[i]); // We are calling the publicApi.getURL() method and passing the looped argument from above
                for (var j = 0, jlen = document.links.length; j < jlen; j++) { // This loop goes over the whole documents links...
                    link = avon_rep_container_links[j];
                    if (link.href.indexOf(url) !== -1) { //...and we are checking each argument passed in to see if it matches the object value stored in the getURL function e.g. like a switch statement..
                        parser = document.createElement('a'); //...if so we are essentially adding a blank tag to all the documents in the document
                        parser.href = link.href;

                        link.setAttribute('target', '_self');
                        newPathName = parser.pathname;


                        if (newPathName.search(/Executive|District|Division|National/) != -1) { // Added check for these strings for SMO page
                            newPathName = newPathName.split('/').pop();
                            newstr = newPathName;

                        } else {
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
    return publicAPI;
})();
