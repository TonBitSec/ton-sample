import { beginCell, contractAddress, toNano, TonClient4, TonClient, WalletContractV4, internal, fromNano } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { Checkin } from "./output/Checkin_Checkin";

import * as dotenv from "dotenv";
dotenv.config();

(async () => {
    //create client for testnet sandboxv4 API - alternative endpoint
    // const client4 = new TonClient4({
    //     endpoint: "https://sandbox-v4.tonhubapi.com",
    // });
    const client4 = new TonClient({
        endpoint: "http://65.21.223.95:8081/jsonRPC",
    })

    let mnemonics = (process.env.mnemonics_2 || "").toString(); // 🔴 Change to your own, by creating .env file!
    console.log(mnemonics);
    //return;

    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let workchain = 0; //we are working in basechain.
    let deployer_wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    console.log(deployer_wallet.address);

    let deployer_wallet_contract = client4.open(deployer_wallet);
    const walletSender = deployer_wallet_contract.sender(keyPair.secretKey);

    // open the contract address
    let init = await Checkin.init(BigInt(1));
    let checkinContract = contractAddress(workchain, init);
    let contract = await Checkin.fromAddress(checkinContract);
    let contract_open = await client4.open(contract);

    // set or increase the counter
    //await contract_open.send(walletSender, { value: toNano(1) }, "set");
    await contract_open.send(walletSender, { value: toNano(1) }, "increase: 1");
    console.log("send msg ok");

    
})();
