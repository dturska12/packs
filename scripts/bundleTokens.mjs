import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

(async () => {
  const packAddress = "0x1D7714b0c712D601b6058B566e0450a2275594EE";
  const tokenAddress = "0x2c920d603C3d5c8f6d6E8de39511781D2b12aF74";
  const editionAddress = "0x19f5d531C0595597ce7271d1F6C0F97B9355fBac";

  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  // Set approval for the pack contract to act upon token and edition contracts
  // Set approval for the pack contract to act upon token and edition contracts
  const token = await sdk.getContract(tokenAddress);
  await token.erc20.setAllowance(packAddress, 666000000);

  console.log("Set approval for token");

  const edition = await sdk.getContract(editionAddress);
  await edition.erc1155.setApprovalForAll(packAddress, true);

  console.log("Set Approval for edition");

  // Read in the brain.png as a File using fs
  const brainFile = fs.readFileSync("./scripts/brain.png");

  // Upload the brain to IPFS
  const uri = await sdk.storage.upload(brainFile);

  console.log("Uploaded brain asset to IPFS");

  console.log("Creating packs now...");

  const pack = await sdk.getContract(packAddress, "pack");

  const packNfts = await pack.create({
    packMetadata: {
      name: "BrainZzZz",
      description: "A brain containing goodies for you to enjoy.",
      image: uri,
    },
    // Gold coin ERC-20 Tokens
    erc20Rewards: [
      {
        contractAddress: tokenAddress,
        quantityPerReward: 100000,
        quantity: 1,
        totalRewards: 12,
      },
    ],

    erc1155Rewards: [
      {
        contractAddress: editionAddress,
        tokenId: 1,
        quantityPerReward: 1,
        totalRewards: 12,
      },
    ],
    rewardsPerPack: 2,
  });
  console.log(`====== Success: Pack NFTs =====`);

  console.log(packNfts);
})();
