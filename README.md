## Introduction

I hear you want to learn mockist/interaction/London style test driven development? **I do! I do!**

What app do you want to build? **A greeting bot. Something that flashes weird greetings every so often.**

How are you going end to end test it? **I think manually testing it will be sufficient.**

Why not automated an end to end test? **When manually running all my end to end tests becomes tedious, I will automate them.**

Where are the unit tests and code on the file system? **The code is structured as a standard node.js application:**
* **Tests are in test/greeter-test.js**
* **Application code is in lib/greeter.js**

What is buster? **buster.js is the javascript testing framework I am using for this kata.**

How do you run the tests? **Open greeter-test.html in Chrome or Firefox (not IE).**

## Starting

How would you write hello world in javascript?
```js
console.log("Hello World!");
```
## Test 1

Shouldn't you have written a test first? **Oops, I forgot this was a TDD kata.**
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
What can you do to make it fail?
```js
var greeter = {
    greet: function () {
    }
}
```
Good, is the message clear? **Yes**

## Test 1 - passing
Ok, how do you make it pass?
```js
    greet: function () {
        console.log("Hello, world!");
    }
```
Is your test passing? **Yes**

Do you like this implementation? **No**

Why not? **I am logging to the console. Nobody logs to the console.**

Where should your output be going? **I don't know. HTML, stderr, stdout, audio?**

## Test 1 - Refactored
Can you write your code without specifying where the output will go? **Sure**

Ok, rewrite the first test.
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

How do you get to an failure? **Implement CreateGreeter(voice)**

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

How do you know it doesn't do anything? **If I run it, it does nothing.**

For simple things, is manually running an end to end test sufficient? **Yes**

Ok, run it! **Like I said, it didn't do anything!**

How do you make it do something? **Implement voice**

How do you implement voice? **I don't know. Where should I send the output?**

If I pick console.log, can you implement it? **Of course.**

## Test 2 (new test case)
Should you write a test first? **Yes, this is a TDD Kata after all.**
```js
buster.testCase("Voice", {

    "speaks via console.log": function() {
        this.stub(console, "log");
        voice('sup');
        assert.calledWith(console.log, 'sup');
    }
});
```
Does it pass? **No, it outputs an error.**

## Test 2 - failing
Can you make it fail? **Sure**
```js
var voice = function () {
};
```
Is the message clear? **Yes**

## Test 2 - passing
Can you make it pass? **No problem**
```js
var voice = function (speech) {
    console.log(speech);
};
```
It everything working now? **Yes**

How do you know it works? **I run all my tests including a manual end to end test.**

Can you show me the entire implementation? **Sure**
```js
// test/greeter-test.js
"use strict";

buster.testCase("Greeter", {

    "uses voice to greet": function() {
        var voice = this.stub();
        var greeter = CreateGreeter(voice);
        greeter.greet();
        assert.called(voice);
        assert.match(voice.firstCall.args[0], /Hello/);
    }
});

buster.testCase("Voice", {

    "speaks via console.log": function() {
        this.stub(console, "log");
        voice('sup');
        assert.calledWith(console.log, 'sup');
    }
});
```
```js
// lib/greeter.js
"use strict";

var CreateGreeter = function (voice) {
    return {
        greet: function () {
            voice("Hello, world!");
        }
    };
};

var voice = function (speech) {
    console.log(speech);
};
```
Are you happy with this implementation? **Not quite. Console.log is not viable javascript output.**

Where do you want the output to go? **A web page.**

Do you want to manipulate the DOM directly? **Sure, why not?**

Did you forget about IE6 and IE7? ***{shudder}* I better use jQuery instead.**

What are you doing now? **I am updating the html with**
* **some simple styling**
* **a place to hold the greeting**
* **jQuery**

```html
<!DOCTYPE html>
<html>
    <head>
        ...
        <style type="text/css">
            .voice { background-color: yellow; padding: 5px; display: none; margin: 10px 0px 10px 0px; }
        </style>
    </head>
    <body>
        <div id="voiceBox" class="voice"></div>
        <script type="text/javascript" src="vendor/jquery-1.7.2.min.js"></script>
        ...
    </body>
</html>
```
## Test 3
Now that you have a DOM element to stick the output into, will you change the test? **Obviously**
```js
buster.testCase("Voice", {

    ...
    ,

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    }
});
```
Does it pass? **No, it failing. Notice I didn't forget my comma :)**

Is the message clear? **Yes.**
## Test 3 - passing
Can you make it pass? **Easily.**
```js
var voice = function (speech) {
    console.log(speech);
    $("#voiceBox").html(speech);
};
```
Hey! you're still logging to the console! **I am removing the test and the code for console logging now.**
## Test 3 - clean up
```js
buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    }
});
```
```js
var voice = function (speech) {
    $("#voiceBox").html(speech);
};
```
## Test 4 (new test case)
I just ran an end to end test and I don't see any output. What gives? **The voiceBox div is hidden. Let's show it now.**
```js
buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    },
    
    "shows the voicebox": function() {
        this.stub(jQuery.prototype, "show");
        voice("howdy, y'all");
        assert.called(jQuery.prototype.show);
    }
});
```
## Test 4 - failing
Can you make this one pass? **I just need to call show.**
```js
var voice = function (speech) {
    $("#voiceBox").html(speech);
    $("#voiceBox").show();
};
```
## Test 4 - passing
I see some duplication. **I am cleaning that up right now.**
```js
var voice = function (speech) {
    var voiceBox = $("#voiceBox")
    voiceBox.html(speech);
    voiceBox.show();
};
```
I still don't see any output. **I need to call the function on page load.**
```js
$(function() {
    CreateGreeter(voice).greet()
});
```
I see it now, but it says the wrong message! **I didn't stub html() in the second test, so it called the real implementation.**
```js
buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    },

    "shows the voicebox": function() {
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        voice("howdy, y'all");
        assert.called(jQuery.prototype.show);
    }
});
```
## Test 5 (new test case)
That's better, but the message just kinda hangs out there forever. Can you make it go away after a while? **Yes, I am adding a test for that.**
```js
buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    },

    "shows the voicebox": function() {
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        voice("howdy, y'all");
        assert.called(jQuery.prototype.show);
    },

    "hides the voicebox after a few seconds": function() {
        var clock = this.useFakeTimers();
        this.stub(jQuery.prototype, "html");
        this.stub(jQuery.prototype, "show");
        this.stub(jQuery.prototype, "slideUp");

        voice("welcome!");
        refute.called(jQuery.prototype.slideUp);
        clock.tick(5000)

        assert.called(jQuery.prototype.slideUp);
   }
});
```
## Test 5 - failing
So this one fails the right away with a clear message, right? **Yep.**
## Test 5 - passing
I noticed that you used "refute.called" **Yes, that ensures that I don't just call slideUp immediately.**

Oh, so you will be calling setTimeout? **That is the general idea.**
```js
var voice = function (speech) {
    var voiceBox = $("#voiceBox")
    voiceBox.html(speech);
    voiceBox.show();
    setTimeout(function(){ voiceBox.slideUp() }, 5000);
};
```
