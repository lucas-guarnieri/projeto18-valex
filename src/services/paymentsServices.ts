import * as paymentsRepository from "./../repositories/paymentRepository.js"
import * as cardsUtils from "./../../utils/cardsUtils.js"
import * as transactionUtils from "./../../utils/transactionUtils.js"
import * as businessRepository from "./../repositories/businessRepository.js"
import { TransactionTypes } from "../repositories/cardRepository.js"
import * as paymentRepository from "./../repositories/paymentRepository.js"

export async function paymentCardEmployee(businessId: number, cardId: number, password: string, amount : number) {
    const card = await cardsUtils.getCardById(cardId);
    const business = await getBusinessById(businessId);
    cardsUtils.isCardAtive(card.password);
    isCardBlock(card.isBlocked);
    await cardsUtils.checkPassword(password, card.password);
    cardsUtils.checkExpirationDate(card.expirationDate);
    transactionUtils.verifyAmount(amount);
    checkPaymentCompatibility(business.type, card.type);
    await paymentRepository.insert({
        cardId: card.id,
        businessId: business.id,
        amount: amount,
      });
}

export async function getPayments(cardId : number) {
    const transactions = await paymentsRepository.findByCardId(cardId);
    let total = 0;
    for (let i = 0; i < transactions.length; i++){
        total +=transactions[i].amount;
    }
    return {
        transactions,
        total
    }
}

export async function getBusinessById(businnessId: number) {
    const businnes = await businessRepository.findById(businnessId);
        if (!businnes){
            throw {
                type: "paymentError", message:"business not found", code:"404"
            }
        }
        return businnes; 
}

function checkPaymentCompatibility(businessType: TransactionTypes, cardType: TransactionTypes) {
    if (businessType !== cardType){
        throw {
            type: "paymentError", message:"payment and business type do not match", code:"401"
        }
    }
}

function isCardBlock(block: boolean) {
    if (block){
        throw {
            type: "paymentError", message:"card blocked", code:"401"
        }
    }
}
