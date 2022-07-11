import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeServices from "./employeeServices.js"
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

