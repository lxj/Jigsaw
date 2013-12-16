/*_shadowClone 复制一个对象*/
function _shadowClone(e) {
    var t = {};
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    return t
}
function AutoLoader(e, t) {
    if (typeof e != "function") throw new TypeError;
    this._generator = e,
    this._timeout = t,
    this._context = arguments[2],
    this._pool = [],
    this._load()
}
function _cutGrid(e, t) {//e json数据直接量，t一个回调函数
    function a(a) {
        function h(o) {
            var u, a = _shadowClone(o);
            c++,
            u = c === l ? e[r.measure] - s: Math.floor(o[r.measure] * e[r.measure] / 100),
            a[n.offset] = i + e[n.offset],
            a[r.offset] = s + e[r.offset],
            a[n.measure] = f,
            a[r.measure] = u,
            a.colorPattern = e.colorPattern,
            t(a),
            s += u
        }
        var f, l = a[r.name].length,
        c = 0;
        u++,
        f = u === o ? e[n.measure] - i: Math.floor(a[n.measure] * e[n.measure] / 100),
        a.random === !1 ? a[r.name].forEach(h) : a[r.name].randomEach(h),
        s = 0,
        i += f
    }
    var n, r;
    e.rows ? (n = {
        name: "rows",
        measure: "height",
        offset: "top"
    },
    r = {
        name: "cols",
        measure: "width",
        offset: "left"
    }) : (n = {
        name: "cols",
        measure: "width",
        offset: "left"
    },
    r = {
        name: "rows",
        measure: "height",
        offset: "top"
    });
    var i = 0,
    s = 0,
    o = e[n.name].length,
    u = 0;
    e.random === !1 ? e[n.name].forEach(a) : e[n.name].randomEach(a)
}
function _getGrids(e) {//e为一个对象
    var t = [],
    n = 0,
    r = .18,
    i = e.colorPatterns[0];
    return _cutGrid(e.pageLayout,
    function(e) {
        e.colorPattern || (e.colorPattern = i[n++]);
        if (e.rows || e.cols) _cutGrid(e, arguments.callee);
        else {
            var s = e.colorPattern,
            o = s.backgrounds,
            u = o.length,
            a = s.fontColor;
            e.fontSize = Math.floor(Math.sqrt(e.width * e.height) * r),
            e.backgroundColor = o[Math.floor(Math.random() * u)],
            e.fontColor = a,
            t.push(e)
        }
    }),
    t
}
function getTagData() {
    var e = [],
    t = window.tagData,
    n = window.tagConfig.tagLevels;
    for (var r in t) if (t.hasOwnProperty(r)) {
        var i = 0,
        s = n[r].count;
        t[r].randomEach(function(t) {
            return s <= i ? !1 : (e.push(t), i++, !0)
        })
    }
    return e
}
function reflowTagElem(e, t) {
    e.style.top = t.top + "px",
    e.style.left = t.left + "px",
    e.style.width = t.width - 2 + "px",
    e.style.height = t.height - 2 + "px",
    e.style.fontSize = t.fontSize + "px",
    e.style.color = t.fontColor,
    e.style.backgroundColor = t.backgroundColor,
    e.order = t.width * t.height
}
function _setContent() {
    var e = tagDataAutoLoader.get();
    tagElems.sort(function(e, t) {
        return t.order - e.order
    }),
    tagElems.forEach(function(t, n) {
        t.innerHTML = tagTemplate(e[n])
    })
}
function _initStage(e, t) {
    try {
        var n = e.clientWidth,
        r = ""; ["-moz-", "-webkit-", "-o-", "-ms-", ""].forEach(function(e) {
            r += animationTemplate({
                prefix: e,
                offset: n
            })
        }),
        animationRules.innerHTML = r
    } catch(i) {}
    t.pageLayout.width = e.clientWidth,
    t.pageLayout.height = e.clientHeight
}
function fillStage(e) {
    var t = gridsAutoLoader.get();
    t.forEach(function(t) {
        var n = document.createElement("div");
        n.className = "tag",
        reflowTagElem(n, t),
        e.appendChild(n),
        tagElems.push(n)
    }),
    _setContent()
}
function refreshStage() {
    tagElems.confound();
    var e = gridsAutoLoader.get();
    e.forEach(function(e, t) {
        reflowTagElem(tagElems[t], e)
    });
    _setContent()
}
function slideStage(e, t) {
    var n = tagElems.length,
    r = 0,
    i, s;
    e > 0 ? (s = "right-out", i = "left-in") : (s = "left-out", i = "right-in"),
    tagElems.forEach(function(e) {
        setTimeout(function() {
            e.style.animationName = s,
            e.style.webkitAnimationName = s,
            setTimeout(function() {
                e.style.animationName = i,
                e.style.webkitAnimationName = i
            },
            800),
            r++,
            r === n && t()
        },
        Math.random() * 400)
    })
}
function _track() {
    setTimeout(function() {
        window.neteaseTracker && window.neteaseTracker()
    },
    1200)
} (function() {
    var e = {};
    this.microTemplate = function t(n, r) {
        var i = /\W/.test(n) ? new Function("data", "var p=[];p.push('" + n.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');return p.join('');") : e[n] = e[n] || t(document.getElementById(n).innerHTML);
        return r ? i(r) : i
    }
})(),
function() {
    function e(e, t) {
        var n = [];
        typeof t == "undefined" && (t = e, e = 0);
        for (; e < t; e++) n.push(e);
        return n
    }
    Array.prototype.randomEach = function(t) {
        if (typeof t != "function") throw new TypeError;
        var n = this.length,
        r = e(n);
        while (n) {
            var i = Math.floor(Math.random() * n--);
            if (t(this[r[i]]) === !1) break;
            r[i] = r[n]
        }
    },
    Array.prototype.confound = function() {
        this.sort(function() {
            return Math.random() - .5
        })
    },
    Array.prototype.forEach || (Array.prototype.forEach = function(e) {
        var t = this.length;
        if (typeof e != "function") throw new TypeError;
        var n = arguments[1];
        for (var r = 0; r < t; r++) r in this && e.call(n, this[r], r, this)
    })
} (),
AutoLoader.prototype._load = function() {
    var e = this;
    clearTimeout(this._loading),
    this._loading = setTimeout(function() {
        e._pool.push(e._generator.apply(e._context))
    },
    this._timeout)
},
AutoLoader.prototype.get = function() {
    var e;
    return clearTimeout(this._loading),
    this._pool.length > 0 ? e = this._pool.pop() : e = this._generator.apply(this._context),
    this._load(),
    e
},
AutoLoader.prototype.regenerate = function() {
    this._pool.length = 0,
    this._load()
},
window.tagConfig = {
    areas: {
        cols_40_60: [{
            width: 40,
            rows: [{
                height: 100
            }]
        },
        {
            width: 60,
            rows: [{
                height: 100
            }]
        }],
        cols_50_50: [{
            width: 50,
            rows: [{
                height: 100
            }]
        },
        {
            width: 50,
            rows: [{
                height: 100
            }]
        }],
        cols_32_32_36: [{
            width: 32,
            rows: [{
                height: 100
            }]
        },
        {
            width: 32,
            rows: [{
                height: 100
            }]
        },
        {
            width: 36,
            rows: [{
                height: 100
            }]
        }]
    }
},
window.tagConfig.pageLayout = {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    random: !1,
    cols: [{
        width: 45,
        rows: [{
            random: !1,
            height: 100,
            rows: [{
                height: 45,
                cols: [{
                    width: 100
                }]
            },
            {
                height: 30,
                cols: [{
                    width: 100
                }]
            },
            {
                height: 25,
                cols: [{
                    width: 100,
                    cols: [{
                        width: 35,
                        rows: [{
                            height: 100
                        }]
                    },
                    {
                        width: 25,
                        rows: [{
                            height: 30
                        },
                        {
                            height: 40
                        },
                        {
                            height: 30
                        }]
                    },
                    {
                        width: 15,
                        rows: [{
                            height: 40
                        },
                        {
                            height: 60
                        }]
                    },
                    {
                        width: 25,
                        rows: [{
                            height: 35
                        },
                        {
                            height: 25
                        },
                        {
                            height: 40
                        }]
                    }]
                }]
            }]
        }]
    },
    {
        width: 55,
        random: !1,
        rows: [{
            height: 50,
            cols: [{
                width: 45,
                rows: [{
                    height: 35,
                    cols: window.tagConfig.areas.cols_50_50
                },
                {
                    height: 35,
                    cols: window.tagConfig.areas.cols_40_60
                },
                {
                    height: 30
                }]
            },
            {
                width: 55,
                rows: [{
                    height: 50
                },
                {
                    height: 50
                }]
            }]
        },
        {
            height: 28,
            cols: [{
                width: 30,
                rows: [{
                    height: 100
                }]
            },
            {
                width: 30,
                rows: [{
                    height: 40
                },
                {
                    height: 60,
                    cols: window.tagConfig.areas.cols_40_60
                }]
            },
            {
                width: 40,
                rows: [{
                    height: 50,
                    cols: window.tagConfig.areas.cols_50_50
                },
                {
                    height: 50,
                    cols: window.tagConfig.areas.cols_32_32_36
                }]
            }]
        },
        {
            height: 22,
            cols: [{
                width: 35,
                rows: [{
                    height: 100
                }]
            },
            {
                width: 15,
                rows: [{
                    height: 50
                },
                {
                    height: 50
                }]
            },
            {
                width: 15,
                rows: [{
                    height: 50
                },
                {
                    height: 50
                }]
            },
            {
                width: 20,
                rows: [{
                    height: 32
                },
                {
                    height: 32
                },
                {
                    height: 36
                }]
            },
            {
                width: 15,
                rows: [{
                    height: 50
                },
                {
                    height: 50
                }]
            }]
        }]
    }]
},
window.tagConfig.colorPatterns = [[{
    backgrounds: ["#ce5f52", "#e37063"],
    fontColor: "#FFF",
    borderColor: "#5c666f"
},
{
    backgrounds: ["#6c5d56", "#746760"],
    fontColor: "#FFF",
    borderColor: "#5c666f"
},
{
    backgrounds: ["#c8b66a", "#dbc877"],
    fontColor: "#FFF",
    borderColor: "#5c666f"
},
{
    backgrounds: ["#6e96b1", "#82a8bf"],
    fontColor: "#FFF",
    borderColor: "#5c666f"
}]],
window.tagConfig.tagLevels = {
    1 : {
        count: 6
    },
    2 : {
        count: 10
    },
    3 : {
        count: 10
    },
    4 : {
        count: 11
    }
};
var tagTemplate = microTemplate("tag_template"),
tagElems = [],
gridsAutoLoader,
tagDataAutoLoader,
animationTemplate = microTemplate("animation_template"),
animationRules = document.getElementById("animation_rules"); (function() {
    function f() {
        clearTimeout(t),
        t = setTimeout(function() {
            gridsAutoLoader.regenerate(),
            _initStage(e, window.tagConfig),
            refreshStage()
        },
        500)
    }
    var e = document.getElementById("stage"),
    t,
    n = document.getElementById("nav_bar"),
    r = document.getElementById("nav_current"),
    i = n.getElementsByTagName("a"),
    s,
    o,
    u = ["tagData1", "tagData3", "tagData7"],
    a = location.hash.match(/today|three-days|one-week/) || "today";
    Array.prototype.forEach.call(i,
    function(e, t) {
        e.className.indexOf(a) !== -1 && (r.style.left = e.offsetLeft + "px", r.style.display = "block", e.className += " current", s = e, o = t, window.tagData = window[u[t]]),
        e.onclick = function() {
            window[u[t]] && (window.tagData = window[u[t]], tagDataAutoLoader.regenerate()),
            r.style.left = e.offsetLeft + "px",
            e.className += " current",
            s.className = s.className.replace(/\s*current/, ""),
            slideStage(o - t,
            function() {
                setTimeout(function() {
                    _setContent()
                },
                400)
            }),
            s = e,
            o = t,
            _track()
        }
    }),
    gridsAutoLoader = new AutoLoader(function() {
        return _getGrids(window.tagConfig)
    },
    1e3),
    tagDataAutoLoader = new AutoLoader(function() {
        return getTagData()
    },
    1e3),
    _initStage(e, window.tagConfig),
    fillStage(e),
    window.onresize = f;
    var l = 0;
    document.getElementById("refresh").onclick = function() {
        var e = "rotate(" + 360 * ++l + "deg)";
        this.style.transform = e;
        this.style.webkitTransform = e;
        refreshStage();
    }
})();