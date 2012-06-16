## Introduction

I hear you want to learn mockist/interaction/London style test driven development? **I do! I do!**

What app do you want to build? **A greeting bot. Something that flashes weird greetings every so often.**

How are you going end to end test it? **I think manually testing it will be sufficient.**

Why not automated an end to end test? **When manually running all my end to end tests becomes tedious, I will automate them.**

Where are the unit tests and code on the file system? **The code is structured as a standard node.js application:**
* **Tests are in test/greeter-test.js**
* **Application code is in lib/greeter.js**

What is buster? **buster.js is the javascript testing framework we are using for this kata.**

How do you run the tests? **Open greeter-test.html in Chrome or Firefox (not IE).**

## Starting

How would you write hello world in javascript?
```javascript
console.log("Hello World!");
```
## Test 1

Shouldn't you have written a test first? **Oops, I forgot this was a TDD kata.**
```javascript
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
What can we do to make it fail?
```javascript
var greeter = {
    greet: function () {
    }
}
```
Good, is the message clear? **Yes**

## Test 1 - passing
Ok, how do we make it pass?
```javascript
    greet: function () {
        console.log("Hello, world!");
    }
```
Is our test passing? **Yes**

Do you like this implementation? **No**

Why not? **We are logging to the console. Nobody logs to the console.**

Where should our output be going? **I don't know. HTML, stderr, stdout, audio?**

## Test 1 - Refactored
Can we write our code without specifying where the output will go? **Sure**

Ok, rewrite the first test.
```javascript
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

How do we get to an failure? **Implement CreateGreeter(voice)**

## Test 1 - failing (again)
```javascript
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
```javascript
        greet: function () {
            voice("Hello, world!");
        }
```
Are we done? **No**

Why not? **It doesn't do anything!**

How do we know it doesn't do anything? **If we run it, it does nothing.**

For simple things, is manually running an end to end test sufficient? **Yes**

Ok, run it! **Like I said, it didn't do anything!**

How do you make it do something? **Implement voice**

How do you implement voice? **I don't know. Where we are sending the output?**

If I pick console.log, can you implement it? **Of course.**

## Test 2 (new test case)
Should you write a test first? **Yes, this is a TDD Kata after all.**
```javascript
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
```javascript
var voice = function () {
};
```
Is the message clear? **Yes**

## Test 2 - passing
Can you make it pass? **No problem**
```javascript
var voice = function (speech) {
    console.log(speech);
};
```
It everything working now? **Yes**

How do you know it works? **I run all my tests including a manual end to end test.**

Can you show me the entire implementation? **Sure**
```javascript
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
```javascript
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

Do we want to manipulate the DOM directly? **Sure, why not?**

Did you forget about IE6 and IE7? ***{shudder}* Let's use jQuery instead.**

That sounds like a much better idea. Now, let's update the html to pull in jQuery, 
add a DOM element to put the greeting in, and add some simple styling to make it stand out:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>Welcome to Agile Roots</title>
    <style type="text/css">
      .voice { background-color: yellow; padding: 5px; display: none; margin: 10px 0px 10px 0px; }
    </style>
  </head>
  <body>
    <div id="voiceBox" class="voice"></div>
    <script type="text/javascript" src="jquery/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="buster/buster-test.js"></script>
    <script type="text/javascript" src="lib/welcome.js"></script>
    <script type="text/javascript" src="test/welcome-test.js"></script>
  </body>
</html>
```
## Test 3 (new test case)
Now that we have a DOM element to stick the output into, shall we change the test? **Yes**
```javascript
buster.testCase("Voice", {

    "speaks via console.log": function() {
        this.stub(console, "log");
        voice('sup');
        assert.calledWith(console.log, 'sup');
    },
    
    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    }
});
```
Does it pass? **No.**

Is the message clear? **Yes.**
## Test 3 - failing
Can you make it fail? **Easily.**
```javascript
var voice = function (speech) {
    console.log(speech);
    $("#voiceBox").html(speech);
};
```
Hey! We're still logging to the console! **We are. Let's remove the test and the code for console now.**
## Test 3 - clean up
```javascript
buster.testCase("Voice", {

    "speaks to the DOM": function() {
        this.stub(jQuery.prototype, "html");
        voice('sup');
        assert.calledWith(jQuery.prototype.html, 'sup');
    }
});
```
```javascript
var voice = function (speech) {
    $("#voiceBox").html(speech);
};
```
## Test 4 (new test case)
I just ran an end to end test and I don't see any output. What gives? **The voiceBox div is hidden. Let's show it now.**
```javascript
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
```javascript
var voice = function (speech) {
    $("#voiceBox").html(speech);
    $("#voiceBox").show();
};
```
## Test 4 - passing
I see some duplication. Will you clean that up before we move on? **Consider it done.**
```javascript
var voice = function (speech) {
    var voiceBox = $("#voiceBox")
    voiceBox.html(speech);
    voiceBox.show();
};
```
I still don't see any output. **We need to call the function on page load.**
```javascript
$(function() {
    CreateGreeter(voice).greet()
});
```
