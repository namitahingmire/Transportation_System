import React, { useState } from "react";
import './new-request.css';
import axios from "axios";
import { TRANSPORTATION_REQUEST_BASE_URL } from '../../../constants/environment';
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/user-service";

function NewRequest() {
    const [goodsDescription, setGoodsDescription] = useState("");
    const [sourceLocation, setSourceLocation] = useState("");
    const [destinationLocation, setDestinationLocation] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [estimatedDropDate, setEstimatedDropDate] = useState("");
    const [initialPrice, setInitialPrice] = useState(0);
    const [status, setStatus] = useState("New");
    const [vehicleType, setVehicleType] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();
    const userId = UserService.getUser().userId;
    // const error = {};
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (
            goodsDescription &&
            sourceLocation &&
            destinationLocation &&
            pickupDate &&
            estimatedDropDate &&
            initialPrice &&
            status &&
            vehicleType
        ) {
            const data = {
                goodsDescription,
                sourceLocation,
                destinationLocation,
                pickupDate,
                estimatedDropDate,
                initialPrice,
                status,
                vehicleType,
                providerId: userId
            }

            console.log(data);
            axios
                .post(TRANSPORTATION_REQUEST_BASE_URL, data)
                .then(res => {
                    navigate('/my-request');
                    console.log(res)
                })
                .catch(err => console.log(err));
        }
        // console.log(`${goodsDescription} ${sourceLocation} ${destinationLocation} ${pickupDate} ${estimatedDropDate} ${initalPrice} ${vehicleType} ${status}`)
    }

    return (
        <div className="container-fluid" id="new-request-component">
            <div className="card">
                <div className="card-header">
                    <h3 className="text-center">New Request</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label><h5>Goods Description:</h5></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Goods Description"
                                    onChange={(e) => setGoodsDescription(e.target.value)}
                                />
                                {
                                    submitted && !goodsDescription.trim() ?
                                        (
                                            <span>
                                                Please Fill Goods Description!!!
                                            </span>
                                        ) : ""
                                }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <lable><h5>Source Location</h5></lable>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Source Location"
                                    onChange={(e) => setSourceLocation(e.target.value)}
                                />
                                {
                                    submitted && !sourceLocation.trim() ?
                                        (
                                            <span>
                                                Please Fill Source Location!!!
                                            </span>
                                        ) : ""
                                }
                            </div>
                            <div className="col-md-6">
                                <label><h5>Destination Location:</h5></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Destination Location"
                                    onChange={(e) => setDestinationLocation(e.target.value)}
                                />
                                {
                                    submitted && !destinationLocation.trim() ?
                                        (
                                            <span>
                                                Please Fill Destination Location!!!
                                            </span>
                                        ) : ""
                                }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <lable><h5>Pickup Date:</h5></lable>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Enter Pickup Date"
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />
                                {
                                    submitted && !pickupDate.trim() ?
                                        (
                                            <span>
                                                Please Fill Pickup Date!!!
                                            </span>
                                        ) : ""
                                }
                            </div>

                            <div className="col-md-6">
                                <label><h5>Drop Date:</h5></label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Enter Drop Date"
                                    onChange={(e) => setEstimatedDropDate(e.target.value)}
                                />
                                {
                                    submitted && !estimatedDropDate.trim() ?
                                        (
                                            <span>
                                                Please Fill Drop Date!!!
                                            </span>
                                        ) : ""
                                }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label><h5>Initital Price</h5></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Initial Price"
                                    onChange={(e) => setInitialPrice(e.target.value)}
                                />
                                {
                                    submitted && !initialPrice ?
                                        (
                                            <span>
                                                Please Fill Initial Price!!!
                                            </span>
                                        ) : ""
                                }
                            </div>

                            <div className="col-md-3">
                                <label><h5>Status:</h5></label>
                                <select class="form-select" aria-label="Default select example"
                                    onChange={(e) => setStatus(e.target.value)} >
                                    <option value="New" selected>New</option>
                                    <option value="Completed">Completed</option>
                                    {/* <option value="3">Three</option> */}
                                </select>

                            </div>

                            <div className="col-md-6">
                                <label><h5>Vehicle Type</h5></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Vehicle Type"
                                    onChange={(e) => setVehicleType(e.target.value)}
                                />
                                {
                                    submitted && !vehicleType.trim() ?
                                        (
                                            <span>
                                                Please Fill Vehicle Type!!!
                                            </span>
                                        ) : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Submit Request</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default NewRequest;
