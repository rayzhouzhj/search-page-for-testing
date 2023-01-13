$(document).ready(function () {
    if(isBrowserSupported()) {
        loadArticleData();
    }
});

function isBrowserSupported() {
    return window.navigator.userAgent.indexOf("Firefox") < 0;
}

function loadArticleData() {
    $.ajax({
        url: "/data/articles",
        type: "Get",
        dataType: "json",
        cache: "false",
        async: true,

        success: function (result) {
            let json = eval(result);
            let articles = json.articles;

            $.each(articles, function (i) {
                $('.contentContainer ul').append(buildArticleCell(articles[i])).hide().fadeIn();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Get error on loading article data!");
        }
    });
}

function searchArticles() {

    var inputValue = $('#keywords').val();
    var withoutDigits = inputValue.replace(/[0-9]/g, '*');
    var postDate = { keywords: withoutDigits }
    history.pushState({}, '', '/search?keywords=' + withoutDigits);

    if (!isBrowserSupported()) {
        return false;
    }

    $.ajax({
        url: "/data/search",
        type: "POST",
        data: JSON.stringify(postDate),
        dataType: "json",
        cache: "false",
        async: true,
        contentType: 'application/json',

        success: function (result) {
            let json = eval(result);
            let articles = json.articles;
            $('.contentContainer ul').empty();
            
            $.each(articles, function (i) {
                $('.contentContainer ul').append(buildArticleCell(articles[i])).hide().fadeIn();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Get error on loading article data!");
        }
    });
}

function buildArticleCell(article) {
    return `<li class="list-group-item articleRow">
                <div class="row justify-content-md-center">
                    <div class="col">
                        <div class="articleTitle ${article.title.length > 114 ? 'articleTitleExtraMargin' : ''}">${article.title}</div>
                        <div class="articleSummary">${article.summary}</div>
                        <div class="articleDate">${article.updated}</div>
                    </div>
                    <div class="col col-2 ${article.title.length > 50 ? '' : 'articleImageExtraMargin'}">
                        <img src="${article.image}">
                    </div>
                </div>
            </li>`

}