## Introduction

I hear you want to learn mockist/interaction/London style test driven development? **I do! I do!**

What app do you want to build? **A wisdom sharing greeting bot.**

How are you going to end to end test it? **I think manually testing it will be sufficient.**

Why not automated your end to end test? **Oh, I will just not in this kata.**

Where are the unit tests and code on the file system? **The code is structured as a standard node.js application:**
* **Tests are in test/greeter-test.js**
* **Application code is in lib/greeter.js**

What is buster? **buster.js is the javascript testing framework I am using for this kata.**

What is wisdom.js? **That is the man behind the curtain.**

How do you run the tests? **Open greeter-test.html in a modern browser.**

How do you run the application? **Open greeter-test.html. A build script strips out all the testing for production. I won't show you that in this kata.**

## Starting

How would you write hello world in javascript? **I might write ``console.log("Hello World!");``**


## Test 1

Can you write a test that helps you implement it. **Sure. I will put it in ``test/greeter-test.js``**

```js

buster.testCase("Greeter", {

    "calls console log with hello": function () {
        this.stub(console, "log");
        greeter.greet();
        assert.called(console.log);
        assert.match(console.log.firstCall.args[0], /Hello/);
    }

});
```
Is this test failing with an _Error_ or a _Failure_?  **Error! I get ReferenceError: greeter is not defined**

## Test 1 - failing
Can you make it fail?

```js

var greeter = {
    greet: function () {
    }
};
```
Is the message clear? **Yes**

## Test 1 - passing
How do you make it pass?

```js

    greet: function () {
        console.log("Hello, world!");
    }
```
Is your test passing? **Yes**

Do you like this implementation? **No**

Why not? **I am logging to the console. Nobody logs to the console.**

Where should your output be going? **I don't know. HTML, stderr, stdout, audio?**

## Test 1 - refactor
How does writing to ``console.log`` feel? **Ugly! I am going to rewrite it so I don't have to care. Notice I create a constructor for ``greeter`` that takes a ``voice``.**

```js

buster.testCase("Greeter", {

    "uses voice to greet": function() {
        var voice = this.stub();
        var greeter = CreateGreeter(voice);
        greeter.greet();
        assert.called(voice);
        assert.match(voice.firstCall.args[0], /Hello/);
    }

});
```
Is this test _erroring_ or _failing_? **Erroring**

Is 'erroring' a word? **I don't know, but _erring_ is a word.**

How do you get a failure? **Implement CreateGreeter(voice)**

## Test 1 - failing (again)

```js

var CreateGreeter = function (voice) {
    return {
        greet: function () {
        }
    };
};
```
Why didn't you finish the implementation? **I wanted to see the test fail and check it's failure message.**

## Test 1 - passing(again)
Is it difficult to make it pass now? **No**

```js

        greet: function () {
            voice("Hello, world!");
        }
```
Are you done? **No**

Why not? **It doesn't do anything!**

How do you know it doesn't do anything? **If I run it, it shows nothing.**
## End to End Test
How do you run it? **I add the following inside a document ready block inside of ``greeter.js`` and check the browser and browser console (F12).**

```js

$( document ).ready( function() { 
    CreateGreeter(voice).greet();
});
```

You are using the test HTML as your final HTML? **Yes, I will run it through a build system which will strip out the testing.**

For simple things, is manually running an end to end test sufficient? **Yes**

Ok, run it! **Like I said, it didn't show anything (it throws a ReferenceError).**

How do you make it do something? **Implement voice.**

How do you implement voice? **I don't know. Where should I send the output?**

If I pick console.log, can you implement it? **Of course.**

## Test 2 (new test case: Voice)
Should you write a test first? **Yes, this is a TDD Kata after all.**

```js

buster.testCase("Voice", {

    "speaks via console.log": function () {
        this.stub(console, "log");
        voice("wazzaap");
        assert.calledWith(console.log, "wazzaap");
    }

});
```
Does it pass? **No, it outputs an error.**

## Test 2 - failing
Can you make it fail? **Sure**

