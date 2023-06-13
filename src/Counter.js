import { ethers } from 'ethers';
import React, { useState } from 'react';
import { abi, contractAddress } from './abi';
import { ToastContainer, toast } from 'react-toastify';

const Counter = ({ smartAccount, provider }) => {
    const [count, setCount] = useState(0)
    const [counterContract, setCounterContract] = useState(null)

    console.log(provider, "pro");
    console.log(smartAccount, "smartAccount");


    const getCount = async (isUpdating) => {

        if (!smartAccount && !provider) return
        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider,
        )
        setCounterContract(contract)
        const currentCount = await contract.count()
        setCount(currentCount.toNumber())
        if (isUpdating) {
            toast.success('count has been updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const incrementCount = async () => {
        if (!smartAccount && !provider) return
        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider,
        )
        try {
            toast.info('processing count on the blockchain!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(contract, "counterContract");
            const incrementTx = await contract.populateTransaction.incrementCount()
            console.log(incrementTx, "incrementTx");
            const tx1 = {
                to: contractAddress,
                data: incrementTx.data,
            }
            console.log(tx1, "tx1");
            const txResponse = await smartAccount.sendTransaction({ transaction: tx1 })
            console.log(txResponse, "txResponse");
            const txHash = await txResponse.wait();
            console.log(txHash)
            getCount(true)

        } catch (error) {
            console.log({ error })
            toast.error('error occured check the console', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <button onClick={() => incrementCount()}>
                count is {count}
            </button>
        </div>
    );
};

export default Counter;