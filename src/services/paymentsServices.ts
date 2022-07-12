import * as paymentsRepository from "./../repositories/paymentRepository.js"

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