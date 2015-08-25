var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.config.includeStack = true;
module.exports = chai;
