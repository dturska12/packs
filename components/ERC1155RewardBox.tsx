import {
  ThirdwebNftMedia,
  useMetadata,
  useContract,
} from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";

type Props = {
  reward: {
    tokenId: string | number;
    contractAddress: string;
    quantityPerReward: string | number;
  };
};

export default function ERC115RewardBox({ reward }: Props) {
  const { contract: edition } = useContract(reward.contractAddress);
  const { data } = useNFT(edition, reward.tokenId);

  return (
    <div className={styles.nftBox}>
      {data && (
        <>
          <ThirdwebNftMedia
            metadata={data?.metadata}
            className={styles.nftMedia}
          />
          <h3>{data?.metadata.name}</h3>
        </>
      )}
    </div>
  );
}
