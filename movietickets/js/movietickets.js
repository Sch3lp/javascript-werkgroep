var Movieticket = (function () {
    var filmPrototype, pub = {};

    pub.ticket = function (film) {
        var aantalPersonen = 0;

        function kortingFactor() {
            return aantalPersonen < 20 ? 1 : 0.85;
        }

        return {
            voegPersonenToe: function (aantal) {
                aantalPersonen = aantalPersonen + (aantal || 1);
            },
            prijs: function () {
                return aantalPersonen * film.prijs * kortingFactor();
            }
        };
    };

    filmPrototype = function (prijs) {
        return {
            prijs: prijs
        };
    };

    pub.filmGewoon = function () {
        return filmPrototype(7);
    };

    pub.film3D = function () {
        return filmPrototype(11);
    };

    pub.filmLangspeelfilm = function () {
        return filmPrototype(8);
    };

    return pub;
}());

var PubSub = (function () {
    var pub = {};

    pub.subscriber = function () {
        var lastMessage = '';
        return {
            verstuur: function (message) {
                lastMessage = message;
            },
            getLastMessage: function() {
                return lastMessage;
            },
            isOntvangen: function () {
                return lastMessage !== '';
            }
        }
    };

    pub.publisher = function (subscriber) {
        return {
            postLater: function (message, secs) {
                setTimeout(subscriber.verstuur.bind(subscriber, message), secs * 1000);
            }
        }
    };

    return pub;
})();

