"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const util_1 = __importDefault(require("util"));
const passport_oauth2_1 = __importDefault(require("passport-oauth2"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function Strategy(options, verify) {
    const params = Object.assign(Object.assign({}, options), { name: 'twitch', authorizationURL: 'https://id.twitch.tv/oauth2/authorize', tokenURL: 'https://id.twitch.tv/oauth2/token' });
    this.clientID = options.clientID;
    passport_oauth2_1.default.call(this, params, verify);
    this._oauth2.setAuthMethod("Bearer");
    this._oauth2.useAuthorizationHeaderforGET(true);
}
exports.Strategy = Strategy;
util_1.default.inherits(Strategy, passport_oauth2_1.default);
Strategy.prototype.userProfile = function (accessToken, done) {
    return node_fetch_1.default('https://api.twitch.tv/helix/users', {
        method: 'GET',
        headers: {
            'Client-ID': this.clientID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(response => {
        if (!response.ok)
            return new passport_oauth2_1.default.InternalOAuthError("failed to fetch user profile");
        else
            return response.json();
    }).then(json => {
        const body = json.data[0];
        done(null, body);
    }).catch(error => {
        done(error, null);
    });
};
Strategy.prototype.authorizationParams = function (options) {
    var params = {
        force_verify: false
    };
    if (typeof options.forceVerify !== "undefined") {
        params.force_verify = !!options.forceVerify;
    }
    return params;
};
//# sourceMappingURL=twitch-strategy.js.map