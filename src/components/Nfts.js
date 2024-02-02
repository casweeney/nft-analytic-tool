import { useHistory, useParams } from "react-router-dom";
import "@covalenthq/goldrush-kit/styles.css";
import {
  GoldRushProvider,
  NFTWalletTokenListView
} from "@covalenthq/goldrush-kit";

export default function Nfts() {
  const history = useHistory();
  const params = useParams();
  const { network, address } = params;
  
  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <div>
      <div className="container mt-5">
        <button className="btn btn-outline-light" onClick={handleGoBack}>Go Back</button>
        <br /><br />

        <GoldRushProvider apikey={process.env.REACT_APP_COVALENT_API_KEY} mode="dark" color="emerald">
              <NFTWalletTokenListView
                  address={address}
                  chain_names={[
                      `${network}`,
                  ]}
              />
        </GoldRushProvider>
      </div>
    </div> 
  )
}