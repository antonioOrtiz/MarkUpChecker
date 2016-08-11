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
        searchURL: function() {
            function insertAfter(newNode, referenceNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            }
            var link, url, parser, newPathName = '',
                emailUrl = /img\//gi,
                tsUrl = /\/REPSuite\/static\/html\/inews_archives\/img\//gi,
                newstr = '',
                doc = document,
                avon_rep_container,
                avon_rep_container_id,
                avon_rep_container_links,
                avon_rep_container_images,
                documentTableWrapper,
                docBodyFirstChild,
                nodeToTargetToInsertLP;

            if (!doc.getElementById('avon_rep_container')) {
                avon_rep_container = doc.createElement('div');
                avon_rep_container.setAttribute('id', 'avon_rep_container');
                avon_rep_container.className = 'container-avon-representative-news';
                avon_rep_container_links = avon_rep_container.getElementsByTagName('a');
                avon_rep_container_id = doc.getElementById('avon_rep_container');
                docBodyFirstChild = doc.body.firstChild;
                nodeToTargetToInsertLP = doc.getElementsByClassName('flexTile')[4];


                if (nodeToTargetToInsertLP) {
                    documentTableWrapper = doc.getElementsByClassName('marginfix')[0];
                    avon_rep_container.appendChild(documentTableWrapper);
                    insertAfter(avon_rep_container, nodeToTargetToInsertLP);
                } else {
                    documentTableWrapper = doc.getElementsByTagName('table')[0];
                    avon_rep_container.appendChild(documentTableWrapper);
                    doc.body.insertBefore(avon_rep_container, docBodyFirstChild);
                }


            } else {
                avon_rep_container_links = doc.getElementById('avon_rep_container').getElementsByTagName('a');
            }
            avon_rep_container_images = avon_rep_container.getElementsByTagName('img');
            for (var i = 0; i < avon_rep_container_images.length; i++) {
                if (arguments[0] == "smo" || arguments[1] == "smodev") { // Checks what environment the page will be used in so we can change the src attribute of all the images in the document to the appropriate path
                    avon_rep_container_images[i].src = avon_rep_container_images[i].src.replace(emailUrl, '/images/avon_manager_news/');
                } else if(!nodeToTargetToInsertLP) {
                    avon_rep_container_images[i].src = avon_rep_container_images[i].src.replace(tsUrl, '/REPSuite/static/images/rep_news/');
                }else {
                    avon_rep_container_images[i].src = avon_rep_container_images[i].src.replace(emailUrl, '/static/images/rep_news/');

                }
            }

            for (var i = 0, len = arguments.length; i < len; i++) { // Using a for loop to allow unlimited arguments to be passed in
                url = getURL(arguments[i]); // We are calling the publicApi.getURL() method and passing the looped argument from above
                for (var j = 0, jlen = avon_rep_container_links.length; j < jlen; j++) { // This loop goes over the whole documents links...
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
        },

        addTag: function() { // This is needed to add the archive CSS and if we are in the REP environment we add the h1 tag and it's appropriate style tag
            var doc = document,
                internal_h1 = doc.querySelectorAll('.internal_h1'),
                sheet = doc.createElement('style');
            sheet.innerHTML = '.full-width-img > img, .full-width-img > a > img {width:100%} .archive {font-family: Helvetica Neue, Helvetica, Arial, sans-serif !important;font-size: 14px !important;line-height: 20px !important;color: #333 !important;font-weight: 200 !important;padding: 0px 5px 0px 0px !important;} .archive a {color: #ec008c;display: inline-block;padding: 0 14px;} .file_folder {position: relative;top: 5px;padding: 0 5px;} #avon_rep_container a {font-size: 14px !important}';
            doc.body.appendChild(sheet);
            if (internal_h1) {
                for (var i = 0; i < internal_h1.length; i++) {
                    internal_h1[i].innerHTML = '<h1>' + internal_h1[i].innerHTML + '</h1>';
                }
                sheet.innerHTML += 'h1 {font-family: Helvetica, Arial, sans-serif !important; font-weight: 200!important; font-size: 22px !important; color: #333; margin: 3px 0px 6px; line-height: 24px !important;}';
                doc.body.appendChild(sheet);
            }
        }
    }
    return publicAPI;
})();
