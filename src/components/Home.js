import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ethers } from "ethers";
import {
    GoldRushProvider
  } from "@covalenthq/goldrush-kit";

const Home = () => {
    const [network, setNetwork] = useState("eth-mainnet");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function isContractAddress(provider, address) {
        try {
          // Get the bytecode at the provided address
          const bytecode = await provider.getCode(address);
      
          // Check if the bytecode length is greater than 2
          // An empty address has a bytecode length of 2 ('0x' + 0 bytes)
          return bytecode.length > 2;
        } catch (error) {
          // Handle errors, e.g., if the address is invalid
          console.error('Error checking contract address:', error.message);
          return false;
        }
    }

    const provider = ethers.getDefaultProvider();


    const handleNetworkChange = (e) => {
        setNetwork(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleExplore = (e) => {
        e.preventDefault();

        if(network === "" || address === "") {
        alert("All input fields must be filled out");
        } else {   
            setLoading(true);

            isContractAddress(provider, address).then((isContract) => {
                if (isContract) {
                    history.push(`/collection/${network}/${address}`);
                } else {
                    history.push(`/nfts/${network}/${address}`);
                }
            });
        }
    }

    return (
        <GoldRushProvider apikey={process.env.REACT_APP_COVALENT_API_KEY} mode="dark" color="emerald">
            <div className="container mt-5">
                <h2 style={{ fontSize: "40px", textAlign: "center", fontWeight: "bold" }}>NFT Analyzer Tool</h2>
                <p style={{ textAlign: "center" }}>One stop dashboard for NFT Analysis on all EVM chains.</p>

                <div className="card mt-4 mb-5">
                    <div className="card-body" style={{ backgroundColor: "#10172a" }}>
                        <form action="" className='mt-4'>
                            <div className="form-group">
                                <label htmlFor="network">Select Chain</label>
                                <select id='network' onChange={handleNetworkChange} className="form-control">
                                <option value="eth-mainnet">Ethereum</option>
                                <option value="bsc-mainnet">Binance</option>
                                <option value="matic-mainnet">Polygon</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Input Address</label>
                                <input id='address' onChange={handleAddressChange} type="text" className="form-control" placeholder='Enter wallet address or NFT contract address here...' />
                            </div>

                            {loading ? <p>Loading | Please wait...</p> : <button onClick={handleExplore} className='btn btn-secondary btn-block'>Analyze</button>}
                        </form>
                    </div>
                </div>
            </div>
        </GoldRushProvider>
    )
}

export default Home