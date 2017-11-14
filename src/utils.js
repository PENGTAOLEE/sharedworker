var channel = function(entry) {
    var listeners = {};

    window.addEventListener('storage', function(e) {
        if (e.newValue !== null && /^channel\.(.+)/.test(e.key)) {
            broadcast(RegExp.$1, e.newValue);
        }
    });

    function broadcast(channelName, str) {
        if (channelName in listeners) {
            var value = JSON.parse(str);
            for ( var i = 0, arr = listeners[channelName], L = arr.length; i < L; i++) {
                try {
                    arr[i](value);
                } catch (e) {
                    console.error(e.stack);
                }
            }
        }
    }

    return {
        // 发送数据
        post: function(name, value) {
            entry["channel." + name] = JSON.stringify(value);
            setTimeout(function() {
                entry.removeItem("channel." + name);
            }, 0);
            return this;
        },
        
        // 监听数据
        on: function(name, callback) {
            if (name in listeners) {
                listeners[name].push(callback);
            } else {
                listeners[name] = [ callback ];
            }
            return this;
        },
    };
}(localStorage);
