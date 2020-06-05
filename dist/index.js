"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Strategy = exports.Strategy = void 0;
const twitch_strategy_1 = require("./twitch-strategy");
Object.defineProperty(exports, "Strategy", { enumerable: true, get: function () { return twitch_strategy_1.Strategy; } });
const pkginfo_1 = __importDefault(require("pkginfo"));
pkginfo_1.default(module, "version");
const OAuth2Strategy = twitch_strategy_1.Strategy;
exports.OAuth2Strategy = OAuth2Strategy;
//# sourceMappingURL=index.js.map