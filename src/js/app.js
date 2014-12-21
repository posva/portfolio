(function() {
  var cooltabs;
  [].slice.call(document.querySelectorAll('.tabs')).forEach( function(el) {
    cooltabs = new CBPFWTabs(el);
  });

  var author = function () { console.log("author"); window.author = author; };
  var books = function () { console.log("books"); };
  var viewBook = function (bookId) {
    console.log("viewBook: bookId is populated: " + bookId);
  };

  var about = function() {
    cooltabs._show(0);
  };
  var projects = function() {
    cooltabs._show(1);
  };
  var contact = function() {
    cooltabs._show(2);
  };

  var routes = {
    '/about': about,
    '/projects': projects,
    '/contact': contact,
    '/author': author,
    '/books': [books, function() {
      console.log("An inline route handler.");
    }],
    '/books/view/:bookId': viewBook
  };

  var router = Router(routes);
  router.init();
  window.router = router;
})();
