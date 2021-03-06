'use strict';
var Promise = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var expect = chai.expect;
// Uncomment chai.use(chaiAsPromised) to see that tests which shall fail finally start failing !
// With chaiAsPromised NOT enabled,  we see that all tests pass (which is wrong)
// and we also got some nasty `Unhandled rejection Error: Bogdan` on console
// Why is all that? The answer seems to be pretty simple:
// if chaiAsPromised is NOT enable than to.be.fulfilled / to.be.rejected simply returns 'undefined' instead of promise.
// Undefined is a 'correct' value for Mocha so it does not mark the test as failed
// (so all tests are green albeit "shall fail" tests shall be red).
// Fortunately bluebird (probably within application shutdown hook) will simply print out a single nasty Unhandled rejection Error
// when for every REJECTED promise (in our case 6 times (3 X rejected Bogdan and 3 times rejected Kuba ))
// To experience that simply run ONLY "resolved promise" context
// (with chai.use(chaiAsPromised) commented out) and you shall see that all test pass (which is wrong) without any
// Unhandled rejection Error on console. 'Unhandled rejection Error' is simply a warning from bluebird that your application
// is about to shutdown but you still have "rejected promises" which are not handled.
// according to comment of petkaantonov on https://github.com/petkaantonov/bluebird/issues/493 this is an intended behaviour.

// As soon as you have chaiAsPromised enabled than:
// all "shall fail" tests  are finally red,
// no Unhandled rejection Error: Bogdan on console
// still Unhandled rejection Error: Kuba on console so simply remove `rejectedAsWell` completely
//  chai.use(chaiAsPromised);


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
        var rejectedAsWell;

        beforeEach(function () {
            sut = Promise.reject(new Error("Bogdan"));
            rejectedAsWell = Promise.reject(new Error("Kuba"));
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