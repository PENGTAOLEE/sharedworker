var bports = [];
onconnect = function (e) {
    var port = e.ports[0];

    port.onmessage = function (e) {
        var data = e.data;
        if (data.event == 'init') {
            if (data.target == 'b') {
                bports.push(port);
            }
        }
        if (data.event == 'update') {
            for (var i = 0, c = bports.length; i < c; i++) {
                bports[i].postMessage(data);
            }
        }
    }

};
