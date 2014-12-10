/*! Firebase-util - v0.1.0 - 2013-12-16
 * https://github.com/firebase/firebase-util
 * Copyright (c) 2013 Firebase
 * MIT LICENSE */
! function(a) {
    var b = {};
    ! function(a, b) {
        function c(a, c) {
            switch (c) {
                case "%d":
                    return parseInt(a, 10);
                case "%j":
                    return a = b.util.isObject(a) ? JSON.stringify(a) : a + "", a.length > 500 && (a = a.substr(0, 500) + ".../*truncated*/...}"), a;
                case "%s":
                    return a + "";
                default:
                    return a
            }
        }

        function d(a) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var b = Array.prototype.slice.call(arguments, 1),
                c = this,
                d = function() {},
                e = function() {
                    return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
                };
            return d.prototype = this.prototype, e.prototype = new d, e
        }

        function e(a, b) {
            "use strict";
            var c, d;
            for (c = 0, d = this.length; d > c; ++c) c in this && a.call(b, this[c], c, this)
        }

        function f(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }

        function g(a) {
            "use strict";
            if (null == this) throw new TypeError;
            var b, c, d = Object(this),
                e = d.length >>> 0;
            if (0 === e) return -1;
            if (b = 0, arguments.length > 1 && (b = Number(arguments[1]), b != b ? b = 0 : 0 != b && 1 / 0 != b && b != -1 / 0 && (b = (b > 0 || -1) * Math.floor(Math.abs(b)))), b >= e) return -1;
            for (c = b >= 0 ? b : Math.max(e - Math.abs(b), 0); e > c; c++)
                if (c in d && d[c] === a) return c;
            return -1
        }

        function h(a) {
            return null === a ? !1 : "object" != typeof a ? !1 : "function" != typeof a.callee ? !1 : "number" != typeof a.length ? !1 : a.constructor !== Object ? !1 : !0
        }

        function i(a) {
            this.name = "NotSupportedError", this.message = a, this.stack = (new Error).stack
        }
        var j, k;
        if ("undefined" == typeof window) k = require("firebase");
        else if (k = window.Firebase, !k) throw new Error("Must include Firebase (http://cdn.firebase.com/v0/firebase.js) before firebase-util.js");
        b.pkg = function(a) {
            return b[a] || (b[a] = {}), b[a]
        };
        var l = b.pkg("util");
        l.Firebase = k, l.isDefined = function(a) {
            return a !== j
        }, l.isObject = function(a) {
            return null !== a && "object" == typeof a
        }, l.isArray = function(a) {
            return (Array.isArray || f).call(null, a)
        }, l.toArray = function(a, b) {
            var c = l.map(a, function(a) {
                return a
            });
            return b > 0 ? c.slice(b) : c
        }, l.extend = function() {
            var a = l.toArray(arguments),
                b = a[0] === !0 && a.shift(),
                c = a.shift();
            return l.each(a, function(a) {
                l.isObject(a) && l.each(a, function(a, d) {
                    c[d] = b && l.isObject(c[d]) ? l.extend(!0, c[d], a) : a
                })
            }), c
        }, l.bind = function(a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return (a.bind || d).apply(a, b)
        }, l.isEmpty = function(a) {
            return a === j || null === a || l.isArray(a) && 0 === a.length || l.isObject(a) && !l.contains(a, function() {
                return !0
            })
        }, l.keys = function(a) {
            var b = [];
            return l.each(a, function(a, c) {
                b.push(c)
            }), b
        }, l.map = function(a, b, c) {
            var d = [];
            return l.each(a, function(e, f) {
                var g = b.call(c, e, f, a);
                g !== j && d.push(g)
            }), d
        }, l.mapObject = function(a, b, c) {
            var d = {};
            return l.each(a, function(e, f) {
                var g = b.call(c, e, f, a);
                g !== j && (d[f] = g)
            }), d
        }, l.find = function(a, b, c) {
            if (h(a) && (a = Array.prototype.slice.call(a, 0)), l.isArray(a)) {
                for (var d = 0, e = a.length; e > d; d++)
                    if (b.call(c, a[d], d, a) === !0) return a[d]
            } else if (l.isObject(a)) {
                var f;
                for (f in a)
                    if (a.hasOwnProperty(f) && b.call(c, a[f], f, a) === !0) return a[f]
            }
            return j
        }, l.filter = function(a, b, c) {
            var d = l.isArray(a),
                e = d ? [] : {};
            return l.each(a, function(f, g) {
                b.call(c, f, g, a) && (d ? e.push(f) : e[g] = f)
            }), e
        }, l.has = function(a, b) {
            return l.isArray(a) && a[b] !== j || l.isObject(a) && a.hasOwnProperty(b) || !1
        }, l.val = function(a, b) {
            return l.has(a, b) ? a[b] : j
        }, l.contains = function(a, b, c) {
            if ("function" != typeof b) {
                if (l.isArray(a)) return l.indexOf(a, b) > -1;
                b = function(a) {
                    return function(b) {
                        return b === a
                    }
                }(b)
            }
            return l.find(a, b, c) !== j
        }, l.each = function(a, b, c) {
            if (h(a) && (a = Array.prototype.slice.call(a, 0)), l.isArray(a))(a.forEach || e).call(a, b, c);
            else if (l.isObject(a)) {
                var d;
                for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d, a)
            }
        }, l.indexOf = function(a, b) {
            return (a.indexOf || g).call(a, b)
        }, l.remove = function(a, b) {
            var c = !1;
            if (l.isArray(a)) {
                var d = l.indexOf(a, b);
                d > -1 && (a.splice(d, 1), c = !0)
            } else if (l.isObject(a)) {
                var e;
                for (e in a)
                    if (a.hasOwnProperty(e) && b === a[e]) {
                        c = !0, delete a[e];
                        break
                    }
            }
            return c
        }, l.defer = function() {
            var a = l.toArray(arguments);
            setTimeout(l.bind.apply(null, a), 0)
        }, l.inherit = function(a, b) {
            var c = [a.prototype || {}].concat(l.toArray(arguments, 2));
            return a.prototype = new b, l.each(c, function(b) {
                l.extend(a.prototype, b)
            }), a.prototype._super = function(a) {
                b.apply(a, l.toArray(arguments, 1))
            }, a
        }, l.call = function(a, b) {
            var c = l.toArray(arguments, 2),
                d = [];
            return l.each(a, function(a) {
                return "function" != typeof a || b ? (l.isObject(a) && "function" == typeof a[b] && d.push(a[b].apply(a, c)), void 0) : d.push(a.apply(null, c))
            }), d
        }, l.isEqual = function(a, b, c) {
            if (a === b) return !0;
            if (typeof a != typeof b) return !1;
            if (l.isObject(a) && l.isObject(b)) {
                var d = l.isArray(a),
                    e = l.isArray(b);
                if (d || e) return d && e && a.length === b.length && !l.contains(a, function(a, c) {
                    return !l.isEqual(a, b[c])
                });
                var f = c ? l.keys(a) : l.keys(a).sort(),
                    g = c ? l.keys(b) : l.keys(b).sort();
                return l.isEqual(f, g) && !l.contains(a, function(a, c) {
                    return !l.isEqual(a, b[c])
                })
            }
            return !1
        }, l.bindAll = function(a, b) {
            return l.each(b, function(c, d) {
                "function" == typeof c && (b[d] = l.bind(c, a))
            }), b
        }, l.printf = function() {
            var a = l.toArray(arguments),
                d = a.shift(),
                e = d.match(/(%s|%d|%j)/g);
            return e && b.util.each(e, function(b) {
                d = d.replace(b, c(a.shift(), b))
            }), d
        }, l.construct = function(a, b) {
            function c() {
                return a.apply(this, b)
            }
            return c.prototype = a.prototype, new c
        }, l.noop = function() {}, i.prototype = new Error, a.NotSupportedError = l.NotSupportedError = i, a._ForTestingOnly = b
    }(a, b),
    function(a, b) {
        function c() {
            var a;
            return "undefined" != typeof window && window.location && window.location.search && (a = window.location.search.match("\bdebugLevel=([0-9]+)\b")), a ? parseInt(a[1], 10) : i
        }

        function d() {
            return !0
        }

        function e(a) {
            var c = a.slice(0),
                d = c.shift(),
                e = d.match(/(%s|%d|%j)/g);
            return e && b.util.each(e, function(a) {
                d = d.replace(a, f(c.shift(), a))
            }), [d].concat(c)
        }

        function f(a, c) {
            switch (c) {
                case "%d":
                    return parseInt(a, 10);
                case "%j":
                    return a = b.util.isObject(a) ? JSON.stringify(a) : a + "", a.length > 500 && (a = a.substr(0, 500) + ".../*truncated*/...}"), a;
                case "%s":
                    return a + "";
                default:
                    return a
            }
        }

        function g(a, b) {
            return b.length ? a instanceof RegExp ? !a.test(b[0] + "") : !(b[0] + "").match(a) : !0
        }

        function h(a) {
            switch (a) {
                case !1:
                    return 0;
                case "off":
                    return 0;
                case "none":
                    return 0;
                case "error":
                    return 1;
                case "warn":
                    return 2;
                case "warning":
                    return 2;
                case "info":
                    return 3;
                case "log":
                    return 4;
                case "debug":
                    return 5;
                case !0:
                    return i;
                case "on":
                    return i;
                case "all":
                    return i;
                default:
                    return i
            }
        }
        var i = 2,
            j = !1,
            k = {
                error: d,
                warn: d,
                info: d,
                log: d,
                debug: d,
                time: d,
                timeEnd: d,
                group: d,
                groupEnd: d
            },
            l = function() {
                l.log.apply(null, b.util.toArray(arguments))
            };
        a.logLevel = l.logLevel = function(c, f) {
            if ("number" != typeof c && (c = h(c)), j === c) return function() {};
            b.util.each(["error", "warn", "info", "log", "debug"], function(a, h) {
                if ("undefined" != typeof console && c >= h + 1) {
                    var i = b.util.bind(console["debug" === a ? "log" : a], console);
                    l[a] = function() {
                        var a = b.util.toArray(arguments);
                        "string" == typeof a[0] && a[0].match(/(%s|%d|%j)/) && (a = e(a)), f && g(f, a) || i.apply("undefined" == typeof console ? k : console, a)
                    }
                } else l[a] = d
            });
            var i = function(b) {
                return function() {
                    a.logLevel(b)
                }
            }(j);
            return j = c, i
        }, a.logLevel(c()), b.log = l
    }(a, b),
    function(a, b) {
        function c(a, b) {
            b || (b = {}), this._observableProps = h.extend({
                onAdd: h.noop,
                onRemove: h.noop,
                onEvent: h.noop,
                oneTimeEvents: []
            }, b, {
                eventsMonitored: a,
                observers: {},
                oneTimeResults: {}
            }), this.resetObservers()
        }

        function d(a, b) {
            h.each(b, function(b) {
                var c = h.indexOf(a, b);
                c >= 0 && a.splice(c, 1)
            })
        }

        function e(a, b) {
            var c = [];
            return h.each(b, function(b) {
                h.has(a.observers, b) ? a.observers[b].length && (c = c.concat(a.observers[b])) : g.warn("Observable.hasObservers: invalid event type %s", b)
            }), c
        }

        function f(a, b, c) {
            h.has(b.oneTimeResults, a) && c.notify.apply(c, b.oneTimeResults[a])
        }
        var g = b.pkg("log"),
            h = b.pkg("util");
        c.prototype = {
            observe: function(a, b, c, d) {
                var e = h.Args("observe", arguments, 2, 4);
                if (a = e.nextFromWarn(this._observableProps.eventsMonitored)) {
                    b = e.nextReq("function"), c = e.next("function"), d = e.next("object");
                    var g = new h.Observer(this, a, b, d, c);
                    this._observableProps.observers[a].push(g), this._observableProps.onAdd(a, g), this.isOneTimeEvent(a) && f(a, this._observableProps, g)
                }
                return g
            },
            hasObservers: function(a) {
                return this.getObservers(a).length > 0
            },
            stopObserving: function(a, b, c) {
                var e = h.Args("stopObserving", arguments);
                a = e.next(["array", "string"], this._observableProps.eventsMonitored), b = e.next(["function"]), c = e.next(["object"]), h.each(a, function(a) {
                    var e = [],
                        f = this.getObservers(a);
                    h.each(f, function(d) {
                        d.matches(a, b, c) && (d.notifyCancelled(null), e.push(d))
                    }, this), d(this._observableProps.observers[a], e), this._observableProps.onRemove(a, e)
                }, this)
            },
            abortObservers: function(a) {
                var b = [];
                if (this.hasObservers()) {
                    var c = this.getObservers().slice();
                    h.each(c, function(c) {
                        c.notifyCancelled(a), b.push(c)
                    }, this), this.resetObservers(), this._observableProps.onRemove(this.event, b)
                }
            },
            getObservers: function(a) {
                return a = h.Args("getObservers", arguments).listFrom(this._observableProps.eventsMonitored, !0), e(this._observableProps, a)
            },
            triggerEvent: function(a) {
                var b = h.Args("triggerEvent", arguments),
                    c = b.listFromWarn(this._observableProps.eventsMonitored, !0),
                    d = b.restAsList();
                c && h.each(c, function(b) {
                    if (this.isOneTimeEvent(a)) {
                        if (h.isArray(this._observableProps.oneTimeResults, a)) return g.warn("One time event was triggered twice, should by definition be triggered once", a), void 0;
                        this._observableProps.oneTimeResults[a] = d
                    }
                    var c = this.getObservers(b),
                        e = 0;
                    h.each(c, function(a) {
                        a.notify.apply(a, d.slice(0)), e++
                    }), this._observableProps.onEvent.apply(null, [b, e].concat(d.slice(0)))
                }, this)
            },
            resetObservers: function() {
                h.each(this._observableProps.eventsMonitored, function(a) {
                    this._observableProps.observers[a] = []
                }, this)
            },
            isOneTimeEvent: function(a) {
                return h.contains(this._observableProps.oneTimeEvents, a)
            },
            observeOnce: function(a, b, c, d) {
                var e = h.Args("observeOnce", arguments, 2, 4);
                if (a = e.nextFromWarn(this._observableProps.eventsMonitored)) {
                    b = e.nextReq("function"), c = e.next("function"), d = e.next("object");
                    var g = new h.Observer(this, a, b, d, c, !0);
                    this._observableProps.observers[a].push(g), this._observableProps.onAdd(a, g), this.isOneTimeEvent(a) && f(a, this._observableProps, g)
                }
                return g
            }
        }, h.Observable = c
    }(a, b),
    function(a, b) {
        function c(a, b, c, d, e, f) {
            if ("function" != typeof c) throw new Error("Must provide a valid notifyFn");
            this.observable = a, this.fn = c, this.event = b, this.cancelFn = e || function() {}, this.context = d, this.oneTimeEvent = !!f
        }
        var d = b.pkg("util");
        c.prototype = {
            notify: function() {
                var a = d.toArray(arguments);
                this.fn.apply(this.context, a), this.oneTimeEvent && this.observable.stopObserving(this.event, this.fn, this.context)
            },
            matches: function(a, b, c) {
                return d.isArray(a) ? d.contains(a, function(a) {
                    return this.matches(a, b, c)
                }, this) : !(a && a !== this.event || b && b !== this && b !== this.fn || c && c !== this.context)
            },
            notifyCancelled: function(a) {
                this.cancelFn.call(this.context, a || null, this)
            }
        }, d.Observer = c
    }(a, b),
    function(a, b) {
        function c(a) {
            this.needs = 0, this.met = 0, this.queued = [], this.errors = [], this.criteria = [], this.processing = !1, d.each(a, this.addCriteria, this)
        }
        var d = b.pkg("util");
        c.prototype = {
            addCriteria: function(a, b) {
                if (this.processing) throw new Error("Cannot call addCriteria() after invoking done(), fail(), or handler() methods");
                return this.criteria.push(b ? [a, b] : a), this
            },
            ready: function() {
                return this.needs === this.met
            },
            done: function(a, b) {
                return a && this._runOrStore(function() {
                    this.hasErrors() || a.call(b)
                }), this
            },
            fail: function(a, b) {
                return this._runOrStore(function() {
                    this.hasErrors() && a.apply(b, this.getErrors())
                }), this
            },
            handler: function(a, b) {
                return this._runOrStore(function() {
                    a.apply(b, this.hasErrors() ? this.getErrors() : [null])
                }), this
            },
            chain: function(a) {
                return this.addCriteria(a.handler, a), this
            },
            when: function(a) {
                this._runOrStore(function() {
                    this.hasErrors() ? a.reject.apply(a, this.getErrors()) : a.resolve()
                })
            },
            addError: function(a) {
                this.errors.push(a)
            },
            hasErrors: function() {
                return this.errors.length
            },
            getErrors: function() {
                return this.errors.slice(0)
            },
            _process: function() {
                this.processing = !0, this.needs = this.criteria.length, d.each(this.criteria, this._evaluateCriteria, this)
            },
            _evaluateCriteria: function(a) {
                var b = null;
                d.isArray(a) && (b = a[1], a = a[0]);
                try {
                    a.call(b, d.bind(this._criteriaMet, this))
                } catch (c) {
                    this.addError(c)
                }
            },
            _criteriaMet: function(a) {
                a && this.addError(a), this.met++, this.ready() && d.each(this.queued, this._run, this)
            },
            _runOrStore: function(a) {
                this.processing || this._process(), this.ready() ? this._run(a) : this.queued.push(a)
            },
            _run: function(a) {
                a.call(this)
            }
        }, d.createQueue = function(a, b) {
            var d = new c(a);
            return b && d.done(b), d
        }
    }(a, b),
    function(a, b) {
        function c(a, b, d, e) {
            if ("string" != typeof a || !i.isObject(b)) throw new Error("Args requires at least 2 args: fnName, arguments[, minArgs, maxArgs]");
            if (!(this instanceof c)) return new c(a, b, d, e);
            this.fnName = a, this.argList = i.toArray(b), this.origArgs = i.toArray(b);
            var f = this.length = this.argList.length;
            if (this.pos = -1, d === h && (d = 0), e === h && (e = this.argList.length), d > f || f > e) {
                var g = e > d ? i.printf("%d to %d", d, e) : d;
                throw Error(i.printf("%s must be called with %s arguments, but received %d", a, g, f))
            }
        }

        function d(a, b) {
            return b === !0 ? !0 : (i.isArray(b) || (b = [b]), i.contains(b, function(b) {
                switch (b) {
                    case "array":
                        return i.isArray(a);
                    case "string":
                        return "string" == typeof a;
                    case "number":
                        return isFinite(parseInt(a, 10));
                    case "int":
                    case "integer":
                        return isFinite(parseFloat(a));
                    case "object":
                        return i.isObject(a);
                    case "function":
                        return "function" == typeof a;
                    case "bool":
                    case "boolean":
                        return "boolean" == typeof a;
                    case "boolean-like":
                        return !i.isObject(a);
                    default:
                        throw new Error("Args received an invalid data type: " + b)
                }
            }))
        }

        function e(a, b, c, d) {
            if (d = i.printf("%s: invalid argument at pos %d, %s (received %s)", b, c, d), a === !0) throw new Error(d);
            if (!i.has(j, a)) throw new Error("The `required` value passed to Args methods must either be true or a method name from logger");
            j[a](d)
        }

        function f(a, b, c) {
            j.warn("%s: invalid choice %s, must be one of [%s]", a, b, c)
        }

        function g(a, b) {
            if (b === !0) return a;
            switch (i.isArray(b) ? b[0] : b) {
                case "array":
                    return i.isArray(a) ? a : [a];
                case "string":
                    return a + "";
                case "number":
                    return parseFloat(a);
                case "int":
                case "integer":
                    return parseInt(a, 10);
                case "bool":
                case "boolean":
                case "boolean-like":
                    return !!a;
                case "function":
                case "object":
                    return a;
                default:
                    throw new Error("Args received an invalid data type: " + type)
            }
        }
        var h, i = b.pkg("util"),
            j = b.pkg("log");
        c.prototype = {
            orig: function() {
                return this.origArgs.slice(0)
            },
            restAsList: function() {
                return this.argList.slice(0)
            },
            skip: function() {
                return this.argList.length && (this.pos++, this.argList.shift()), this
            },
            next: function(a, b) {
                return this._arg(a, b, !1)
            },
            nextWarn: function(a, b) {
                return this._arg(a, b, "warn")
            },
            nextReq: function(a) {
                return this._arg(a, null, !0)
            },
            nextFrom: function(a, b) {
                return this._from(a, b, !1)
            },
            nextFromWarn: function(a, b) {
                return this._from(a, b, "warn")
            },
            nextFromReq: function(a) {
                return this._from(a, null, !0)
            },
            listFrom: function(a, b) {
                return this._list(a, b, !1)
            },
            listFromWarn: function(a, b) {
                return this._list(a, b, "warn")
            },
            listFromReq: function(a) {
                return this._list(a, null, !0)
            },
            _arg: function(a, b, c) {
                return this.pos++, (a === h || null === a) && (a = !0), this.argList.length && d(this.argList[0], a) ? g(this.argList.shift(), a) : (c && e(c, this.fnName, this.pos, i.printf("must be of type %s", a)), b)
            },
            _from: function(a, b, c) {
                return this.pos++, this.argList.length && i.contains(a, this.argList[0]) ? this.argList.shift() : (c && e(c, this.fnName, this.pos, i.printf("must be one of %s", a)), b)
            },
            _list: function(a, b, c) {
                this.pos++;
                var d = [],
                    g = this.argList[0];
                return !this.argList.length || i.isEmpty(g) || !i.isArray(g) && i.isObject(g) || (this.argList.shift(), i.isArray(g) ? d = i.map(g, function(b) {
                    return i.contains(a, b) ? b : (f(this.fnName, b, a), h)
                }, this) : i.contains(a, g) ? d = [g] : f(this.fnName, g, a)), i.isEmpty(d) ? (c && e(c, this.fnName, this.pos, i.printf("choices must be in [%s]", a)), b === !0 ? a : b) : d
            }
        }, i.Args = c
    }(a, b),
    function(a, b) {
        "use strict";

        function c() {
            this._super(this, q, n.bindAll(this, {
                onEvent: this._eventTriggered,
                onAdd: this._monitorEvent,
                onRemove: this._stopMonitoringEvent
            })), this.joinedParent = null, this.paths = [], this.sortPath = null, this.sortedChildKeys = [], this.childRecs = {}, this.loadingChildRecs = {}, this.priorValue = m, this.currentValue = m, this.currentPriority = null, this.prevChildName = null, this.intersections = [], this.refName = null, this.rootRef = null, this.queue = this._loadPaths(Array.prototype.slice.call(arguments))
        }

        function d(a, b) {
            var c = [];
            return (b.isIntersection() || !a.intersections.length) && c.push("child_added"), b === a.sortPath && c.push("child_moved"), c.length ? c : null
        }

        function e(a, b) {
            return 1 === arguments.length && (b = a.currentValue), new p.JoinedSnapshot(a, b, a.currentPriority)
        }

        function f(a) {
            return function(b) {
                a && b && a(b)
            }
        }

        function g(a, b) {
            var c = n.map(a, function(a) {
                return a.isReadOnly() ? a.toString() : m
            });
            if (c.length) {
                var d = n.printf("Unable to write to the following paths because they are read-only (no keyMap was not specified and the path contains no data): %s", c);
                return o.error(d), b(new n.NotSupportedError(d)), !1
            }
            return !0
        }

        function h(a, b, c) {
            var d = !l(b) || k(a);
            return d || (o.error("Attempted to call set() using a primitive, but this is a joined record (there is no way to split a primitive between multiple paths)"), c(new n.NotSupportedError("Attempted to call set() using a primitive, but this is a joined record (there is no way to split a primitive between multiple paths)"))), d
        }

        function i(a, b) {
            var c = a;
            return n.has(a, ".priority") && (c = n.filter(a, function(a, b) {
                return ".priority" !== b
            })), n.has(a, ".value") && (c = a[".value"]), b && l(c) && (c = function(a) {
                var c = {};
                return c[b.aliasedKey(".value") || ".value"] = a, c
            }(c)), c
        }

        function j(a) {
            return n.has(a, ".priority") ? a[".priority"] : m
        }

        function k(a) {
            return 1 === a.length && a[0].isPrimitive()
        }

        function l(a) {
            return !n.isObject(a) && null !== a
        }
        var m, n = b.pkg("util"),
            o = b.pkg("log"),
            p = b.pkg("join"),
            q = ["child_added", "child_removed", "child_changed", "child_moved", "value"];
        c.prototype = {
            auth: function(a, b, c) {
                var d = n.Args("auth", Array.prototype.slice.call(arguments), 1, 3);
                a = d.nextReq("string"), b = d.next("function"), c = d.next("function"), this.queue.done(function() {
                    this.sortPath.ref().auth(a, b, c)
                }, this)
            },
            unauth: function() {
                this.queue.done(function() {
                    this.sortPath.ref().unauth()
                }, this)
            },
            on: function(a, b, c, d) {
                var e = n.Args("on", Array.prototype.slice.call(arguments), 2, 4);
                return a = e.nextFromReq(q), b = e.nextReq("function"), c = e.next("function"), d = e.next("object"), this.queue.done(function() {
                    var e = this.observe(a, b, f(c), d);
                    this._triggerPreloadedEvents(a, e)
                }, this), b
            },
            off: function(a, b, c) {
                var d = n.Args("off", Array.prototype.slice.call(arguments), 0, 3);
                return a = d.nextFrom(q), b = d.next("function"), c = d.next("object"), this.queue.done(function() {
                    this.stopObserving(a, b, c)
                }, this), this
            },
            once: function(a, b, c, d) {
                var e = n.Args("once", Array.prototype.slice.call(arguments), 2, 4);
                a = e.nextFromReq(q), b = e.nextReq("function"), c = e.next("function"), d = e.next("object");
                var f = function(c, e) {
                    typeof b === n.Observer ? b.notify(c, e) : b.call(d, c, e), this.off(a, f, this)
                };
                return this.on(a, f, c, this), b
            },
            child: function(a) {
                var b = n.Args("child", Array.prototype.slice.call(arguments), 1, 1);
                a = b.nextReq(["string", "number"]);
                var d, e = (a + "").split("/"),
                    f = e.shift();
                return d = this._isChildLoaded(f) ? this._getJoinedChild(f) : new c(f, this), e.length ? d.child(e.join("/")) : d
            },
            parent: function() {
                if (!this.joinedParent) throw new n.NotSupportedError("Cannot call parent() on a joined record");
                return this.joinedParent
            },
            name: function() {
                return this.refName
            },
            set: function(a, b) {
                var c = n.Args("set", Array.prototype.slice.call(arguments), 1, 2).skip();
                b = c.next("function", n.noop), this.queue.done(function() {
                    if (g(this.paths, b) && h(this.paths, a, b)) {
                        var c = i(a, k(this.paths) ? this.paths[0] : null),
                            d = j(a);
                        d !== m && (this.currentPriority = d);
                        var e = n.createQueue();
                        n.each(this.paths, function(a) {
                            e.addCriteria(function(b) {
                                a.pickAndSet(c, b, d)
                            })
                        }), e.handler(b)
                    }
                }, this)
            },
            setWithPriority: function(a, b, c) {
                return a = n.isObject(a) ? n.extend({}, a) : {
                    ".value": a
                }, a[".priority"] = b, this.set(a, c)
            },
            setPriority: function(a, b) {
                var c = n.Args("setPriority", Array.prototype.slice.call(arguments), 1, 2);
                a = c.nextReq(!0), b = c.next("function", n.noop), this.queue.done(function() {
                    g(this.paths, b) && this.sortPath.ref().setPriority(a, b)
                }, this)
            },
            update: function(a, b) {
                b = n.Args("set", Array.prototype.slice.call(arguments), 1, 2).skip().next("function", n.noop), this.queue.done(function() {
                    if (g(this.paths, b) && h(this.paths, a, b)) {
                        var c = i(a, k(this.paths) ? this.paths[0] : null),
                            d = n.createQueue();
                        n.each(this.paths, function(a) {
                            d.addCriteria(function(b) {
                                a.pickAndUpdate(c, b)
                            })
                        }), d.handler(b)
                    }
                }, this)
            },
            remove: function(a) {
                a = n.Args("remove", Array.prototype.slice.call(arguments), 0, 1).next("function", n.noop), this.queue.done(function() {
                    var b = n.createQueue();
                    n.each(this.paths, function(a) {
                        b.addCriteria(function(b) {
                            a.remove(b)
                        })
                    }), b.handler(a)
                }, this)
            },
            push: function(a, b) {
                var c = n.Args("remove", Array.prototype.slice.call(arguments), 0, 2);
                a = c.next(), b = c.next("function", n.noop);
                var d = this.child(this.rootRef.push().name());
                return n.isEmpty(a) || d.set(a, b), d
            },
            root: function() {
                return this.rootRef
            },
            ref: function() {
                return this
            },
            toString: function() {
                return "[" + n.map(this.paths, function(a) {
                    return a.toString()
                }).join("][") + "]"
            },
            onDisconnect: function() {
                throw new n.NotSupportedError("onDisconnect() not supported on JoinedRecord")
            },
            limit: function() {
                throw new n.NotSupportedError("limit not supported on JoinedRecord; try calling limit() on ref before passing into join")
            },
            endAt: function() {
                throw new n.NotSupportedError("endAt not supported on JoinedRecord; try calling endAt() on ref before passing into join")
            },
            startAt: function() {
                throw new n.NotSupportedError("startAt not supported on JoinedRecord; try calling startAt() on ref before passing into join")
            },
            transaction: function() {
                throw new n.NotSupportedError("transactions not supported on JoinedRecord")
            },
            _monitorEvent: function(a) {
                1 === this.getObservers(a).length && this.queue.done(function() {
                    if (b = this.joinedParent || !this.intersections.length ? this.paths : this.intersections, this.hasObservers(a) && !b[0].hasObservers(a)) {
                        var b;
                        (this.joinedParent ? o.debug : o)('JoinedRecord(%s) Now observing event "%s"', this.name(), a), this.joinedParent ? n.call(b, "observe", a, this._pathNotification, this) : b[0].hasObservers() || (o.info("JoinedRecord(%s) My first observer attached, loading my joined data and Firebase connections", this.name()), n.each(b, function(a) {
                            n.each(d(this, a), function(b) {
                                a.observe(b, this._pathNotification, this._pathCancelled, this)
                            }, this)
                        }, this))
                    }
                }, this)
            },
            _stopMonitoringEvent: function(a, b) {
                var c = b.length;
                this.queue.done(function() {
                    if (c && !this.hasObservers(a))
                        if ((this.joinedParent ? o.debug : o)("JoinedRecord(%s) Stopped observing %s events", this.name(), a ? '"' + a + '"' : ""), this.joinedParent) n.call(this.paths, "stopObserving", a, this._pathNotification, this);
                        else if (!this.hasObservers()) {
                        o.info("JoinedRecord(%s) My last observer detached, releasing my joined data and Firebase connections", this.name());
                        var b = this.intersections.length ? this.intersections : this.paths;
                        n.call(b, "stopObserving");
                        var d = this.childRecs;
                        this.childRecs = {}, n.each(d, this._removeChildRec, this), this.sortedChildKeys = [], this.currentValue = m, this.priorValue = m
                    }
                }, this)
            },
            _pathNotification: function(a, b, c, d, f, g) {
                var h;
                if (o('JoinedRecord(%s) Received "%s" from Path(%s): %s%s %j', this.name(), b, a.name(), "value" === b ? "" : c + ": ", f === m ? "" : "->" + f, d), a === this.sortPath && "value" === b && (this.currentPriority = g), this.joinedParent) switch (b) {
                    case "value":
                        this._myValueChanged();
                        break;
                    default:
                        this.triggerEvent(b, e(this.child(c), d))
                } else switch (h = this.child(c), b) {
                    case "child_added":
                        null !== d && this._pathAddEvent(a, h, f);
                        break;
                    case "child_moved":
                        this.sortPath === a && (h.currentPriority = g, this._moveChildRec(h, f))
                }
            },
            _isValueLoaded: function() {
                return this.currentValue !== m
            },
            _isChildLoaded: function(a) {
                return n.isObject(a) && (a = a.name()), this._getJoinedChild(a) !== m
            },
            _pathCancelled: function(a) {
                a && this.abortObservers(a)
            },
            _loadPaths: function(a) {
                var b = new p.PathLoader(a);
                return this.joinedParent = b.joinedParent, this.refName = b.refName, this.rootRef = b.rootRef, this.paths = b.finalPaths, n.createQueue().chain(b.queue).done(this._assertSortPath, this).done(function() {
                    this.intersections = b.intersections, this.sortPath = b.sortPath, o.info("JoinedRecord(%s) is ready for use (all paths and dynamic keys loaded)", this.name())
                }, this).fail(function() {
                    var a = this.name();
                    n.each(Array.prototype.slice.call(arguments), function(b) {
                        o.error("Path(%s): %s", a, b)
                    }), o.error("JoinedRecord(%s) could not be loaded.", a)
                }, this)
            },
            _pathAddEvent: function(a, b, c) {
                this._assertIsParent("_pathAddEvent");
                var d = b.name(),
                    e = n.has(this.loadingChildRecs, d);
                e || this._isChildLoaded(d) ? a === this.sortPath && (e ? this.loadingChildRecs[d] = c : this._moveChildRec(b, c)) : b._isValueLoaded() ? this._addChildRec(b, c) : (o.debug("JoinedRecord(%s) Preloading value for child %s in prep to add it", this.name(), b.name()), this.loadingChildRecs[d] = c, b.once("value", function() {
                    if (n.has(this.loadingChildRecs, d)) {
                        var a = this.loadingChildRecs[d];
                        b.prevChildName = a, delete this.loadingChildRecs[d], this._addChildRec(b, a)
                    }
                }, this))
            },
            _addChildRec: function(a, b) {
                this._assertIsParent("_addChildRec");
                var c = a.name();
                return null === a.currentValue || this._isChildLoaded(c) || (o("JoinedRecord(%s) Added child rec %s after %s", this.name(), a.name(), b), this._placeRecAfter(a, b), this.childRecs[c] = a, this._isValueLoaded() && !n.has(this.currentValue, c) && this._setMyValue(p.sortSnapshotData(this, this.currentValue, e(a))), this.triggerEvent("child_added", e(a)), a.on("value", this._updateChildRec, this)), a
            },
            _removeChildRec: function(a) {
                this._assertIsParent("_removeChildRec");
                var b = a.name();
                if (a.off(null, this._updateChildRec, this), this._isChildLoaded(a)) {
                    o("JoinedRecord(%s) Removed child rec %s", this.name(), a);
                    var c = n.indexOf(this.sortedChildKeys, b);
                    if (c > -1 && this.sortedChildKeys.splice(c, 1), delete this.childRecs[b], this._isValueLoaded()) {
                        var d = n.extend({}, this.currentValue);
                        delete d[b], this._setMyValue(d)
                    }
                    this.triggerEvent("child_removed", e(a, a.priorValue))
                } else n.has(this.loadingChildRecs, b) && delete this.loadingChildRecs[b];
                return a
            },
            _updateChildRec: function(a) {
                this._assertIsParent("_updateChildRec"), this._isChildLoaded(a.name()) && (null === a.val() ? this._removeChildRec(a.ref()) : a.ref().priorValue !== m && (this._isValueLoaded() && this._setMyValue(p.sortSnapshotData(this, this.currentValue, a)), this.triggerEvent("child_changed", a)))
            },
            _placeRecAfter: function(a, b) {
                this._assertIsParent("_placeRecAfter");
                var c, d = this.sortedChildKeys.length,
                    e = null;
                if (b && 0 !== d ? (c = n.indexOf(this.sortedChildKeys, b), -1 === c ? c = d : c++) : c = 0, a.prevChildName = c > 0 ? this.sortedChildKeys[c - 1] : null, this.sortedChildKeys.splice(c, 0, a.name()), d > c) {
                    var f = this.sortedChildKeys[c + 1],
                        g = this._getJoinedChild(f);
                    g.prevChildName = a.name()
                }
                return e
            },
            _moveChildRec: function(a, b) {
                if (this._assertIsParent("_moveChildRec"), this._isChildLoaded(a)) {
                    var c = n.indexOf(this.sortedChildKeys, a.name());
                    if (c > -1 && b !== m) {
                        var d = 0;
                        null !== b && (d = n.indexOf(this.sortedChildKeys, b), -1 === d && (d = this.sortedChildKeys.length)), c > d && d++, d !== c && (this.sortedChildKeys.splice(d, 0, this.sortedChildKeys.splice(c, 1)[0]), a.prevChildName = d > 0 ? this.sortedChildKeys[d - 1] : null, this._isChildLoaded(a) && this.triggerEvent("child_moved", e(a), b), this._setMyValue(p.sortSnapshotData(this, this.currentValue)))
                    }
                }
            },
            _myValueChanged: function() {
                p.buildSnapshot(this).value(function(a) {
                    this._setMyValue(a.val())
                }, this)
            },
            _setMyValue: function(a) {
                return n.isEqual(this.currentValue, a, !0) ? !1 : (this.priorValue = this.currentValue, this.currentValue = a, this.joinedParent || this._loadCachedChildren(), this.triggerEvent("value", e(this)), !0)
            },
            _notifyExistingRecsAdded: function(a) {
                if (this._assertIsParent("_notifyExistingRecsAdded"), this.sortedChildKeys.length) {
                    var b = null;
                    n.each(this.sortedChildKeys, function(c) {
                        if (this._isChildLoaded(c)) {
                            var d = this._getJoinedChild(c);
                            a.notify(e(d), b), b = d.name()
                        }
                    }, this)
                }
            },
            _eventTriggered: function(a, b, c, d) {
                var e = b ? this.joinedParent ? o : o.info : o.debug;
                e('JoinedRecord(%s) "%s" (%s%s) sent to %d observers', this.name(), a, c.name(), d ? "->" + d : "", b), o.debug(c.val())
            },
            _getJoinedChild: function(a) {
                return this.joinedParent ? m : this.childRecs[a]
            },
            _loadCachedChildren: function() {
                this._assertIsParent("_loadCachedChildren");
                var a = null;
                n.each(this.currentValue, function(b, c) {
                    if (!this._isChildLoaded(c)) {
                        var d = this.child(c);
                        d.currentValue = b, d.prevChildName = a, this._addChildRec(d, d.prevChildName)
                    }
                    a = c
                }, this)
            },
            _assertIsParent: function(a) {
                if (this.joinedParent) throw new Error(a + "() should only be invoked for parent records")
            },
            _triggerPreloadedEvents: function(a, c) {
                if (this._isValueLoaded()) {
                    if ("value" === a) {
                        var d = e(this);
                        c.notify(d)
                    } else if ("child_added" === a)
                        if (this.joinedParent) {
                            var f = null;
                            b.util.keys(this.currentValue, function(a) {
                                c.notify(e(this.child(a)), f), f = a
                            })
                        } else this._notifyExistingRecsAdded(c)
                } else "value" === a && this._myValueChanged()
            },
            _isSortPath: function(a) {
                return this.sortPath.equals(a)
            }
        }, n.inherit(c, n.Observable), p.JoinedRecord = c
    }(a, b),
    function(a, b) {
        function c(a, b, c) {
            this.rec = a, this.priority = void 0 === c ? a.currentPriority : c, this.data = this._loadData(b)
        } {
            var d = (b.pkg("log"), b.pkg("util"));
            b.pkg("join")
        }
        c.prototype = {
            val: function() {
                return this.data
            },
            child: function() {
                return this.rec.child.apply(this.rec, d.toArray(arguments))
            },
            forEach: function(a) {
                return !!d.find(this.data, function(b, e) {
                    !d.isEmpty(b) && a(new c(this.child(e), b))
                }, this)
            },
            hasChild: function(a) {
                var b = this.data;
                return !d.contains(a.split("/"), function(a) {
                    return d.has(b, a) ? (b = b[a], !1) : !0
                })
            },
            hasChildren: function() {
                return d.isObject(this.data) && !d.isEmpty(this.data)
            },
            name: function() {
                return this.rec.name()
            },
            numChildren: function() {
                return d.keys(this.data, function() {
                    return null
                }).length
            },
            ref: function() {
                return this.rec
            },
            getPriority: function() {
                return this.priority
            },
            exportVal: function() {
                throw new Error("Nobody implemented me :(")
            },
            isEqual: function(a) {
                return d.isEqual(this.data, this._loadData(a), !0)
            },
            _loadData: function(a) {
                return d.isEmpty(a) ? null : d.has(a, ".value") && 1 === d.keys(a).length ? a[".value"] : a
            }
        }, b.join.JoinedSnapshot = c
    }(a, b),
    function(a) {
        "use strict";

        function b(a, b) {
            this.queue = d.createQueue(), this.keyMap = null, this.isReadOnly = !1, this.dynamicChildPaths = {};
            var c = a.getKeyMap();
            d.isEmpty(c) ? b ? this._loadKeyMapFromParent(b) : this._loadKeyMapFromData(a) : this._parseRawKeymap(c)
        }
        var c = a.pkg("log"),
            d = a.pkg("util"),
            e = a.pkg("join");
        b.prototype = {
            done: function(a, b) {
                this.queue.done(function() {
                    a.call(b, this.isReadOnly, this.keyMap, this.dynamicChildPaths)
                }, this)
            },
            fail: function(a, b) {
                this.queue.fail(a, b)
            },
            _parseRawKeymap: function(a) {
                var b = {},
                    c = {};
                d.each(a, function(a, f) {
                    if (d.isObject(a)) {
                        var g = f;
                        a instanceof d.Firebase || a instanceof e.JoinedRecord ? a = {
                            ref: a
                        } : a.aliasedKey && (g = a.aliasedKey), a.keyMap = {
                            ".value": g
                        }, c[f] = g, b[f] = new e.Path(a)
                    } else c[f] = a === !0 ? f : a
                }), d.isEmpty(b) || (this.dynamicChildPaths = b), d.isEmpty(c) || (this.keyMap = c)
            },
            _loadKeyMapFromParent: function(a) {
                this.queue.addCriteria(function(b) {
                    a.observeOnce("keyMapLoaded", function(c) {
                        this.keyMap = a.isJoinedChild() ? {
                            ".value": ".value"
                        } : d.extend({}, c), b()
                    }, this)
                }, this)
            },
            _loadKeyMapFromData: function(a) {
                this.queue.addCriteria(function(b) {
                    a.ref().limit(25).once("value", function(e) {
                        var f = {};
                        if (d.isObject(e.val())) {
                            var g = [];
                            e.forEach(function(b) {
                                return g.push(b.name()), d.isObject(b.val()) ? (d.each(b.val(), function(a, b) {
                                    f[b] = b
                                }), !1) : d.isEmpty(b.val()) ? !1 : (f = {
                                    ".value": a.ref().name()
                                }, !0)
                            }), c.info('Loaded keyMap for Path(%s) from child records "%s": %j', a.toString(), g, f)
                        }
                        d.isEmpty(f) && (this.isReadOnly = !0, f[".value"] = a.ref().name()), this.keyMap = f, b()
                    }, function(a) {
                        c.error(a), b(a)
                    }, this)
                }, this)
            }
        }, e.getKeyMapLoader = function(a, c) {
            return new b(a, c)
        }
    }(b),
    function(a) {
        "use strict";

        function b(a, b) {
            if (this._super(this, n, l.bindAll(this, {
                onAdd: this._observerAdded,
                onRemove: this._observerRemoved,
                oneTimeEvents: ["keyMapLoaded", "dynamicKeyLoaded"]
            })), this.subs = [], this.parentPath = b, this.props = c(a, b), this.dynamicChildPaths = null, !this.props.pathName) throw new Error("No pathName found; path cannot be set to Firebase root");
            this._buildKeyMap(b), this._initDynamicSource()
        }

        function c(a, b) {
            if (a instanceof l.Firebase || a instanceof MockFirebase || a instanceof m.JoinedRecord) a = f(a);
            else {
                if (!a.ref) throw new Error("Must declare ref in properties hash for all Util.Join functions");
                a = e(a)
            }
            var c = l.extend({
                intersects: !1,
                ref: null,
                keyMap: null,
                sortBy: !1,
                pathName: null,
                dynamicSource: null,
                dynamicKey: j,
                dynamicAbstracts: {},
                sync: !1,
                callback: function() {}
            }, a);
            return l.isArray(c.keyMap) && (c.keyMap = d(c.keyMap)), c.pathName = (b && !c.dynamicSource ? (b.name() || "").replace(/\/$/, "") + "/" : "") + c.ref.name(), c
        }

        function d(a) {
            var b = {};
            return l.each(a, function(a) {
                b[a] = a
            }), b
        }

        function e(a) {
            var b = f(a.ref);
            return l.extend({}, a, b)
        }

        function f(a) {
            return {
                ref: a
            }
        }

        function g(a) {
            return l.has(a, ".value") && (a = a[".value"]), l.isEmpty(a) && (a = null), a
        }

        function h(a, b, c, d, e) {
            var f = e ? c : d,
                g = null;
            if (!e && a.hasDynamicChild(c)) {
                var h = ".id:" + d;
                g = l.has(b, h) ? b[h] : null
            } else l.has(b, f) && (g = b[f]);
            return g
        }

        function i(a) {
            if ("number" == typeof a && (a += ""), "string" != typeof a || a.match(/[.#$\[\]]/)) throw new Error('Invalid path in dynamic key, must be non-empty and cannot contain ".", "#", "$", "[" or "]"')
        }
        var j, k = a.pkg("log"),
            l = a.pkg("util"),
            m = a.pkg("join"),
            n = ["child_added", "child_removed", "child_moved", "child_changed", "value", "keyMapLoaded", "dynamicKeyLoaded"];
        b.prototype = {
            child: function(a) {
                var c = this.isJoinedChild() ? this.sourceKey(a) : a;
                if (this.hasDynamicChild(c)) throw new Error("Cannot use child() to retrieve a dynamic keyMap ref; try loadChild() instead");
                return c === j && (k.info('Path(%s): Asked for child key "%s"; it is not in my key map', this.name(), a), c = a), ".value" === c ? this : new b(this.ref().child(c), this)
            },
            dynamicChild: function(a, c) {
                return new b({
                    ref: this.ref(),
                    dynamicSource: a,
                    keyMap: {
                        ".value": c
                    },
                    sync: this.props.sync
                }, this)
            },
            name: function() {
                return this.isDynamic() ? this.props.pathName + "/" + (this.props.dynamicKey || "<dynamic>") : this.props.pathName
            },
            toString: function() {
                return this.ref() ? this.ref().toString() : this.props.ref.toString() + "/<dynamic>"
            },
            loadData: function(a, b) {
                l.defer(function() {
                    this.isReadyForOps() ? this.ref().once("value", function(c) {
                        this.isJoinedChild() ? this._parseRecord(c, a, b) : this._parseRecordSet(c, a, b)
                    }, this) : (k.debug("Path(%s) loadData() called but dynamic key has not loaded yet; waiting for dynamicKeyLoaded event", this.name()), this._waitForReady(a, b))
                }, this)
            },
            pickAndSet: function(a, b, c) {
                if (this.isDynamic()) k.debug("Path(%s) is dynamic (ready only), so pickAndSet was ignored", this.name()), b(null);
                else if (null === a) this.ref().remove(b);
                else {
                    var d = this._dataForSetOp(a);
                    this.isSortBy() && c !== j ? this.ref().setWithPriority(d, c, b) : this.ref().set(d, b)
                }
            },
            pickAndUpdate: function(a, b) {
                if (!l.isObject(a)) throw new Error("Update failed: First argument must be an object containing the children to replace.");
                if (this.isDynamic()) k.debug("Path(%s) is dynamic (ready only), so pickAndUpdate was ignored", this.name()), b(null);
                else {
                    var c = this._dataForSetOp(a, !0);
                    l.isEmpty(c) ? b(null) : this.isPrimitive() ? this.ref().set(c, b) : this.ref().update(c, b)
                }
            },
            remove: function(a) {
                this.ref().remove(a)
            },
            isIntersection: function() {
                return this.props.intersects
            },
            isSortBy: function() {
                return this.props.sortBy
            },
            setSortBy: function(a) {
                this.props.sortBy = a
            },
            ref: function() {
                return this.isDynamic() ? this.isReadyForOps() ? this.props.ref.child(this.props.dynamicKey) : null : this.props.ref
            },
            hasKey: function(a) {
                return l.contains(this.getKeyMap(), a)
            },
            sourceKey: function(a) {
                var b = a;
                return this.isJoinedChild() && l.find(this.props.keyMap, function(c, d) {
                    var e = c === a;
                    return e && (b = d), e
                }), b
            },
            aliasedKey: function(a) {
                return this.getKeyMap()[a]
            },
            isJoinedChild: function() {
                return !!this.parentPath
            },
            isPrimitive: function() {
                return l.has(this.getKeyMap(), ".value") && this.isJoinedChild()
            },
            removeConflictingKey: function(a, b) {
                k("Path(%s) cannot use key %s->%s; that destination field is owned by Path(%s). You could specify a keyMap and map them to different destinations if you want both values in the joined data.", this, a, this.getKeyMap()[a], b), delete this.props.keyMap[a]
            },
            suppressDynamicKey: function(a) {
                this.props.dynamicAbstracts[a] = this.aliasedKey(a), delete this.props.keyMap[a]
            },
            getKeyMap: function() {
                return this.props.keyMap || {}
            },
            eachKey: function(a, b, c) {
                this._iterateKeys(a, b, c, !1)
            },
            eachSourceKey: function(a, b, c) {
                this._iterateKeys(a, b, c, !0)
            },
            getDynamicPaths: function() {
                return this.dynamicChildPaths
            },
            equals: function(a) {
                return this.isReadyForOps() && a.toString() === this.toString()
            },
            _dataForSetOp: function(a, b) {
                var c;
                return c = this.isJoinedChild() ? this._pickMyData(a, b) : l.mapObject(a, function(a) {
                    return this._pickMyData(a, b)
                }, this)
            },
            _pickMyData: function(a, b) {
                var c = {};
                return this.eachKey(a, function(d, e, f, g) {
                    (!b || g && l.has(a, g) || !g && l.has(a, e)) && (c[d] = f)
                }), l.isEmpty(c) ? null : l.has(c, ".value") ? c[".value"] : c
            },
            _observerAdded: function(a) {
                this.isOneTimeEvent(a) || (k('Path(%s) Added "%s" observer, %d total', a, this.name(), this.getObservers(a).length), this.subs[a] || (this._startObserving(a), this.isDynamic() && 1 === this.getObservers(l.keys(this.subs)).length && this._watchDynamicSource()))
            },
            _observerRemoved: function(a, b) {
                this.isOneTimeEvent(a) || (b.length && k('Path(%s) Removed %d observers of "%s", %d remaining', a, b.length, this.name(), this.getObservers(a).length), !this.hasObservers(a) && this.subs[a] && (this._stopObserving(a), delete this.subs[a], this.isDynamic() && !this.hasObservers(l.keys(this.subs)) && this._unwatchDynamicSource()))
            },
            _sendEvent: function(a, b, c) {
                function d(d) {
                    (null !== d || l.contains(["child_removed", "value"], a)) && (k.debug("Path(%s)::sendEvent(%s, %s) to %d observers", this.name(), a, b.name() + (c !== j ? "->" + c : ""), this.getObservers(a).length, d), this.triggerEvent(a, this, a, b.name(), d, c, b.getPriority()))
                }
                "value" === a ? this.loadData(d, this) : this.isJoinedChild() ? this.hasKey(b.name()) && d.call(this, b.val()) : this.child(b.name()).loadData(d, this)
            },
            isDynamic: function() {
                return !!this.props.dynamicSource
            },
            isReadyForOps: function() {
                return !this.isDynamic() || !l.isEmpty(this.props.dynamicKey)
            },
            hasDynamicChild: function(a) {
                return l.has(this.dynamicChildPaths, a)
            },
            isReadOnly: function() {
                return this.props.readOnly
            },
            _buildKeyMap: function(a) {
                a && !a.isJoinedChild() && (this.props.intersects = a.isIntersection()), m.getKeyMapLoader(this, a).done(function(a, b, c) {
                    l.isEmpty(b) && k.warn("Path(%s) contains an empty keyMap", this.name()), a && k.info('Path(%s) no keyMap specified and could not find data at path "%s", this data is now read-only!', this.name(), this.toString()), this.props.readOnly = a, this.props.keyMap = b, this.dynamicChildPaths = c, this.observeOnce("dynamicKeyLoaded", function() {
                        k.debug("Path(%s) finished keyMap: %j", this.toString(), this.getKeyMap()), this.triggerEvent("keyMapLoaded", b)
                    }, this)
                }, this)
            },
            _parseRecordSet: function(a, b, c) {
                var d = {},
                    e = this,
                    f = l.createQueue();
                a.forEach(function(a) {
                    var b = a.name();
                    d[b] = null, f.addCriteria(function(c) {
                        e._parseRecord(a, function(a) {
                            null === a ? delete d[b] : d[b] = a, c()
                        })
                    })
                }), f.done(function() {
                    l.isEmpty(d) && (d = null), k.debug("Path(%s) _parseRecordSet: %j", e.name(), d), b.call(c, d, a)
                })
            },
            _parseRecord: function(a, b, c) {
                var d = null,
                    e = l.createQueue(),
                    f = a.val();
                return null !== f && (this.isPrimitive() ? d = f : (d = {}, this.eachSourceKey(f, l.bind(this._parseValue, this, e, d, a)))), e.done(function() {
                    d = g(d), b.call(c, d, a)
                }, this), b
            },
            _parseValue: function(a, b, c, d, e, f) {
                null !== f && (this.hasDynamicChild(d) ? (b[e] = null, b[".id:" + e] = f, a.addCriteria(function(a) {
                    this._parseDynamicChild(c, d, e, function(c) {
                        null === c ? delete b[e] : b[e] = c, a()
                    })
                }, this)) : b[e] = f)
            },
            _parseDynamicChild: function(a, b, c, d) {
                var e = a.ref().child(b),
                    f = this.dynamicChildPaths[b].dynamicChild(e, c);
                f.loadData(d)
            },
            _iterateKeys: function(a, b, c, d) {
                var e = l.Args("_iterateKeys", Array.prototype.slice.call(arguments), 2, 4).skip();
                b = e.nextReq("function"), c = e.next("object"), d = e.next("boolean");
                var f = this.getKeyMap();
                d && f[".value"] ? b.call(c, ".value", f[".value"], a) : (l.each(f, function(e, f) {
                    var g = h(this, a, f, e, d);
                    b.call(c, f, e, g)
                }, this), d || l.each(this.props.dynamicAbstracts, function(d, e) {
                    var f = ".id:" + d;
                    b.call(c, e, d, l.has(a, f) ? a[f] : null, f)
                }))
            },
            _initDynamicSource: function() {
                if (this.isDynamic()) {
                    var a = this.props.dynamicSource;
                    a.once("value", this._dynamicSourceEvent, function(b) {
                        console.error("Could not access dynamic source path", a.toString()), this.abortObservers(b)
                    }, this)
                } else this.triggerEvent("dynamicKeyLoaded", j)
            },
            _watchDynamicSource: function() {
                if (this.isDynamic()) {
                    var a = this.props.dynamicSource;
                    a.on("value", this._dynamicSourceEvent, function(b) {
                        console.error("Lost access to my dynamic source path", a.toString()), this.abortObservers(b)
                    }, this)
                }
            },
            _unwatchDynamicSource: function() {
                this.isDynamic() && this.props.dynamicSource.off("value", this._dynamicSourceEvent, this)
            },
            _dynamicSourceEvent: function(a) {
                this._observeNewSourcePath(a.val())
            },
            _observeNewSourcePath: function(a) {
                if (a !== this.props.dynamicKey) {
                    var b = this.props.dynamicKey,
                        c = b === j,
                        d = l.keys(this.subs);
                    l.each(d, this._stopObserving, this), c || k("Path(%s) stopped observing dynamic key %s", this.name(), b), this.props.dynamicKey = a, null !== a && (i(a), k("Path(%s) observing dynamic key %s", this.name(), a), c && this.triggerEvent("dynamicKeyLoaded", a), l.each(d, this._startObserving, this))
                }
            },
            _waitForReady: function(a, b) {
                this.observeOnce("dynamicKeyLoaded", function() {
                    k.debug("Path(%s) loadData() dynamic key loaded, completing data load", this.name()), this.isReadyForOps() ? this.loadData(a, b) : (k("Path(%s) has a dynamic key but the key was null. Returning null for value"), a.call(b, null))
                }, this)
            },
            _stopObserving: function(a) {
                this.ref().off(a, this.subs[a], this)
            },
            _startObserving: function(a) {
                this.subs[a] = l.bind(this._sendEvent, this, a), this.ref().on(a, this.subs[a], this.abortObservers, this)
            }
        }, l.inherit(b, l.Observable), m.Path = b
    }(b),
    function(a, b) {
        "use strict";

        function c(a) {
            var b;
            this._assertValidPaths(a), this.finalPaths = [], m(a) ? (this.joinedParent = a[1], this.refName = a[0], this.rootRef = this.joinedParent.rootRef, b = this.refName, this.queue = this.joinedParent.joinedParent ? this._loadDeepChild(b) : this._loadRecord(b)) : (this.finalPaths = d(a), this.refName = k(this.finalPaths), this.rootRef = this.finalPaths[0].ref().root(), this.queue = n.createQueue(i(this.finalPaths))), this.queue.done(function() {
                this.intersections = h(this.finalPaths), this.sortPath = f(this.finalPaths, this.intersections), g(this.finalPaths, this.sortPath), this._assertSortPath(), j(this.finalPaths)
            }, this).fail(function() {
                n.each(Array.prototype.slice.call(arguments), function(a) {
                    p.error(a)
                })
            })
        }

        function d(a) {
            return n.map(a, function(a) {
                return a instanceof o.Path ? a : new o.Path(a)
            })
        }

        function e(a, b) {
            return n.find(a, function(a) {
                return a.hasKey(b)
            }) || f(a, h(a))
        }

        function f(a, b) {
            return n.find(a, function(a) {
                return a.isSortBy()
            }) || (n.isEmpty(b) ? a[0] : b[0])
        }

        function g(a, b) {
            b && (b.setSortBy(!0), p.debug("Path(%s) is the sort path for this join", b.name()), n.each(a, function(a) {
                a.isSortBy() && !a.equals(b) && (p.warn("Multiple sort paths found. Ignoring Path(%s)", a.name()), a.setSortBy(!1))
            }))
        }

        function h(a) {
            return n.filter(a, function(a) {
                return a.isIntersection()
            })
        }

        function i(a) {
            return n.map(a, function(a) {
                return function(b) {
                    a.observeOnce("keyMapLoaded", b.bind(null, null))
                }
            })
        }

        function j(a) {
            var b = {};
            n.each(a.slice(0).reverse(), function(a) {
                n.each(a.getKeyMap(), function(c, d) {
                    n.has(b, c) ? a.removeConflictingKey(d, b[c]) : b[c] = a
                })
            })
        }

        function k(a) {
            var b = n.map(a, function(a) {
                return a.ref().name()
            });
            return b.length > 1 ? "[" + b.join("][") + "]" : b[0]
        }

        function l(a) {
            return a instanceof n.Firebase || a instanceof MockFirebase || a instanceof o.JoinedRecord || a instanceof o.Path
        }

        function m(a) {
            return a && 2 === a.length && "string" == typeof a[0] && a[1] instanceof o.JoinedRecord
        }
        var n = b.pkg("util"),
            o = b.pkg("join"),
            p = b.pkg("log");
        c.prototype = {
            _assertValidPaths: function(a) {
                if (!a || !a.length) throw new Error("Cannot construct a JoinedRecord without at least 1 path");
                m(a) || n.each(a, this._assertValidPath, this)
            },
            _assertValidPath: function(a, b) {
                if (!(l(a) || n.isObject(a) && l(a.ref))) throw new Error(n.printf("Invalid path at position %d; it must be a valid Firebase or JoinedRecord instance, or if a props object is used, contain a ref key which is a valid instance", b))
            },
            _assertSortPath: function() {
                if (!this.sortPath) throw new Error("Did not set a sort path. Should not be able to create this condition");
                if (!n.isEmpty(this.intersections) && !this.sortPath.isIntersection()) throw new Error(n.printf("Sort path cannot be set to a non-intersecting path as this makes no sense", this.name()))
            },
            _loadDeepChild: function(a) {
                return n.createQueue().addCriteria(function(b) {
                    this.joinedParent.queue.done(function() {
                        var c = e(this.joinedParent.paths, a);
                        c.isDynamic() ? this.finalPaths.push(new o.Path({
                            ref: c.ref() || c.props.ref.push(),
                            keyMap: {
                                ".value": ".value"
                            }
                        }, c)) : this.finalPaths.push(c.child(a)), b()
                    }, this).fail(b)
                }, this)
            },
            _loadRecord: function(a) {
                var b = n.createQueue(),
                    c = this.finalPaths,
                    d = this.joinedParent;
                return b.addCriteria(function(b) {
                    d.queue.done(function() {
                        n.each(d.paths, function(b) {
                            var d = b.child(a);
                            c.push(d), n.each(b.getDynamicPaths(), function(a, e) {
                                c.push(a.dynamicChild(d.ref().child(e), b.aliasedKey(e))), d.suppressDynamicKey(e)
                            })
                        }), n.createQueue(i(c)).done(b)
                    }).fail(b)
                }, this), b
            }
        }, o.PathLoader = c
    }(a, b),
    function(a, b) {
        function c(a) {
            this.rec = a, this.observers = [], this.valueParts = [], this.callbacksExpected = 0, this.callbacksReceived = 0, this.state = "unloaded", this.snapshot = null, this.pendingPaths = g(a.paths, a.sortPath)
        }

        function d(a, b) {
            var c = j.map(a.intersects, function(a) {
                    return a[1]
                }),
                d = {};
            return j.each(b[a.sortIndex], function(g, h) {
                if (e(c, b, h)) {
                    var i = j.map(b, function(a) {
                        return j.isObject(a) ? a[h] : null
                    });
                    d[h] = f(a, i)
                }
            }), j.isEmpty(d) ? null : d
        }

        function e(a, b, c) {
            return !j.contains(a, function(a) {
                return !j.isObject(b[a]) || j.isEmpty(b[a][c])
            })
        }

        function f(a, b) {
            var c = {};
            return j.each(b, function(b, d) {
                if (null !== b) {
                    var e = a.both[d][0];
                    e.isPrimitive() ? j.extend(c, i(e.aliasedKey(".value"), b)) : j.extend(!0, c, b), e.isDynamic() && j.extend(c, i(".id:" + e.aliasedKey(".value"), e.props.dynamicKey))
                }
            }), j.isEmpty(c) ? null : c
        }

        function g(a, b) {
            var c = {
                intersects: [],
                unions: [],
                both: [],
                expect: 0,
                sortIndex: 0
            };
            return j.each(a, function(a) {
                h(c, b, a)
            }), c
        }

        function h(a, b, c) {
            c === b && (a.sortIndex = a.expect);
            var d = [c, a.expect];
            c.isIntersection() ? a.intersects.push(d) : a.unions.push(d), a.both.push(d), a.expect++
        }

        function i(a, b) {
            var c = {};
            return c[a] = b, c
        }
        var j = b.pkg("util"),
            k = b.pkg("log"),
            l = b.pkg("join");
        c.prototype = {
            value: function() {
                return this.observers.push(j.toArray(arguments)), "loaded" === this.state ? this._notify() : "unloaded" === this.state && this._process(), this
            },
            ref: function() {
                return this.rec
            },
            _process: function() {
                this.state = "processing", j.each(this.pendingPaths.intersects, this._loadIntersection, this), j.each(this.pendingPaths.unions, this._loadUnion, this)
            },
            _finalize: function() {
                if ("loaded" !== this.state) {
                    this.state = "loaded";
                    var a = null;
                    a = !this.rec.joinedParent && this.pendingPaths.intersects.length ? d(this.pendingPaths, this.valueParts) : f(this.pendingPaths, this.valueParts), this.snapshot = new l.JoinedSnapshot(this.rec, a), k.debug('SnapshotBuilder: Finalized snapshot "%s": %j', this.rec, this.snapshot.val()), this._notify()
                }
            },
            _notify: function() {
                var a = this.snapshot;
                j.each(this.observers, function(b) {
                    b[0].apply(b[1], [a].concat(b.splice(2)))
                }), this.observers = []
            },
            _loadIntersection: function(a) {
                var b = a[0],
                    c = a[1];
                this.callbacksExpected++, k.debug('SnapshotBuilder._loadIntersection: initialized "%s"', b.toString()), b.loadData(function(a) {
                    k.debug('SnapshotBuilder._loadIntersection completed "%s" with value "%j"', b.toString(), a), null === a ? (k("SnapshatBuilder: Intersecting Path(%s) was null, so the record %s will be excluded", b.toString(), this.rec.name()), this.valueParts = [], this._finalize()) : (this.valueParts[c] = a, this._callbackCompleted())
                }, this)
            },
            _loadUnion: function(a) {
                var b = a[0],
                    c = a[1];
                this.callbacksExpected++, k.debug('SnapshotBuilder._loadUnion: initialized "%s"', b.toString()), b.loadData(function(a) {
                    k.debug('SnapshotBuilder._loadUnion completed "%s" with value "%j"', b.toString(), a), this.valueParts[c] = a, this._callbackCompleted()
                }, this)
            },
            _callbackCompleted: function() {
                this.callbacksExpected === ++this.callbacksReceived && this._finalize()
            }
        }, l.buildSnapshot = function(a, b) {
            var d = new c(a);
            return b && d.value.apply(d, j.toArray(arguments).slice(1)), d
        }, l.sortSnapshotData = function(a, b, c) {
            var d = b;
            return j.isEmpty(b) || (a.joinedParent ? (d = {}, j.each(a.paths, function(a) {
                a.eachKey(b, function(c, e, f) {
                    null !== f && (a.hasDynamicChild(c) ? (d[".id:" + e] = f, d[e] = b[e]) : d[e] = f)
                })
            })) : (d = {}, j.each(a.sortedChildKeys, function(a) {
                c && c.name() === a ? j.isEmpty(c.val()) || (d[a] = c.val()) : j.isEmpty(b[a]) || (d[a] = b[a])
            }))), j.isEmpty(d) ? null : d
        }
    }(a, b),
    function(a, b) {
        function c(a, b) {
            1 === a.length && d.isArray(a[0]) && (a = a[0]);
            var c = d.map(a, function(a, c) {
                if (!d.isObject(a)) throw new Error("Invalid argument at pos %s, must be a Firebase, JoinedRecord, or hash of properties", c);
                return (a instanceof d.Firebase || a instanceof e.JoinedRecord) && (a = {
                    ref: a
                }), b(a)
            });
            return d.construct(e.JoinedRecord, c)
        }
        var d = b.pkg("util"),
            e = b.pkg("join");
        a.join = function() {
            return c(Array.prototype.slice.call(arguments), function(a) {
                return d.has(a, "intersects") || (a.intersects = !1), a
            })
        }, a.intersection = function() {
            return c(Array.prototype.slice.call(arguments), function(a) {
                return d.has(a, "intersects") || (a.intersects = !0), a
            })
        }, a.JoinedRecord = e.JoinedRecord
    }(a, b)
}("undefined" != typeof window ? [window.Firebase.util = {}][0] : module.exports);