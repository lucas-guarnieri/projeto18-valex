export function verifyAmount (amount: number){
    if (amount<1){
        throw{
            type: "transactionError", message:"amount must be positive value", code:"401"
        }
    }
}