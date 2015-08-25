'use strict';
var Promise = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var expect = chai.expect;
chai.use(chaiAsPromised);

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