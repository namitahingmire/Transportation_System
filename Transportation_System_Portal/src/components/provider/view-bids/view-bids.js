import React, { useEffect, useState } from "react";
import './view-bids.css';
import axios from "axios";
import { TRANSPORTATION_REQUEST_BASE_URL, BID_REQUEST_BASE_URL, USER_BASE_URL } from "../../../constants/environment";
import UserService from "../../../services/user-service";
import { useNavigate, useParams } from "react-router-dom";

function ViewBids() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [aceeptedData, setAcceptedData] = useState(null);
    const navigate = useNavigate();
    let transporterData = new Array();

    useEffect(() => {
        const postData = {
            transportation_request_id: params.id
        }
        axios
            .post(BID_REQUEST_BASE_URL + "getRequestById", postData)
            .then(res => {
                const data = res.data[0].bids;
                setData(data);
                setAcceptedData(res.data[0].acceptedBid);
            })
            .catch(err => console.log(err));
    }, [params]);

    useEffect(() => {
        if (data && aceeptedData) {
            setIsDisabled(true);
        }
    }, [data]);

    useEffect(() => {
        const fetchTransporterData = async () => {
            try {
                let userArray = []; // Initialize userArray

                // Map each data element to a promise of fetching transporter data
                const promises = data.map(async d => {
                    const response = await axios.get(USER_BASE_URL + d.transporterId);
                    return response.data;
                });

                // Await all promises to resolve and accumulate transporter data
                for (const promise of promises) {
                    const userData = await promise;
                    userArray.push(userData);
                }

                // Update transporterData state
                transporterData = Object.assign([], userArray);
                data.forEach((d, index) => {
                    const transporter = transporterData.find(tData => tData._id === d.transporterId);
                    d["name"] = transporter ? transporter.fullName : 'Unknown';
                    return d;
                });
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch transporter data only if data is available
        if (data.length > 0) {
            fetchTransporterData();
        }
    }, [data]);

    function accpetedBid(acceptedData) {
        const postData = {
            transportation_request_id: params.id,
            acceptedBid: {
                transporterId: acceptedData.transporterId,
                amount: acceptedData.amount
            }
        }
        axios.post(BID_REQUEST_BASE_URL + "acceptBid", postData)
            .then(res => {
                alert("Bid Accepted Successfully");
                navigate("/in-tansist-request");

            })
            .catch(err => console.log(err));

        const postRequestData = {
            id: params.id,
            status: "In Transist",
            transporterId: acceptedData.transporterId
        }

        axios
            .post(TRANSPORTATION_REQUEST_BASE_URL + "updateRequest", postRequestData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div id="my-request">
            <div className="card">

                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Transporter</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            data.map((d, index) => {
                                console.log(data);
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{d.name}</td>
                                        <td>{d.amount}</td>
                                        <td>
                                            <button type="button" className="btn btn-success" onClick={(e) => accpetedBid(d)} disabled={isDisabled}>Accept</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewBids;