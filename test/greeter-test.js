"use strict";

buster.testCase("Greeter", {

    "uses voice to greet": function() {
        var voice = this.stub();
        var ear = this.stub();
        var clock = this.useFakeTimers();

        var greeter = CreateGreeter(voice, ear);
        greeter.greet();
        assert.called(voice);
        assert.match(voice.firstCall.args[0], /Hello/);
    }
    ,
    "listens with an ear": function () {
        var ear = this.stub();
        var clock = this.useFakeTimers();

        var greeter = CreateGreeter(null, ear);
        greeter.listen();
        assert.called(ear);
    }
    ,
    "sends a pearl of wisdom": function () {
        var voice = this.stub();
        var ear = this.stub();
        var guru = function (callback) { callback('a nugget of wisdom'); }
        var clock = this.useFakeTimers();

        var greeter = CreateGreeter(voice, ear, guru);
        greeter.greet("Kent");
        greeter.pontificate();
        assert.calledTwice(voice);
        assert.match(voice.secondCall.args[0], /Kent.*wisdom/);
    }
    ,
    "pontificates guru wisdom": function() {
        var voice = this.stub();
        var ear = this.stub();
        var guru = this.stub();
//        var clock = this.useFakeTimers();

        var greeter = CreateGreeter(voice, ear, guru);
        greeter.pontificate();
        assert.called(guru);
    }
    ,
    "starts the guru speaking every few seconds": function() {
        var voice = this.stub();
        var ear = this.stub();
        var guru = this.stub();
        var clock = this.useFakeTimers();

        var greeter = CreateGreeter(voice, ear, guru);
        var pontificator = this.stub(greeter, "pontificate");
        greeter.greet("mike");
        refute.called(pontificator);
        clock.tick(7000);
        assert.called(pontificator);
        clock.tick(7000);
        assert.calledTwice(pontificator);
    }

});

buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    }
    ,
    "shows the voicebox": function() {
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        voice("howdy, y'all");
        assert.called(jQuery.prototype.show);
    }
    ,
    "hides the voicebox after a few seconds": function() {
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        this.stub(jQuery.prototype, "slideUp");
        var clock = this.useFakeTimers();

        voice("goodbye");
        refute.called(jQuery.prototype.slideUp);
        clock.tick(5000)

        assert.called(jQuery.prototype.slideUp);
    }
    ,
    "greets a person": function() {
        var voice = this.stub();
        var greeter = CreateGreeter(voice);
        greeter.greet("Bob");
        assert.called(voice);
        assert.match(voice.firstCall.args[0], /Bob/);
    }

});


buster.testCase("Ear", {

    "//notifies after hearing something": function(done) {
        this.stub(jQuery.prototype, "show");
        var callback = this.spy(function(sound) {
            assert.equals(typeof sound, "string");
            done();
        });
        ear(callback);
        assert.called(callback);
    }
    ,
    "shows the earBox": function() {
        this.stub(jQuery.prototype, "show");
        ear(this.stub());
        assert.called(jQuery.prototype.show);
    }
    ,
    "watches for a submit event": function () {
        this.stub(jQuery.prototype, "show");
        this.stub(jQuery.prototype, "submit");
        ear(this.stub());
        assert.called(jQuery.prototype.submit);
    }

});

buster.testCase("Guru", {

    "shares wisdom in a callback": function(done) {
        guru(function(wisdom) {
            assert.equals(typeof wisdom, 'string');
            done();
        });
    }

});
