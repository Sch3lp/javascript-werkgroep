describe('Publisher en Subscriber', function () {
    it('publisher stuurt subscriber bericht na aantal seconden', function () {
        var subscriber = PubSub.subscriber();
        var publisher = PubSub.publisher(subscriber);

        publisher.postLater('hallo', 5);

        waitsFor(subscriber.isOntvangen, 10000);

        runs(function() {
            expect(subscriber.getLastMessage()).toEqual('hallo');
        });
    });
});

