var LAND = (function () {
    var pub = {},
            binnenland = 'Binnenland',
            buitenland = 'Buitenland',
            postcodeMapping = {
                '3000': 'Leuven',
                '1000': 'Brussel',
                '2000': 'Antwerpen'
            };

    pub.createViewModel = function () {
        var result = {
            landOpties: ko.observable([binnenland, buitenland]),
            geselecteerdLand: ko.observable(binnenland),
            postcode:ko.observable('3000'),
            buitenlandVeld:ko.observable('Bujumbura')
        };

        result.binnenlandZichtbaar = ko.dependentObservable(function () {
            return this.geselecteerdLand() === binnenland;
        }, result);

        result.buitenlandZichtbaar = ko.dependentObservable(function () {
            return this.geselecteerdLand() === buitenland;
        }, result);

        result.gemeente = ko.dependentObservable(function () {
            return postcodeMapping[this.postcode()] || '';
        }, result);

        return result;
    };

    return pub;
})();

