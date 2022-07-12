import * as rechargeRepository from "./../repositories/rechargeRepository.js"

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