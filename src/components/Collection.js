import { useHistory, useParams } from "react-router-dom";
import "@covalenthq/goldrush-kit/styles.css";
import {
  GoldRushProvider,
  NFTCollectionTokenListView
} from "@covalenthq/goldrush-kit";

export default function Collection() {
    const params = useParams();
    const { network, address } = params;
    const history = useHistory();

    console.log(network, address)
    
    const handleClick = (e) => {
        history.push(`/analytics/${network}/${address}/${e.nft_data.token_id}`);
    }

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <div>
        <div className="container mt-5">
            <button className="btn btn-outline-light" onClick={handleGoBack}>Go Back</button>
            <br /><br />

            <GoldRushProvider apikey={process.env.REACT_APP_COVALENT_API_KEY} mode="dark" color="emerald">
                <NFTCollectionTokenListView
                    chain_name={network}
                    collection_address={address}
                    on_nft_click={(e) => {
                        handleClick(e)
                    }}
                />
            </GoldRushProvider>
        </div>
    </div> 
    )
}