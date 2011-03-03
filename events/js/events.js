var EVENTS = (function () {
    var pub = {};

    function createQuery(stad) {
        return {
            format: 'json',
            q: 'select * from upcoming.events where woeid in (select woeid from geo.places where text="' + stad + '")'
        }
    }

    pub.findEvents = function (stad, callback) {
        $.getJSON('http://query.yahooapis.com/v1/public/yql?callback=?',createQuery(stad),function (data) {
            callback(data.query.results.event);
        });
    };

    return pub;
})();

var VIEWMODEL = (function () {
    var pub = {}, steden = ['Leuven', 'Antwerpen', 'Brussel', 'Brugge'];

    pub.createViewModel = function () {
        var viewmodel = {
            mogelijkeSteden: ko.observable(steden),
            geselecteerdeStad: ko.observable(),
            events: ko.observable()
        };

        viewmodel.geselecteerdeStad.subscribe(function (nieuweStad) {
            EVENTS.findEvents(nieuweStad, function (nieuweEvents) {
                viewmodel.events(nieuweEvents);
            });
        });
        return viewmodel;
    };

    return pub;
})();
