import { Address, contractAddress } from "@ton/core";
import { TonClient4,TonClient} from "@ton/ton";
import { Checkin } from "./output/Checkin_Checkin";

(async () => {
    // const client = new TonClient4({
    //     endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    // });

    const client = new TonClient({
        endpoint: "http://65.21.223.95:8081/jsonRPC",
    })

    // open the contract address
    let init = await Checkin.init(BigInt(1));
    let workchain = 0; //we are working in basechain.
    let contract_address = contractAddress(workchain, init);
    let contract = await Checkin.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getGetCounter()));
    console.log("Is Solved: " + (await contract_open.getIsSolved()));

})();
