define(function () {
    var _stubs = {};

    var addStub = function (name, stub) {
        _stubs[name] = stub;
    }

    var amd = define.amd;

    window.define = function (_define) {
        return function () {
            switch (arguments.length) {
                case 2:
                    var deps = arguments[0];
                    var cb = arguments[1];
                    break;
                case 1:
                    var deps = [];
                    var cb = arguments[0];
                    break;
                default:
                    var deps = arguments[1];
                    var cb = arguments[2];
                    break;
            }
            if (arguments.length == 3) {
                var deps = arguments[1];
                var cb = arguments[2];
            } else {
                var deps = arguments[0];
                var cb = arguments[1];
            }
            _define(deps, function () {
                var stubs = deps.map(function (dep) {
                    return dep in _stubs && _stubs[dep];
                });
                for (var i=0; i < arguments.length; ++i) {
                    !!stubs[i] && (arguments[i] = stubs[i]);
                }
                return cb.apply(null, arguments);
            });
        };
    }(define);

    window.define.amd = amd;

    return addStub;
});
