var VIDEO = (function () {
    var pub = {};

    pub.monitorVideo = function (video, scratchContext, callback) {
        var timer;

        function getImageData(video) {
            scratchContext.drawImage(video, 0, 0, 320, 240);
            return scratchContext.getImageData(0, 0, 320, 240);
        }

        return {
            start: function () {
                timer = setInterval(function () {
                    callback(getImageData(video));
                }, 250);
            },
            stop: function () {
                clearInterval(timer);
            }
        }
    };
    return pub;
})();