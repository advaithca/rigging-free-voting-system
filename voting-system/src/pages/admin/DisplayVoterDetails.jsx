import React, { useState, useEffect } from "react";
import api from "../../api/voter.js";
import LogoutButton from '../../components/auth/LogoutButton';
import Navbar from "../../components/Navbar.jsx";

const VoterDetails = () => {
    const [resultAlert, setResultAlert] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [voterData, setVoterData] = useState(null);
    
    useEffect(() => {
        setResultAlert(null);
        api.voterDetails().then((res) => {
            // console.log(res.data);
            setVoterData(() => 
                res.data.map((e, id) => {
                    return (
                        <div className="flex gap-2 m-1"> 
                            <div className="p-4 inline-flex border border-slate-600 w-1/3 hover:bg-gray-100 hover:text-black">{e[0]}</div>
                            <div className="p-4 inline-flex border border-slate-600 w-2/3 overflow-hidden hover:bg-gray-100 hover:text-black">{e[1].toString()}</div>
                        </div>
                    );
                })
            );
        });
    },[refresh])
    
    console.log(voterData);

    function handleClick(){
        setRefresh((prev)=>(!prev));
    }
    return (
        <div>
            <Navbar />
            <div className="px-40 py-16 text-white">
                <h1 className="text-3xl font-bold py-4">Voter Details</h1>
                <div className="mt-1 grid grid-cols-1 gap-2 border-separate border border-slate-500 overflow-hidden">
                        <div className="flex gap-2 m-1">    
                            <div className="p-4 inline-flex border font-extrabold border-slate-600 w-1/3 hover:bg-gray-100 hover:text-black">Label</div>
                            <div className="p-4 inline-flex border font-extrabold border-slate-600 w-2/3 hover:bg-gray-100 hover:text-black">Embedding</div>
                        </div>
                        {voterData}
                </div>
                <div className="w-full flex flex-col py-4">
                    <button className="bg-green-600 py-3 my-6 rounded font-bold hover:bg-green-900" onClick={handleClick}>
                        Refresh
                    </button>
                </div>
                {resultAlert}
            </div>
        </div>
    );
}

export default VoterDetails;