import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  const pack = await sdk.getContract(
    "0x1D7714b0c712D601b6058B566e0450a2275594EE"
  );

  const packNfts = await pack.getAll();

  console.log(packNfts);
})();
