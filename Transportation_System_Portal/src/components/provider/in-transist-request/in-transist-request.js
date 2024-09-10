import React, { useEffect, useState } from "react";
import './in-transist-request.css';
import axios from "axios";
import { TRANSPORTATION_REQUEST_BASE_URL } from "../../../constants/environment";
import { Link } from "react-router-dom";
import { USER_TYPE } from "../../../constants/constant-data";
import UserService from "../../../services/user-service";

function InTransistRequest() {

    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const localStorage = UserService.getUser();

    useEffect(() => {

        if (UserService.getUser().userType === "Provider") {
            const data = {
                providerId: localStorage.userId,
                status: "In Transist"
            }
            axios
                .post(TRANSPORTATION_REQUEST_BASE_URL + "getByStatusAndIdForProvider", data)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => console.log(err));
        } else {
            const data = {
                transporterId: localStorage.userId,
                status: "In Transist"
            }
            axios
                .post(TRANSPORTATION_REQUEST_BASE_URL + "getByStatusAndIdForTransporter", data)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => console.log(err));
        }
    }, []);

    function markComplete(data) {
        const postRequestData = {
            id: data._id,
            status: "Completed"
        }

        axios
            .post(TRANSPORTATION_REQUEST_BASE_URL + "updateStatus", postRequestData)
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
                            <th>Goods Description</th>
                            <th>Source Location</th>
                            <th>Destination Location</th>
                            <th>Pickup Date</th>
                            <th>Drop Date</th>
                            <th>Initial Price</th>
                            <th>Status</th>
                            <th>Vehicle Type</th>
                            {UserService.getUser().userType === USER_TYPE.TRANSPORTER ?
                                (<th>Action</th>) : ""
                            }
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            data.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{d.goodsDescription}</td>
                                        <td>{d.sourceLocation}</td>
                                        <td>{d.destinationLocation}</td>
                                        <td>{d.pickupDate}</td>
                                        <td>{d.estimatedDropDate}</td>
                                        <td>{d.initialPrice}</td>
                                        <td>{d.status}</td>
                                        <td>{d.vehicleType}</td>
                                        {UserService.getUser().userType === USER_TYPE.TRANSPORTER ?
                                            (<td>
                                                <button type="button" className="btn btn-success" onClick={(e) => markComplete(d)}>
                                                    Mark Complete
                                                </button>
                                            </td>) : ""
                                        }
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

export default InTransistRequest;