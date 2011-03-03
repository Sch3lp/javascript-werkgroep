describe('Ticket', function() {
    describe('de prijs is afhankelijk van aantal personen', function() {
        it('prijs is 0 indien geen personen', function() {
            var ticket = Movieticket.ticket(Movieticket.filmGewoon());
            expect(ticket.prijs()).toEqual(0);
        });

        it('prijs voor 1 persoon is 7 euro', function() {
            var ticket = Movieticket.ticket(Movieticket.filmGewoon());
            ticket.voegPersonenToe();
            expect(ticket.prijs()).toEqual(7);
        });

        it('prijs voor 2 personen is 14 euro', function() {
            var ticket = Movieticket.ticket(Movieticket.filmGewoon());
            ticket.voegPersonenToe(2);
            expect(ticket.prijs()).toEqual(14);
        });

        it('vanaf 20 personen krijg je 15% groepskorting', function() {
            var ticket = Movieticket.ticket(Movieticket.filmGewoon());
            ticket.voegPersonenToe(20);
            expect(ticket.prijs()).toEqual(119);
        });

    });

    describe('de prijs is afhankelijk van het soort film', function() {
        it('prijs voor een gewone film is 7 euro', function() {
            var ticket = Movieticket.ticket(Movieticket.filmGewoon());
            ticket.voegPersonenToe();
            expect(ticket.prijs()).toEqual(7);
        });

        it('prijs voor een langspeelfilm is 8 euro', function() {
            var ticket = Movieticket.ticket(Movieticket.filmLangspeelfilm());
            ticket.voegPersonenToe();
            expect(ticket.prijs()).toEqual(8);
        });

        it('prijs voor een 3D film is 11 euro', function() {
            var ticket = Movieticket.ticket(Movieticket.film3D());
            ticket.voegPersonenToe();
            expect(ticket.prijs()).toEqual(11);
        });
    });

});
