describe('afhankelijk van land worden andere velden getoond', function () {
    var viewmodel;

    var landen = ['Binnenland','Buitenland'];

    beforeEach(function () {
        viewmodel = LAND.createViewModel();
    });

    it('land opties zijn: binnenland, buitenland', function () {
        expect(viewmodel.landOpties()).toEqual(landen);
    });

    it('binnenland: toon postcode, gemeente', function () {
        viewmodel.geselecteerdLand(landen[0]);
        
        expect(viewmodel.binnenlandZichtbaar()).toBeTruthy();
        expect(viewmodel.buitenlandZichtbaar()).toBeFalsy();
    });

    it('aanpassen postcode past automatisch gemeente aan', function () {
        viewmodel.postcode('3000');
        expect(viewmodel.gemeente()).toEqual('Leuven');
        viewmodel.postcode('1000');
        expect(viewmodel.gemeente()).toEqual('Brussel');
        viewmodel.postcode('2000');
        expect(viewmodel.gemeente()).toEqual('Antwerpen');
    });

    it('onbekende postcode geeft lege gemeente terug', function () {
        viewmodel.postcode('3001');
        expect(viewmodel.gemeente()).toEqual('');
    });

    it('buitenland: toon enkel vrij veld', function () {
        viewmodel.geselecteerdLand(landen[1]);

        expect(viewmodel.binnenlandZichtbaar()).toBeFalsy();
        expect(viewmodel.buitenlandZichtbaar()).toBeTruthy();
    });

});