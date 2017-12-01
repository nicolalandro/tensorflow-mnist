<<<<<<< HEAD
"use strict";

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i), n && t(e, n), e
        }
    }(),
    Main = function() {
        function t() {
            _classCallCheck(this, t), this.canvas = document.getElementById("main"), this.input = document.getElementById("input"), this.canvas.width = 449, this.canvas.height = 449, this.ctx = this.canvas.getContext("2d"), this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this)), this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this)), this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this)), this.initialize()
        }
        return _createClass(t, [{
            key: "initialize",
            value: function() {
                this.ctx.fillStyle = "#FFFFFF", this.ctx.fillRect(0, 0, 449, 449), this.ctx.lineWidth = 1, this.ctx.strokeRect(0, 0, 449, 449), this.ctx.lineWidth = .05;
                for (var t = 0; t < 27; t++) this.ctx.beginPath(), this.ctx.moveTo(16 * (t + 1), 0), this.ctx.lineTo(16 * (t + 1), 449), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(0, 16 * (t + 1)), this.ctx.lineTo(449, 16 * (t + 1)), this.ctx.closePath(), this.ctx.stroke();
                this.drawInput(), $("#output td").text("").removeClass("success")
            }
        }, {
            key: "onMouseDown",
            value: function(t) {
                this.canvas.style.cursor = "default", this.drawing = !0, this.prev = this.getPosition(t.clientX, t.clientY)
            }
        }, {
            key: "onMouseUp",
            value: function() {
                this.drawing = !1, this.drawInput()
            }
        }, {
            key: "onMouseMove",
            value: function(t) {
                if (this.drawing) {
                    var e = this.getPosition(t.clientX, t.clientY);
                    this.ctx.lineWidth = 16, this.ctx.lineCap = "round", this.ctx.beginPath(), this.ctx.moveTo(this.prev.x, this.prev.y), this.ctx.lineTo(e.x, e.y), this.ctx.stroke(), this.ctx.closePath(), this.prev = e
                }
            }
        }, {
            key: "getPosition",
            value: function(t, e) {
                var i = this.canvas.getBoundingClientRect();
                return {
                    x: t - i.left,
                    y: e - i.top
                }
            }
        }, {
            key: "drawInput",
            value: function() {
                var t = this.input.getContext("2d"),
                    e = new Image;
                e.onload = function() {
                    var i = [],
                        n = document.createElement("canvas").getContext("2d");
                    n.drawImage(e, 0, 0, e.width, e.height, 0, 0, 28, 28);
                    for (var s = n.getImageData(0, 0, 28, 28).data, a = 0; a < 28; a++)
                        for (var o = 0; o < 28; o++) {
                            var c = 4 * (28 * a + o);
                            i[28 * a + o] = (s[c + 0] + s[c + 1] + s[c + 2]) / 3, t.fillStyle = "rgb(" + [s[c + 0], s[c + 1], s[c + 2]].join(",") + ")", t.fillRect(5 * o, 5 * a, 5, 5)
                        }
                    255 !== Math.min.apply(Math, i) && $.ajax({
                        url: "/api/mnist",
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(i),
                        success: function(t) {
                            for (var e = 0; e < 2; e++) {
                                for (var i = 0, n = 0, s = 0; s < 10; s++) {
                                    var a = Math.round(1e3 * t.results[e][s]);
                                    a > i && (i = a, n = s);
                                    for (var o = String(a).length, c = 0; c < 3 - o; c++) a = "0" + a;
                                    var r = "0." + a;
                                    a > 999 && (r = "1.000"), $("#output tr").eq(s + 1).find("td").eq(e).text(r)
                                }
                                for (var h = 0; h < 10; h++) h === n ? $("#output tr").eq(h + 1).find("td").eq(e).addClass("success") : $("#output tr").eq(h + 1).find("td").eq(e).removeClass("success")
                            }
                        }
                    })
                }, e.src = this.canvas.toDataURL()
            }
        }]), t
    }();
$(function() {
    var t = new Main;
    $("#clear").click(function() {
        t.initialize()
    })
});
=======
/* global $ */
class Main {
    constructor() {
        this.canvas = document.getElementById('main');
        this.input = document.getElementById('input');
        this.canvas.width  = 449; // 16 * 28 + 1
        this.canvas.height = 449; // 16 * 28 + 1
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup',   this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.initialize();
    }
    initialize() {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, 449, 449);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(0, 0, 449, 449);
        this.ctx.lineWidth = 0.05;
        for (var i = 0; i < 27; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo((i + 1) * 16,   0);
            this.ctx.lineTo((i + 1) * 16, 449);
            this.ctx.closePath();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(  0, (i + 1) * 16);
            this.ctx.lineTo(449, (i + 1) * 16);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.drawInput();
        $('#output td').text('').removeClass('success');
    }
    onMouseDown(e) {
        this.canvas.style.cursor = 'default';
        this.drawing = true;
        this.prev = this.getPosition(e.clientX, e.clientY);
    }
    onMouseUp() {
        this.drawing = false;
        this.drawInput();
    }
    onMouseMove(e) {
        if (this.drawing) {
            var curr = this.getPosition(e.clientX, e.clientY);
            this.ctx.lineWidth = 16;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(this.prev.x, this.prev.y);
            this.ctx.lineTo(curr.x, curr.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.prev = curr;
        }
    }
    getPosition(clientX, clientY) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    drawInput() {
        var ctx = this.input.getContext('2d');
        var img = new Image();
        img.onload = () => {
            var inputs = [];
            var small = document.createElement('canvas').getContext('2d');
            small.drawImage(img, 0, 0, img.width, img.height, 0, 0, 28, 28);
            var data = small.getImageData(0, 0, 28, 28).data;
            for (var i = 0; i < 28; i++) {
                for (var j = 0; j < 28; j++) {
                    var n = 4 * (i * 28 + j);
                    inputs[i * 28 + j] = (data[n + 0] + data[n + 1] + data[n + 2]) / 3;
                    ctx.fillStyle = 'rgb(' + [data[n + 0], data[n + 1], data[n + 2]].join(',') + ')';
                    ctx.fillRect(j * 5, i * 5, 5, 5);
                }
            }
            if (Math.min(...inputs) === 255) {
                return;
            }
            $.ajax({
                url: '/api/mnist',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(inputs),
                success: (data) => {
                    for (let i = 0; i < 2; i++) {
                        var max = 0;
                        var max_index = 0;
                        for (let j = 0; j < 10; j++) {
                            var value = Math.round(data.results[i][j] * 1000);
                            if (value > max) {
                                max = value;
                                max_index = j;
                            }
                            var digits = String(value).length;
                            for (var k = 0; k < 3 - digits; k++) {
                                value = '0' + value;
                            }
                            var text = '0.' + value;
                            if (value > 999) {
                                text = '1.000';
                            }
                            $('#output tr').eq(j + 1).find('td').eq(i).text(text);
                        }
                        for (let j = 0; j < 10; j++) {
                            if (j === max_index) {
                                $('#output tr').eq(j + 1).find('td').eq(i).addClass('success');
                            } else {
                                $('#output tr').eq(j + 1).find('td').eq(i).removeClass('success');
                            }
                        }
                    }
                }
            });
        };
        img.src = this.canvas.toDataURL();
    }
}

$(() => {
    var main = new Main();
    $('#clear').click(() => {
        main.initialize();
    });
});
>>>>>>> 35bf121b7e6994c2ce5310258bc7b6560220a199