```js

var voice = function (speech) {
};
```
Is the message clear? **Yes**

## Test 2 - passing
Can you make it pass? **No problem.**

```js

var voice = function (speech) {
    console.log(speech);
};
```
It everything working? **Yes**

How do you know it works? **I run all my tests including a manual end to end test. The console shows 'Hello, world!'.**

Are you happy with this implementation? **Not quite. Console.log is not viable javascript output.**

Where do you want the output to go? **A web page.**

Do you want to manipulate the DOM directly? **Sure, why not?**

Did you forget about IE6 and IE7? ***{shudder}* I better use jQuery instead.**

## Test 3
Now that you have a DOM element for your output, will you change the test? **Obviously**

```js

buster.testCase("Voice", {
    ...

    ,
    "speaks to the DOM": function () {
        this.stub(jQuery.prototype, "html");
        voice("wazzaap");
        assert.calledWith(jQuery.prototype.html, "wazzaap");
    }

});
```
Does it pass? **No, it is failing. Notice I didn't forget my comma :)**

Is the message clear? **Yes.**
## Test 3 - passing
Can you make it pass? **Easily.**

```js

var voice = function (speech) {
    console.log(speech);
    $("#voiceBox").html(speech);
};
```
## Test 3 - Cleaning up: Removing old code and unused tests
Hey! you're still logging to the console! **I am removing the test and the code for console logging now.**

```js

buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('wazzaap');
        assert.calledWith(jQuery.prototype.html, 'wazzaap');
    }

});
```

```js

var voice = function (speech) {
    $("#voiceBox").html(speech);
};

```
## Test 4
I just ran an end to end test and I don't see any output. What gives? **The voiceBox div is hidden. I will show it now.**

```js

buster.testCase("Voice", {
    ...

    ,
    "shows the voice box": function () {
        this.stub(jQuery.prototype, "show");
        voice("howdy, y'all");
        assert.called(jQuery.prototype.show);
    }

});
```
## Test 4 - passing
Can you make this one pass? **I just need to call show.**

```js

var voice = function (speech) {
    $("#voiceBox").html(speech);
    $("#voiceBox").show();
};
```
## Test 4 - refactor
I see some duplication. **I am cleaning that up right now.**

```js

var voice = function (speech) {
    var voiceBox = $("#voiceBox")
    voiceBox.html(speech);
    voiceBox.show();
};
```
## End to End Test
Why am I seeing the wrong message? **If I remove the testing lines from the html file, you will see the correct message (Hello World). That reminds me, I need to stub html() and show() in all Voice tests.**

```js

buster.testCase("Voice", {
    "speaks to the DOM": function() {
        ...
        this.stub(jQuery.prototype, "show");

    ...

    ,
    "shows the voice box": function() {
        this.stub(jQuery.prototype, "html");
        ...
    }

});
```
## Test 5
That's better, but the message hangs around forever. Can you make it go away? **Yes, I am adding a test for that. Notice how I use a Fake timer to avoid slow tests.**

```js

buster.testCase("Voice", {
    ...

    ,
    "hides the voice box after a few seconds": function () {
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        this.stub(jQuery.prototype, "slideUp");
        var clock = this.useFakeTimers();

        voice("goodbye");
        refute.called(jQuery.prototype.slideUp);
        clock.tick(5000)

        assert.called(jQuery.prototype.slideUp);
    }

});
```
## Test 5 - passing
I noticed that you used "refute.called" **Yes, that ensures that I don't just call slideUp immediately.**

Oh, you will be calling setTimeout? **Yes**

```js

var voice = function (speech) {
    ...
    setTimeout(function () { voiceBox.slideUp() }, 5000);
};
```
## Test 6 - (back to Greeter)
The greeting feels a little impersonal. **I am adding the greetee's name.**

```js

buster.testCase("Greeter", {
    ...

    ,
    "greets a person": function () {
        var voice = this.stub();
        var greeter = CreateGreeter(voice);
        greeter.greet("Ward");
        assert.called(voice);
        assert.match(voice.firstCall.args[0], /Ward/);
    }

});
```
## Test 6 - passing

