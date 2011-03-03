describe('Events tonen van bepaalde stad', function () {
    describe('Events kunnen via een webservice opgevraagd worden', function () {
        it('Kan events opvragen uit Leuven', function () {
            var events = null;
            EVENTS.findEvents('Leuven', function (data) {
                events = data;
            });

            waitsFor(function() { return events !== null }, 3000);
            runs(function () {
                expect(events[0].venue_city).toEqual('Leuven');
            });
        });

        it('Kan events opvragen uit Antwerpen', function () {
            var events = null;
            EVENTS.findEvents('Antwerpen', function (data) {
                events = data;
            });

            waitsFor(function() { return events !== null }, 3000);
            runs(function () {
                expect(events[0].venue_city).toEqual('Antwerpen');
            });
        });

    });

    describe('In GUI kan een stad geselecteerd', function () {
        it('Kan Leuven, Antwerpen, Brussel, Brugge selecteren', function () {
            var mogelijkeSteden = VIEWMODEL.createViewModel().mogelijkeSteden();
            expect(mogelijkeSteden).toEqual(['Leuven', 'Antwerpen', 'Brussel', 'Brugge']);
        });

        it('Indien een stad geselecteerd, zal events geupdate worden', function () {
            var viewmodel = VIEWMODEL.createViewModel();
            viewmodel.geselecteerdeStad('Leuven');

            waitsFor(function() { return viewmodel.events() !== undefined }, 3000);
            runs(function () {
                expect(viewmodel.events()[0].venue_city).toEqual('Leuven');
            });
        });
    });
});
