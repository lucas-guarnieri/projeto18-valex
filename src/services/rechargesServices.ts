import * as rechargeRepository from "./../repositories/rechargeRepository.js"
import * as cardsUtils from "./../../utils/cardsUtils.js"
import * as transactionUtils from "./../../utils/transactionUtils.js"

export async function rechargeCardEmployee(cardId: number, amount: number) {
    const card =    await cardsUtils.getCardById(cardId);
    cardsUtils.isCardAtive(card.password);
    cardsUtils.checkExpirationDate(card.expirationDate);
    transactionUtils.verifyAmount(amount);
    await rechargeRepository.insert({
        cardId: cardId,
        amount: amount
    });
}

export async function getRecharges(cardId : number) {
    const transactions = await rechargeRepository.findByCardId(cardId);
    let total = 0;
    for (let i = 0; i < transactions.length; i++){
        total +=transactions[i].amount;
    }
    return {
        transactions,
        total
    }
}