```js

var CreateGreeter = function (voice) {
    ...
        greet: function (name) {
            voice("Hello, " + name + "!");
        }
    ...
};
```
## Test 6 - refactor
The tests have duplicate setup. **I am extracting it into a setUp.**

```js

buster.testCase("Greeter", {

    setUp: function() {
        this.voice = this.stub();
        this.greeter = CreateGreeter(this.voice);
    },
    "uses voice to greet": function() {
        this.greeter.greet();
        assert.called(this.voice);
        assert.match(this.voice.firstCall.args[0], /Hello/);
    },
    "greets a person": function() {
        this.greeter.greet("Bob");
        assert.called(this.voice);
        assert.match(this.voice.firstCall.args[0], /Bob/);
    }

});
```
I notice the End to End test shows 'Hello, undefined!'. **Yes, I am fixing it by listening for a name.**

## Test 7

```js

buster.testCase("Greeter", {
    setUp: function() {
        ...
        this.ear = this.stub();
        this.greeter = CreateGreeter(this.voice, this.ear);
    },
    ...

    ,
    "listens with an ear": function () {
        this.greeter.listen();
        assert.called(this.ear);
   }

});
```
I like how you used setUp. **Yeah. I am glad we removed that duplication so that we can update all the tests at once. Also notice, I added the ``ear`` argument.**
## Test 7 - passing

```js

var CreateGreeter = function (voice, ear) {
    return {
        ...

        ,
        listen: function () {
            var self = this;
            ear(function (name) {
                self.greet(name);
            });
        }
    };
});
```
You seem to be missing an ear. **Uh, I can hear you! Yes, I am writing a test for that.**
## Test 8 (new test case: Ear)

```js

buster.testCase("Ear", {

    "notifies after hearing something": function (done) {
        var callback = this.spy(function (sound) {
            assert.equals(typeof sound, "string");
            done();
        });
        ear(callback);
        assert.called(callback);
    }

});
```
Why are you using a spy? **Spys allow asserts without changing the behavior of function it is spying on.**

## Test 8 - passing

```js

var ear = function (callback) {
    callback("Martin");
};
```

What is up with 'Martin'? **Just a place holder, it will be gone soon.**
## Test 9

```js

buster.testCase("Ear", {
    ...

    ,
    "shows the earBox": function () {
        this.stub(jQuery.prototype, "show");
        ear(this.stub());
        assert.called(jQuery.prototype.show);
    }

});
```
## Test 9 - passing

```js

var ear = function (callback) {
    var earBox = $("#earBox");
    earBox.show();
    ...
};
```
Why is the earBox showing up? **I am stubbing 'jQuery.show' in all the Ear tests to make it disappear.**

```js

buster.testCase("Ear", {

    "notifies after hearing something": function(done) {
        this.stub(jQuery.prototype, "show");

    ...

});
```
## Test 10

```js

buster.testCase("Ear", {
    ...

    ,
    "watches for a submit event": function () {
        this.stub(jQuery.prototype, "show");
        this.stub(jQuery.prototype, "submit");
        ear(this.stub());
        assert.called(jQuery.prototype.submit);
    }

});
```
## Test 10 - passing

```js

var ear = function (callback) {
    var earBox = $("#earBox")
    earBox.show();
    $("form").submit(function () {
        callback($("#input").val());
        earBox.hide();
        return false;
    });
};
```
Thanks for getting rid of 'Martin'; you noticed a different test suddenly failed? **Yes. To fix it, I need to fire a ``submit`` event and I don't know how to do that. I will let the acceptance tests cover it for now. In the mean time, I will skip this test.**

```js

buster.testCase("Ear", {

    "//notifies after hearing something": function(done) {
    ...
});
```
## End to End
Does the end to end test pass? **Not yet. I need to update the document.ready function.**

```js

$( document ).ready (function () {
    CreateGreeter(voice, ear).listen()
});

```
## Test 11 - (back to Greeter)
What now? **I seek wisdom.**

