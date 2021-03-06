app.directive("superman", function() {
    return { 
	restrict:"E",
	scope:{},
	template:"<div class='label'>Here I am</div>"
	    }
})

app.directive("wonderwoman", function() {
    return {
	restrict:"E",
	template:"<ul class='unstyled'><li ng-repeat='bookmark in bookmarks'>{{bookmark.category}}</li></ul>"
    }
})

app.directive("drink", function() {
    return {
	template: '<div>{{flavor}}</div>',
	link: function (scope, element, attrs) {
	    scope.flavor = attrs.flavor;
	 }
    }
})
