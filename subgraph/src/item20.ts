import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
    Transfer as TransferEvent
} from "../generated/templates/Item20/Item20";
import {
    Balance
} from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
    if(event.params.value.equals(BigInt.zero())) {
        return;
    }

    let token = event.address;

    if (!event.params.from.equals(Address.zero())) {
        let fromId = deriveBalanceId(token, event.params.from);
        let fromBalance = Balance.load(fromId);
        if (fromBalance != null) {
            fromBalance.amount = fromBalance.amount.minus(event.params.value);
            fromBalance.save();
        }
    }

    if (!event.params.to.equals(Address.zero())) {
        let toId = deriveBalanceId(token, event.params.to);
        let toBalance = Balance.load(toId);
        if (toBalance == null) {
            toBalance = new Balance(toId);
            toBalance.item = token;
            toBalance.character = event.params.to;
            toBalance.amount = BigInt.zero();
        }
        toBalance.amount = toBalance.amount.plus(event.params.value);
        toBalance.save();
    }
}

function deriveBalanceId(token: Bytes, owner: Bytes): Bytes {
    return token.concat(owner);
}