```js

buster.testCase("Greeter", {
    ...

    ,
    "sends a pearl of wisdom": function () {
        this.greeter.greet("Kent");
        this.greeter.pontificate();
        assert.calledTwice(this.voice);
        assert.match(this.voice.secondCall.args[0], /Kent/);
    }

});

```
You didn't check the wisdom? **I haven't been enlightened. I just want to pass tests.**

```js

var CreateGreeter = function (voice, ear) {
    return {
        greet: function (name) {
            ...
            this.name = name; Todo this should be in ear
        },
        ...
        ,
        pontificate: function () {
            voice(this.name);
        }
    };
};

```
## Test 12
Were do you find wisdom? **A guru?**

```js

buster.testCase("Greeter", {

    setUp: function() {
        ...
        this.guru = this.stub();
        this.greeter = CreateGreeter(this.voice, this.ear, this.guru);
    },
    ...

    ,
    "pontificates guru wisdom": function () {
        this.greeter.pontificate();
        assert.called(this.guru);
    }

});

```
How are you going to make this pass? **A guru with a callback. Notice I remembered to add ``guru`` the parameters.**

```js

var CreateGreeter = function (voice, ear, guru) {
    return {

        ...

        ,
        pontificate: function () {
            var self = this;
            guru(function (wisdom) {
                voice(self.name + ', ' + wisdom);
            });
        }
    };
};

```
Another one of your tests failed. **That is part of designing. I need to replace ``guru`` and the ``assert``**

```js

buster.testCase("Greeter", {

    setUp: function () {
        ...
        this.guru = this.spy(function (callback) { callback('nugget of wisdom'); });
        ...

    ...
    "sends a pearl of wisdom": function () {
        ...
        assert.match(this.voice.secondCall.args[0], /Kent.*wisdom/);
    },
    ...
});

```

## Test 13 (new test case: Guru)
You seem a little distracted? **Yes, I really need a guru.**


```js

buster.testCase("Guru", {

    "shares wisdom in a callback": function (done) {
        guru(function (wisdom) {
            assert.equals(typeof wisdom, "string");
            done();
        });
    }

});

```
## Test 13 - timing out
Is the test erroring or failing? **ReferenceError. I can fix this with a ``guru``**

```js

var guru = function (callback) {

};

```

Is the test erroring or failing? **Neither, it is timing out.**

How do you fix it? **guru calls the callback.**


```js

var guru = function (callback) {
    if (typeof wisdom.index === 'undefined' || wisdom.index === wisdom.length) {
        wisdom.index = 0;
    }

    callback(wisdom[wisdom.index++]);
};

```

What is wisdom.index? You didn't test it. **A magical way of getting wisdom. Normally I would test it, but this kata is long enough.**
## Test 14 - (back to Greeter)

How are we going to finish? **With pontificate repeating different sayings.**

```js

buster.testCase("Greeter", {
    setUp: function() {
        ...
        this.repeater = this.stub();
        this.greeter = CreateGreeter(this.voice, this.ear, this.guru, this.repeater);
    },

    ...

    ,
    "prompts guru to pontificates every few seconds": function () {
        var pontificator = this.stub(this.greeter, "pontificate");
        this.greeter.greet("Michael");
        assert.called(this.repeater);
    }
});

```

## Test 14 - passing

```js

var CreateGreeter = function (voice, ear, guru, repeater) {
    return {
        greet: function (name) {
            ...
            repeater(this.pontificate.bind(this), 7000);
    ...
});

```

## End to End Working

```js

var repeater = function (callback, timeout) {
    setInterval(callback, timeout);
};

...

$( document ).ready( function() { 
    CreateGreeter(voice, ear, guru, repeater).listen();
});

```

You made it, good work. You deserve a pat on the back, a snack and a a bit of wisdom. **Thank you!**

---

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">mockist-style-javascript-tdd-kata</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/zhon/mockist-style-javascript-tdd-kata" property="cc:attributionName" rel="cc:attributionURL">Zhon Johansen, David Adsit</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.
