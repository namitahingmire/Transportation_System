import React, { useEffect, useState } from "react";
import './request-details.css';
import axios from "axios";
import { BID_REQUEST_BASE_URL } from "../../../constants/environment";
import { useNavigate, useParams } from "react-router-dom";
import UserService from '../../../services/user-service';

function RequestDetails() {
    const params = useParams();
    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (params && params.data) {
            console.log(params);
            setData(JSON.parse(params.data));
            console.log(data);
        }
    }, [params.data]);

    useEffect(() => {
        if (data && data.initialPrice) {
            setAmount(data.initialPrice.toString());
        }
    }, [data]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmit = (e) => {
        const postData = {
            transportation_request_id: data && data._id ? data._id : " ",
            bids: [
                {
                    transporterId: UserService.getUser().userId,
                    amount
                }
            ],
            acceptedBid: null
        }

        axios.post(BID_REQUEST_BASE_URL, postData)
            .then(res => {
                alert("Request Successfull!!!")
                // navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div id="accept-request">
            <h3>REQUEST DETAILS</h3>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Goods Description: {data && data.goodsDescription}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3>Source Location:</h3>
                                </div>

                                <div className="col-md-6">
                                    <h4>{data && data.sourceLocation}</h4>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3>Destination Location: </h3>
                                </div>
                                <div className="col-md-6">
                                    <h4>{data && data.destinationLocation}</h4>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3>Pickup Date : </h3>
                                </div>
                                <div className="col-md-6">
                                    <h4>{data && data.pickupDate}</h4>
                                </div>
                            </div>

                            <hr />
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3>Drop Date : </h3>
                                </div>
                                <div className="col-md-6">
                                    <h4>{data && data.estimatedDropDate}</h4>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <h2>Initial Price: {data && data.initialPrice}</h2>
                                </div>

                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <input type="Number"
                                                value={amount}
                                                onChange={handleAmountChange}
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleSubmit}
                                            >
                                                Make Bid
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestDetails;