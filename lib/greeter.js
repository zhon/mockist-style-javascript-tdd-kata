"use strict";

var CreateGreeter = function (voice, ear, guru) {
    return {
        guru: guru || function() {},
        greet: function (name) {
            voice("Hello, " + name + "!");
            this.name = name;
            setInterval(this.pontificate.bind(this), 7000);
        },
        listen: function () {
            var self = this;
            ear(function (name) {
              self.greet(name);
            });
        },
        pontificate: function () {
            var self = this;
            self.guru(function (wisdom) {
                voice(self.name + ', ' + wisdom);
            });
        }
    };
};

var voice = function (speech) {
    var voiceBox = $("#voiceBox")
    voiceBox.html(speech);
    voiceBox.show();
    setTimeout(function(){ voiceBox.slideUp() }, 5000);
};

var ear = function (callback) {
    var earBox = $("#earBox")
    earBox.show();
    $("form").submit(function () {
        callback($("#input").val());
        earBox.hide();
        return false;
    });
};

var guru = function (callback) {
    if (typeof(wisdom.index) == 'undefined' || wisdom.index == wisdom.length) {
        wisdom.index = 0;
    }

    callback(wisdom[wisdom.index++]);
}

$(function() {
    var greeter = CreateGreeter(voice, ear, guru);
    greeter.listen();
    $("#input").focus();
});
