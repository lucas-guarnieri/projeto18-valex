import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from 'bcrypt';
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeServices from "./employeeServices.js"
import * as paymentsServices from "./paymentsServices.js"
import * as rechargesServices from "./rechargesServices.js"
import { TransactionTypes } from "../repositories/cardRepository.js";
import dotenv from "dotenv";
dotenv.config();

export async function createEmployeeCard (employeeId: number, companyId: number, type: TransactionTypes) {
    const employee = await employeeServices.getEmployeeById(employeeId);
    await checkCardType(type, employeeId);
    const formatedName = employeeServices.formatName(employee.fullName);
    const cvv = createCVV();
    const cardNumber = createCardNumber();
    const expirationDate = setExpirationDate();
    
    const cardData = {
        employeeId: employeeId,
        number: cardNumber,
        cardholderName: formatedName,
        securityCode: cvv,
        expirationDate: expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: type
    }
    await cardRepository.insert(cardData);
}

export async function activateEmployeeCard(cardId: number, cvv: string, password: string) {
    const card  = await getCardById(cardId);
    validateCVV(cvv, card.securityCode);
    checkExpirationDate(card.expirationDate);
    if (!isCardFirstUse(card.password, card.isBlocked)){
        throw{
            type: "cardError", message:"card already have password", code:"401"
        }
    }
    const passwordHashed = await passwordHash(password.toString());
    await cardRepository.update(cardId, {password: passwordHashed, isBlocked: false})
}

export async function getTransacitonsBalance(cardId: number) {
    const card = await getCardById(cardId);
    const payments = await paymentsServices.getPayments(card.id);
    const recharges = await rechargesServices.getRecharges(card.id);
    const balance = recharges.total - payments.total;

    return {
        balance,
        transactions: payments.transactions,
        recharges: recharges.transactions
    }
}

export async function blockCard(cardId: number, password: string) {
    const card = await getCardById(cardId);
    checkExpirationDate(card.expirationDate);
    if (card.isBlocked){
        throw {
            type: "cardError", message:"card already blocked", code:"409"
        }
    };
    await checkPassword(password, card.password);
    await cardRepository.update(cardId, {isBlocked: true})
}

export async function unblockCard(cardId: number, password: string) {
    const card = await getCardById(cardId);
    checkExpirationDate(card.expirationDate);
    if (!card.isBlocked){
        throw {
            type: "cardError", message:"card already unblocked", code:"409"
        }
    };
    await checkPassword(password, card.password);
    await cardRepository.update(cardId, {isBlocked: false});
}


function validateCVV(cvv: string, encryptedCVV: string) {
    const cryptrKey = process.env.CRYPTR_KEY;
    const cryptr = new Cryptr(cryptrKey);
    const decryptedCVV : string = cryptr.decrypt(encryptedCVV);
    if (decryptedCVV != cvv) {
        throw {
            type: "cardError", message:"invalid cvv", code:"401"
        }
    }
}

export async function getCardById(cardId: number) {
    const card = await cardRepository.findById(cardId);
    if (!card){
        throw {
            type: "cardError", message:"card not found", code:"404"
        }
    }
    return card; 
}

export async function checkCardType(type: TransactionTypes, employeeId: number) {
    const checkCardType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if (checkCardType) {
        throw {
            type: "cardError", message:"user already has same-type card", code:"409"
        }
    }
}

function createCVV() {
    const cryptrKey = process.env.CRYPTR_KEY;
    const cvv = faker.finance.creditCardCVV();
    console.log("CVV =", cvv);//TODO: delete
    const cryptr = new Cryptr(cryptrKey);
    const encryptedCVV : string = cryptr.encrypt(cvv);
    return encryptedCVV; 
}

function createCardNumber() {
    const cardNumber : string = faker.finance.creditCardNumber();
    return cardNumber;
}

function setExpirationDate() {
    const expDate = dayjs().add(5, 'year').format('MM/YY');
    return expDate;
}

function checkExpirationDate(expDate : string) {
    const today = dayjs().format('MM/YY');
    let [ expMonth, expYear ] = expDate.split("/");
    let [ nowMonth, nowYear ] = today.split("/");
    if (nowYear >= expYear && nowMonth > expMonth){
        throw {
            type: "cardError", message:"expired card", code:"401"
        }
    }
}

function isCardFirstUse(cardPassword : string, cardIsBlocked: boolean) {
    if (!cardPassword && cardIsBlocked){
        return true;
    }
    return false;
}


export async function passwordHash (password: string) {
    if (password.length < 4) {
        throw {
            type: "cardError", message:"password too short", code:"406"
        }
    }
    return (bcrypt.hashSync(password, 10));
}

export async function checkPassword (password: string, hashPassword: string) {
    const check = bcrypt.compareSync(password, hashPassword);
    if (!check) {
        throw {
            type: "authorizationError", message:"authorization error", code:"401"
        }
    }
}

