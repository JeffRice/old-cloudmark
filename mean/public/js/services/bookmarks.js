//Bookmarks service used for bookmarks REST endpoint
angular.module('mean.bookmarks').factory("Bookmarks", ['$resource', function($resource) {
    return $resource('bookmarks/:bookmarkId', {
        bookmarkId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
