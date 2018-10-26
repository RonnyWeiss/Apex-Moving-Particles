var apexMovingCanvas = (function () {
    "use strict";
    var scriptVersion = "1.0";
    return {
        particles: function (udConfigJSON, elementID, identifier) {
            var stdConfigJSON = {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#c0000f"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#c0000f"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 4,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#c0000f",
                        "opacity": 0.4,
                        "width": 2
                    },
                    "move": {
                        "enable": true,
                        "speed": 4,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            };
            var configJSON = {};

            /* try to parse config json when string or just set */
            if (typeof udConfigJSON == 'string') {
                try {
                    configJSON = JSON.parse(udConfigJSON);
                } catch (e) {
                    console.log("Error while try to parse udConfigJSON. Please check your Config JSON. Standard Config will be used.");
                    console.log(e);
                    console.log(udConfigJSON);
                    configJSON = {};
                }
            } else {
                configJSON = udConfigJSON;
            }
            /* try to merge with standard if any attribute is missing */
            try {
                configJSON = $.extend(true, stdConfigJSON, configJSON);
            } catch (e) {
                console.log('Error while try to merge udConfigJSON into Standard JSON if any attribute is missing. Please check your Config JSON. Standard Config will be used.');
                console.log(e);
                configJSON = stdConfigJSON;
                console.log(configJSON);
            }

            $(elementID).prepend('<div class="particles-js-style" id="' + identifier + '"></div>');

            particlesJS(identifier, configJSON);
        },
        circles: function (udConfigJSON, elementID, identifier) {
            var stdConfigJSON = {
                "speed": 10,
                "size": 40,
                "count": 100,
                "color": "rgba(192,0,15,0.6)",
                "circles": true,
                "strokes": true,
                "frameRate": 20
            };
            var configJSON = {};

            /* try to parse config json when string or just set */
            if (typeof udConfigJSON == 'string') {
                try {
                    configJSON = JSON.parse(udConfigJSON);
                } catch (e) {
                    console.log("Error while try to parse udConfigJSON. Please check your Config JSON. Standard Config will be used.");
                    console.log(e);
                    console.log(udConfigJSON);
                    configJSON = {};
                }
            } else {
                configJSON = udConfigJSON;
            }
            /* try to merge with standard if any attribute is missing */
            try {
                configJSON = $.extend(true, stdConfigJSON, configJSON);
            } catch (e) {
                console.log('Error while try to merge udConfigJSON into Standard JSON if any attribute is missing. Please check your Config JSON. Standard Config will be used.');
                console.log(e);
                configJSON = stdConfigJSON;
                console.log(configJSON);
            }

            $(elementID).prepend('<canvas class="particles-js-style" id="' + identifier + '"></canvas>');

            var Canvas = document.getElementById(identifier);
            var ctx = Canvas.getContext('2d');

            var resize = function () {
                Canvas.width = Canvas.clientWidth;
                Canvas.height = Canvas.clientHeight;
            };
            window.addEventListener('resize', resize);
            resize();

            var elements = [];
            var presets = {};

            presets.o = function (x, y, s, dx, dy) {
                return {
                    x: x,
                    y: y,
                    r: configJSON.size * s,
                    w: 5 * s,
                    dx: dx,
                    dy: dy,
                    draw: function (ctx, t) {
                        this.x += this.dx;
                        this.y += this.dy;

                        ctx.beginPath();
                        ctx.arc(this.x + +Math.sin((50 + x + (t / 10)) / 100) * configJSON.speed, this.y + +Math.sin((45 + x + (t / 10)) / 100) * (configJSON.speed * 0.8), this.r, 0, 2 * Math.PI, false);
                        ctx.lineWidth = this.w;
                        ctx.strokeStyle = configJSON.color;
                        ctx.stroke();
                    }
                }
            };

            presets.x = function (x, y, s, dx, dy, dr, r) {
                r = r || 0;
                return {
                    x: x,
                    y: y,
                    s: configJSON.size * s,
                    w: 5 * s,
                    r: r,
                    dx: dx,
                    dy: dy,
                    dr: dr,
                    draw: function (ctx, t) {
                        this.x += this.dx;
                        this.y += this.dy;
                        this.r += this.dr;

                        var _this = this;
                        var line = function (x, y, tx, ty, c, o) {
                            o = o || 0;
                            ctx.beginPath();
                            ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                            ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                            ctx.lineWidth = _this.w;
                            ctx.strokeStyle = c;
                            ctx.stroke();
                        };

                        ctx.save();

                        ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * configJSON.speed, this.y + Math.sin((10 + x + (t / 10)) / 100) * (configJSON.speed / 2));
                        ctx.rotate(this.r * Math.PI / 180);

                        line(-1, -1, 1, 1, configJSON.color);
                        line(1, -1, -1, 1, configJSON.color);

                        ctx.restore();
                    }
                }
            };

            for (var x = 0; x < Canvas.width; x++) {
                for (var y = 0; y < Canvas.height; y++) {
                    if (Math.round(Math.random() * (8000 - configJSON.count)) == 1) {
                        var s = ((Math.random() * 5) + 1) / 10;
                        if (Math.round(Math.random()) == 1 && configJSON.circles)
                            elements.push(presets.o(x, y, s, 0, 0));
                        else if (configJSON.strokes) {
                            elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
                        }
                    }
                }
            }

            setInterval(function () {
                ctx.clearRect(0, 0, Canvas.width, Canvas.height);

                var time = new Date().getTime();
                for (var e in elements)
                    elements[e].draw(ctx, time);
            }, configJSON.frameRate);
        },
        bubbles: function (udConfigJSON, elementID, identifier) {
            var stdConfigJSON = {
                "speed": 0.2,
                "size": 100,
                "opacity": 0.5,
                "count": 50,
                "strengthRed": 192,
                "strengthGreen": 0,
                "strengthBlue": 15
            };
            var configJSON = {};

            /* try to parse config json when string or just set */
            if (typeof udConfigJSON == 'string') {
                try {
                    configJSON = JSON.parse(udConfigJSON);
                } catch (e) {
                    console.log("Error while try to parse udConfigJSON. Please check your Config JSON. Standard Config will be used.");
                    console.log(e);
                    console.log(udConfigJSON);
                    configJSON = {};
                }
            } else {
                configJSON = udConfigJSON;
            }
            /* try to merge with standard if any attribute is missing */
            try {
                configJSON = $.extend(true, stdConfigJSON, configJSON);
            } catch (e) {
                console.log('Error while try to merge udConfigJSON into Standard JSON if any attribute is missing. Please check your Config JSON. Standard Config will be used.');
                console.log(e);
                configJSON = stdConfigJSON;
                console.log(configJSON);
            }
            if ($("#" + identifier).length == 0) {
                $(elementID).prepend('<canvas class="particles-js-style" id="' + identifier + '"></canvas>');
            } else {
                $("#" + identifier).remove();
                $(elementID).prepend('<canvas class="particles-js-style" id="' + identifier + '"></canvas>');
            }

            var canvas = document.getElementById(identifier);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var ctx = canvas.getContext('2d');

            var circles = [];

            function Circle(radius, speed, width, xPos, yPos) {
                this.radius = radius;
                this.speed = speed;
                this.width = width;
                this.xPos = xPos;
                this.yPos = yPos;
                this.opacity = 0.05 + Math.random() * configJSON.opacity;

                this.counter = 0;

                var signHelper = Math.floor(Math.random() * 2);

                if (signHelper == 1) {
                    this.sign = -1;
                } else {
                    this.sign = 1;
                }
            };

            Circle.prototype.update = function () {
                this.counter += this.sign * this.speed;

                ctx.beginPath();

                var x = this.xPos + Math.cos(this.counter / 100) * this.radius,
                    y = this.yPos + Math.sin(this.counter / 100) * this.radius,
                    r = this.width,
                    startAngle = 0,
                    endAngle = 2 * Math.PI;

                ctx.arc(x, y, r, startAngle, endAngle, false);

                ctx.closePath();

                ctx.fillStyle = 'rgba(' + configJSON.strengthRed + ', ' + configJSON.strengthGreen + ', ' + configJSON.strengthBlue + ',' + this.opacity + ')';
                ctx.fill();
            };

            function drawCircles() {
                for (var i = 0; i < configJSON.count; i++) {
                    var randomX = Math.round(-200 + Math.random() * (canvas.width + 200));
                    var randomY = Math.round(-200 + Math.random() * (canvas.height + 200));
                    var speed = 0.2 + Math.random() * configJSON.speed;
                    var size = 5 + Math.random() * configJSON.size;

                    var circle = new Circle(100, speed, size, randomX, randomY);
                    circles.push(circle);
                };
                draw();
            };

            drawCircles();

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = 0; i < circles.length; i++) {
                    var myCircle = circles[i];
                    myCircle.update();
                };

                requestAnimationFrame(draw);
            };

            $(window).resize(function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
    }
})();
