var COLOR = (function() {
    var pub = {};

    pub.createPixel = function (red, green, blue, alpha) {

        return {

            asGrayscale: function () {
                var average = (red + green + blue) / 3;
                return pub.createPixel(average, average, average, alpha);
            },
            getRed: function () {
                return red;
            },
            getGreen: function () {
                return green;
            },
            getBlue: function () {
                return blue;
            },
            getAlpha: function() {
                return alpha;
            }
        };
    };

    var pixel = pub.createPixel();
    pixel.asGrayscale();

    pub.imageToPixels = function (imageData) {
        var result = [];
        for (var i = 0; i < imageData.length; i += 4) {
            result.push(pub.createPixel(imageData[i], imageData[i + 1], imageData[i + 2], imageData[i+3]));
        }
        return result;
    };

    pub.pixelsToImage = function (pixels) {
        var result = [];
        pixels.forEach(function (pixel) {
            result.push(pixel.getRed(), pixel.getGreen(), pixel.getBlue(), pixel.getAlpha());
        });
        return result;
    };

    pub.toGrayscale = function (image) {
        var pixels = pub.imageToPixels(image);
        var grayscale = pixels.map(function (pixel) { return pixel.asGrayscale();});
        return pub.pixelsToImage(grayscale);
    };

    return pub;
})();

onmessage = function (e) {
    postMessage(COLOR.toGrayscale(e.data));
};
