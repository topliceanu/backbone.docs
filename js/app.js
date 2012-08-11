(function ($) {
    $stash = $('<div/>');
    $.fn.outerHtml = function (elements) {
        var outerHtml = '';
        this.each( function (i, el) {
            $stash.append($(this).clone());
            outerHtml += $stash.html();
            $stash.html('');
        });
        return outerHtml;
    };
})(jQuery);


(function () {
    var datasource = 'data/data.xml',

        getContent = function (hash, $data) {
            if (hash === '#') return;
            var $header = $data.find(hash),
                $body = $header.nextUntil('[id]');
            return {
                'header': $header.outerHtml(),
                'body': $body.outerHtml()
            };
        },

        parse = function ($data) {
            var doc = {};
            $data.find('a.toc_title').each( function (i, title) {
                var $title = $(title),
                    str = $.trim( $title.text() ),
                    hash = $title.attr('href'),
                    content = getContent(hash, $data);
                doc[hash] = {
                    'title': str,
                    'hash': hash,
                    'content': content,
                    'sections': {}
                };
                $title.next('ul.toc_section').find('li>a').each( function (i, section) {
                    var $section = $(section),
                        str = $.trim( $section.text() ),
                        sectionHash = $section.attr('href'),
                        content = getContent(hash, $data); 
                    doc[hash].sections[sectionHash] = {
                        'title': str,
                        'hash': sectionHash,
                        'content': content
                    };
                });
            }); 
            return doc;
        },

        onDataLoaded = function (data) {
            $data = $(data);
            var doc = parse($data);
            console.log(doc);
        },

        onFailLoad = function () {
            console.log( arguments );
        };

    // prefetch data
    $.ajax({
        url: datasource,
        cache: true,
        dataType: 'xml'
    })
    .done( onDataLoaded )
    .fail( onFailLoad );
})();

$(document).on('mobileinit', function () {
    console.log('application is loaded');
});
