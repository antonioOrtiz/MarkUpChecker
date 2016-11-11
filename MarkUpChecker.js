var MarkUpChecker = (function iffe() {
    'use strict';
    var URLS = { // Instead of using a switch statement I am using a function which returns a object to do the job
            'smo': 'http://smo.rye.avon.com',
            'smodev': 'http://smodev.rye.avon.com',
            'youravon_sans_w': 'http://youravon.com',
            'youravon': 'http://www.youravon.com',
            'youravon2': 'http://www2.youravon.com',
            'cteusa': 'https://www.cteusa.com'
        },
        publicAPI;

    function getURL(args) { //args will be array
        var result = [];
        for (var i = 0; i < args.length; i++) { // Using a for loop to allow unlimited arguments to be passed in (but return first only ;))
            // return URLS[arguments[i]];
            result.push(URLS[args[i]]);
        }
        return result;
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
                newstr = '',
                doc = document,
                avon_rep_container = doc.getElementById('avon_rep_container'),
                avon_rep_container_id,
                avon_rep_container_links,
                avon_rep_container_images,
                documentTableWrapper,
                docBodyFirstChild,
                full_width_container_1 = doc.getElementsByClassName('full-width-container')[1],
                full_width_img_class_el = doc.getElementsByClassName('full-width-img')[0];
            if (!avon_rep_container) {
                avon_rep_container = doc.createElement('div');
                avon_rep_container.setAttribute('id', 'avon_rep_container');
                avon_rep_container.className = 'container-avon-representative-news';
                avon_rep_container_links = avon_rep_container.getElementsByTagName('a');
                avon_rep_container_id = doc.getElementById('avon_rep_container');
                docBodyFirstChild = doc.body.firstChild;
                documentTableWrapper = doc.getElementsByClassName('marginfix')[0];
                avon_rep_container.appendChild(documentTableWrapper);
                doc.body.appendChild(avon_rep_container);
                full_width_container_1.removeChild(full_width_container_1.getElementsByTagName('table')[0]);
                full_width_img_class_el.removeAttribute('style');
            } else {
                avon_rep_container_links = doc.getElementById('avon_rep_container').getElementsByTagName('a');
            }
            avon_rep_container_images = avon_rep_container.getElementsByTagName('img');
            for (var i = 0; i < avon_rep_container_images.length; i++) {
                var images = avon_rep_container_images[i];
                images.src = '/dam/avon-us/landing-pages/rep-news/' + images.src.split('/').pop();
                if (avon_rep_container_images[i].width == "538") {
                    avon_rep_container_images[i].style.width = "538px";
                }
                if (avon_rep_container_images[i].width == "258") {
                    avon_rep_container_images[i].style.width = "258px";
                }
                avon_rep_container_images[i].style.width = 'inherit';
                avon_rep_container_images[i].style.margin = 'auto';
            }
            //for (var i = 0, len = arguments.length; i < len; i++) { // Using a for loop to allow unlimited arguments to be passed in
            //instead collect all necessary urls
            url = getURL(arguments); //[i]); // We are calling the publicApi.getURL() method and passing the looped argument from above
            for (var j = 0, jlen = avon_rep_container_links.length; j < jlen; j++) { // This loop goes over the whole documents links...
                link = avon_rep_container_links[j];
                var domain = link.href.match(/(https?:\/\/.+?)\//);
                if ((url.indexOf(domain) !== -1) && (!link.href.match(/\.(pdf)/gi))) { // //...and we are checking each argument passed in to see if it matches the object value stored in the getURL function e.g. like a switch statement..
                    parser = document.createElement('a'); //...if so we are essentially adding a blank tag to all the documents in the document
                    parser.href = link.href;
                    link.setAttribute('target', '_self');
                    newPathName = parser.pathname;
                    console.log(domain);
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
            //}
        },
        addTag: function() { // This is needed to add the archive CSS and if we are in the REP environment we add the h1 tag and it's appropriate style tag
            var doc = document,
                sheet = doc.createElement('style');
            sheet.innerHTML = 'td.full-width-img {padding:0}table {margin: auto; max-width: 640px} .archive {font-family: Helvetica Neue, Helvetica, Arial, sans-serif !important;font-size: 13px !important;line-height: 20px !important;color: #333 !important;font-weight: 200 !important;padding: 0px 5px 0px 0px !important;} .archive a {color: #ec008c;display: inline-block;padding: 0 7px;} .file_folder {position: relative;top: 0px;padding: 0 5px;} #avon_rep_container a {font-size: 14px !important}';
            doc.body.appendChild(sheet);
            // if (internal_h1) {
            //     for (var i = 0; i < internal_h1.length; i++) {
            //         internal_h1[i].innerHTML = '<h1>' + internal_h1[i].innerHTML + '</h1>';
            //     }
            //     sheet.innerHTML += 'h1 {font-family: Helvetica, Arial, sans-serif !important; font-weight: 200!important; font-size: 22px !important; color: #333; margin: 3px 0px 6px; line-height: 24px !important;}';
            //     doc.body.appendChild(sheet);
            // }
        },
        removeComment: function() {
            var story = document.getElementsByClassName('story');
            [].forEach.call(story, function(el) {
                var nodestr = el.innerHTML;
                var noderevealHTML = nodestr.replace(/<!--/ig, '').replace(/-->/ig, '');
                el.innerHTML = noderevealHTML;
            });
        }
    };
    return publicAPI;
})();
