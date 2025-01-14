"use strict";
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
const interestService_1 = __importDefault(require("../services/interestService"));
class InterestController {
    static createInterest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, userId } = req.body;
            try {
                const interest = yield interestService_1.default.createInterest(name, userId);
                res.status(201).json(interest);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    static getInterestsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const interests = yield interestService_1.default.getInterestsByUserId(Number(userId));
                res.status(200).json(interests);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = InterestController;
