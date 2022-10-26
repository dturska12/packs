import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  const packAddress = await sdk.deployer.deployPack({
    name: "BrainZzZz",
    primary_sale_recipient: "0xb371d1C5629C70ACd726B20a045D197c256E1054",
  });

  console.log(`Pack address: ${packAddress}`);
})();
