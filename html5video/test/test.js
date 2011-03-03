describe('Grayscale module kan images omzetten naar grayscale', function () {
    beforeEach(function () {
        this.addMatchers({
            toBeRGBA: function (red, green, blue, alpha) {
                return this.actual.getRed() === red &&
                        this.actual.getGreen() === green &&
                        this.actual.getBlue() === blue &&
                        this.actual.getAlpha() === alpha;
            }
        });
    });

    describe('Pixels omzetten naar grayscale', function () {
        it('Grayscale pixels blijven grayscale', function () {
            var pixel = COLOR.createPixel(2, 2, 2, 4);
            expect(pixel.asGrayscale()).toBeRGBA(2, 2, 2, 4);
        });

        it('Kleurenpixel wordt omgezet naar grayscale', function () {
            var pixel = COLOR.createPixel(1, 2, 3, 4);
            expect(pixel.asGrayscale()).toBeRGBA(2, 2, 2, 4);
        });
    });

    describe('Image omzetten naar pixels', function () {
        it('Elke 4 getallen komen overeen met pixel', function () {
            var pixels = COLOR.imageToPixels([1,2,3,4,4,5,6,7]);
            expect(pixels.length).toEqual(2);
            expect(pixels[0]).toBeRGBA(1, 2, 3, 4);
            expect(pixels[1]).toBeRGBA(4, 5, 6, 7);
        });
    });

    describe('Image omzetten naar grayscale image', function () {
        it('Array van pixels omzetten naar image', function () {
            var image = COLOR.pixelsToImage([COLOR.createPixel(1, 2, 3, 4), COLOR.createPixel(4, 5, 6, 7)]);
            expect(image).toEqual([1,2,3,4,4,5,6,7]);
        });

        it('Image to grayscale image', function () {
            var grayscaleImage = COLOR.toGrayscale([1,2,3,4,4,5,6,7]);
            expect(grayscaleImage).toEqual([2,2,2,4,5,5,5,7]);
        });
    });

    describe('Color module kan als worker gebruikt worden', function () {
        it('Color.js luistert naar messages', function () {
            var worker = new Worker('../js/grayscale.js'),
                    resultaat = null;
            worker.onmessage = function (e) {
                resultaat = e.data;
            };

            worker.postMessage([1,2,3,4,4,5,6,7]);

            waitsFor(function () {
                return resultaat !== null
            }, 10000);
            runs(function () {
                expect(resultaat).toEqual([2,2,2,4,5,5,5,7]);
            });
        });
    });
});

describe('video converter', function () {
    var scratchContext, testImageData = [1,2,3,4,4,5,6,7];

    beforeEach(function () {
        scratchContext = jasmine.createSpyObj('context',['drawImage','getImageData']);
        scratchContext.getImageData.andReturn(testImageData);

    });

    it('converter kan constant video monitoren', function () {
        var video = document.createElement('video');
        var callback = jasmine.createSpy();
        var monitoring = VIDEO.monitorVideo(video, scratchContext, callback);
        monitoring.start();
        waitsFor(function () {return callback.callCount > 5}, 10000);
        runs(function () {
            expect(callback).toHaveBeenCalledWith(testImageData);
            expect(callback.callCount).toBeGreaterThan(5);
            monitoring.stop();
        });
    });
});