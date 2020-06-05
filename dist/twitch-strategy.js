"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const OAuth2Strategy = __importStar(require("passport-oauth2"));
const passport_oauth2_1 = require("passport-oauth2");
const node_fetch_1 = __importDefault(require("node-fetch"));
class Options {
}
class Strategy {
    constructor(options, verify) {
        this.name = 'twitch';
        this.authorizationURL = 'https://id.twitch.tv/oauth2/authorize';
        this.tokenURL = 'https://id.twitch.tv/oauth2/token';
        const params = Object.assign(Object.assign({}, options), { name: this.name, authorizationURL: this.authorizationURL, tokenURL: this.tokenURL });
        this.clientID = options.clientID;
        const oAuth2Strategy = new OAuth2Strategy(params, verify);
        oAuth2Strategy.userProfile = this.userProfile;
    }
    userProfile(accessToken, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield node_fetch_1.default('https://api.twitch.tv/helix/users', {
                    method: 'GET',
                    headers: {
                        'Client-ID': this.clientID,
                        'Accept': 'application/vnd.twitchtv.v5+json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                if (!response.ok)
                    return done(new passport_oauth2_1.InternalOAuthError("failed to fetch user profile", response.json()));
                const body = (yield response.json()).data[0];
                return done(null, body);
            }
            catch (error) {
                return done(error, null);
            }
        });
    }
}
exports.Strategy = Strategy;
//# sourceMappingURL=twitch-strategy.js.map