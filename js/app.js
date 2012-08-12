(function () {
    var onMobileInit = function () {
        console.log('application is loaded');

        var $logoPage = $('#logo'),
            $menuPage = $('#menu'),
            $searchPage = $('#search'),
            $docsPage = $('#docs'),
            $aboutPage = $('#about');

        var renderPage = function ($page, contents, header) {
            $page.find('[data-role=header] h1').html(header);
            $page.find('[data-role=content]').html(contents);
            $page.page();
        };

        var showMenuPage = function (items, title) {
            var html = '<ul data-role="listview">';
            $.each(items, function (hash, obj) {
                html += '<li><a href="'+obj.hash+'">'+obj.title+'</a></li>';
            });
            html += '</ul>';
            renderPage($menuPage, html, title? title: 'Menu');
            $menuPage.find('div[data-role="content"] ul').listview();
        };

        var showSearchPage = function () {
            var html = '<ul data-role="listview" data-filter="true">';
            $.each(data, function (hash, section) {
                html += '<li><a href="'+section.hash+'">'+section.title+'</a></li>';
                $.each(section.sections, function (hash, segment) {
                    html += '<li><a href="'+segment.hash+'">'+section.title+'#'+segment.title+'</a></li>';
                });
            });
            html += '</ul>';
            renderPage($searchPage, html, 'All Items Search');
            $searchPage.find('div[data-role="content"] > ul').listview();
        };


        var showPage = function (url, options) {
            var $page;
            // logo page
            if (url.hash === '') {
                $page = $logoPage;
            }
            else if (url.hash === '#about') {
                $page = $aboutPage;
                $page.page();
            }
            // search page 
            else if (url.hash === '#search') {
                $page = $searchPage;
                showSearchPage();
            }
            // main menu    
            else if (url.hash === '#menu') { 
                $page = $menuPage;
                showMenuPage(data);
            }
            // documentation menu
            else if (url.hash.indexOf('-') !== -1) { 
                $page = $docsPage;
                var section = url.hash.split('-')[0];
                var page = data[section].sections[url.hash].content;
                renderPage($page, page.body, page.header);
            }
            // section menu
            else if (data[url.hash] !== undefined) { 
                $page = $menuPage;
                showMenuPage(data[url.hash].sections, data[url.hash].title);
            }
            options.dataUrl = url.href;
            $.mobile.changePage($page, options);
        };

        var onPageBeforeChange = function (event, data) {
            console.log('page change triggered', event, data);

            if (typeof data.toPage !== 'string') return; //when page hash is not requested
            else {
                var url = $.mobile.path.parseUrl(data.toPage);
                console.log('requested url', url); 
                showPage(url, data.options);
                event.preventDefault();
            }
        };

        $(document).bind('pagebeforechange', onPageBeforeChange);
    };

    $(onMobileInit);
})();
