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
const prismaCliente_1 = __importDefault(require("../database/prismaCliente"));
class InterestModel {
    static createInterest(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newInterest = yield prismaCliente_1.default.interest.create({
                    data: {
                        name,
                        userId,
                    },
                });
                return newInterest;
            }
            catch (error) {
                console.error('Erro ao criar interesse:', error);
                throw new Error('Erro ao criar interesse');
            }
        });
    }
    static getInterestsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const interests = yield prismaCliente_1.default.interest.findMany({
                    where: {
                        userId,
                    },
                });
                return interests;
            }
            catch (error) {
                console.error('Erro ao buscar interesses:', error);
                throw new Error('Erro ao buscar interesses');
            }
        });
    }
}
exports.default = InterestModel;
