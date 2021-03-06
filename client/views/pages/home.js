//Basic helper functions for search
Template.searchBox.helpers({
    inputParameters: function () {
        return {
            index: BooksIndex,
            timeout: 250,
            attributes: {
                class: 'col s8 offset-s2',
                placeholder: 'Start searching...',
                style: 'font-size: 24px'
            }
        }
    },
    loadMoreParameters: function () {
        return {
            index: BooksIndex,
            content: 'load more',
            attributes: {
                'class': 'btn grey waves-effect'
            }
        }
    },
    books: function () {
        return Books.find({}, { sort: { price: -1, name: 1 }});
    },
    index: function () {
        return BooksIndex;
    },
    resultsCount: function () {
        var count = BooksIndex.getComponentDict().get('count');
        if (count === 0)
            return "No results found.";
        else if (count === 1)
            return String(count) + " result found";
        else
            return String(count) + " results found";
    },
    booksIndex: () => Template.BooksIndex
});
