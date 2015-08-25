'use strict';
var chai = require('../chaiConfigured');
var expect = chai.expect;
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(chaiAsPromised);
chai.use(sinonChai);

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