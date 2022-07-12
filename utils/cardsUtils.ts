import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import * as cardRepository from "./../src/repositories/cardRepository.js"
import { TransactionTypes } from "./../src/repositories/cardRepository.js";

export async function getCardById(cardId: number) {
    const card = await cardRepository.findById(cardId);
    if (!card){
        throw {
            type: "cardError", message:"card not found", code:"404"
        }
    }
    return card; 
}

export function checkExpirationDate(expDate : string) {
    const today = dayjs().format('MM/YY');
    let [ expMonth, expYear ] = expDate.split("/");
    let [ nowMonth, nowYear ] = today.split("/");
    if (nowYear >= expYear && nowMonth > expMonth){
        throw {
            type: "cardError", message:"expired card", code:"401"
        }
    }
}

export function isCardFirstUse(cardPassword : string, cardIsBlocked: boolean) {
    if (!cardPassword && cardIsBlocked){
        return true;
    }
    return false;
}

export async function checkPassword (password: string, hashPassword: string) {
    const check = bcrypt.compareSync(password, hashPassword);
    if (!check) {
        throw {
            type: "authorizationError", message:"authorizationnnn error", code:"401"
        }
    }
}

export async function checkCardType(type: TransactionTypes, employeeId: number) {
    const checkCardType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if (checkCardType) {
        throw {
            type: "cardError", message:"user already has same-type card", code:"409"
        }
    }
}

export function isCardAtive(password:string) {
    if (!password) {
        throw {
            type: "cardError", message:"card not activate", code:"406"
        }
    }
}