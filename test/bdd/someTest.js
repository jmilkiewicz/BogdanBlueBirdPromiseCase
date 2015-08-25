'use strict';
var Promise = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var expect = chai.expect;
// Uncomment chai.use(chaiAsPromised) to start see that tests which shall fail finally starts failing !
// With chaiAsPromised is not enabled,  we see that all test pass  (which is wrong)
// and we also got some nasty `Unhandled rejection Error: Bogdan` on console
// Why is all that? The answer seems pretty simple:
// when chaiAsPromised is  NOT enable than to.be.fulfilled / to.be.rejected simply returns 'undefined' instead of promise.
// Undefined is a 'correct' value for Mocha so it does not mark the test as failed
// (so all tests are green but "shall fail" tests shall be red).
// Fortunately bluebird (probably within application shutdown hook) will simply print out nasty Unhandled rejection Error
// when there is no rejection callback registered for rejected promise. To check it simply run "resolved promise" context
// (still wil chai.use(chaiAsPromised) commented out) and you shall see that all test pass (which is wrong) but not
// Unhandled rejection Error on console. 'Unhandled rejection Error' is simply a warning from bluebird that your application
// is about to shutdown but you still have "rejected promises" which are not handled.

// As soon as you have chaiAsPromised enabled than:
// all "shall fail" tests  are finally red,
// no Unhandled rejection Error: Bogdan on console
//chai.use(chaiAsPromised);


describe('BlueBrid-Promise tests', function () {

    context("resolved promise", function () {
        var sut;

        beforeEach(function () {
            sut = Promise.resolve("Bogdan");
        });

        it("shall return resolved", function () {
            return sut;
        });

        it("shall be fulfilled", function () {
            return expect(sut).to.be.fulfilled;
        });

        it("shall fail as resolved promised can not be rejected", function () {
            return expect(sut).to.be.rejected;
        });

        it("shall be not rejected ", function () {
            return expect(sut).to.be.not.rejected;
        });

    });

    context("rejected promise", function () {
        var sut;

        beforeEach(function () {
            sut = Promise.reject(new Error("Bogdan"));
        });

        it("shall be not fulfilled", function () {
            return expect(sut).to.not.be.fulfilled;
        });

        it("shall fail as rejected promise is not fulfilled", function () {
            return expect(sut).to.be.fulfilled;
        });

        it("shall be  rejected ", function () {
            return expect(sut).to.be.rejected;
        });
    });
});