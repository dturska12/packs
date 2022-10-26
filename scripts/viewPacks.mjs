import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  const pack = await sdk.getContract(
    "0x0Aee160411473f63be2DfF2865E81A1D59636C97"
  );

  const packNfts = await pack.getAll();

  console.log(packNfts);
})();
