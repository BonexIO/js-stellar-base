"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAccount = undefined;

var _stellarXdr_generated = require("../generated/stellar-xdr_generated");

var _stellarXdr_generated2 = _interopRequireDefault(_stellarXdr_generated);

var _keypair = require("../keypair");

var _strkey = require("../strkey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create and fund a non existent account.
 * @function
 * @alias Operation.createAccount
 * @param {object} opts
 * @param {string} opts.destination - Destination account ID to create an account for.
 * @param {string} opts.startingBalance - Amount in XLM the account should be funded for. Must be greater
 *                                   than the [reserve balance amount](https://www.stellar.org/developers/learn/concepts/fees.html).
 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
 * @returns {xdr.CreateAccountOp}
 */
var createAccount = exports.createAccount = function createAccount(opts) {
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.destination)) {
    throw new Error("destination is invalid");
  }

  if (!this.isValidAmount(opts.startingBalance)) {
    throw new TypeError(this.constructAmountRequirementsError('startingBalance'));
  }

  opts.accountType = opts.accountType || null;
  if (opts.accountType == null) {
    throw new Error("accountType is invalid");
  }

  var type = _stellarXdr_generated2.default.AccountType.fromValue(opts.accountType);

  var attributes = {};
  attributes.destination = _keypair.Keypair.fromPublicKey(opts.destination).xdrAccountId();
  attributes.startingBalance = this._toXDRAmount(opts.startingBalance);
  attributes.accountType = type.value;

  var createAccount = new _stellarXdr_generated2.default.CreateAccountOp(attributes);

  var opAttributes = {};
  opAttributes.body = _stellarXdr_generated2.default.OperationBody.createAccount(createAccount);
  this.setSourceAccount(opAttributes, opts);

  return new _stellarXdr_generated2.default.Operation(opAttributes);
};