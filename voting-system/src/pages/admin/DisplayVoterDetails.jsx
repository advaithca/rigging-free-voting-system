import React, { useState, useEffect } from "react";
import api from "../../api/voter.js";
import CustomAlert from "../../components/CustomAlert";
import LogoutButton from '../../components/auth/LogoutButton';
import Navbar from "../../components/Navbar.jsx";
import voter from "../../api/voter.js";

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
                        <tr>
                            <td className="border border-slate-600">{e[0]}</td>
                            <td className="overflow-hidden border border-slate-600">{e[1].toString()}</td>
                        </tr>
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
        <div className="max-w-[320px] mx-auto py-16 text-white">
            <h1 className="text-3xl font-bold">Voter Details</h1>
            <table className="table-fixed border-separate border border-slate-500">
                <thead>
                    <tr className="w-100">    
                        <th className="border border-slate-600 w-1/3">Label</th>
                        <th className="border border-slate-600 w-2/3 overflow-hidden">Embedding</th>
                    </tr>
                </thead>
                <tbody>
                    {voterData}
                </tbody>
            </table>
            <div className="w-full flex flex-col py-4">
                <button className="bg-green-600 py-3 my-6 rounded font-bold" onClick={handleClick}>
                    Refresh
                </button>
                <LogoutButton />
            </div>
            {resultAlert}
        </div>
        </div>
    );
}

export default VoterDetails;