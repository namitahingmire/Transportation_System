import React, { useEffect, useState } from "react";
import './completed-request.css';
import axios from "axios";
import { TRANSPORTATION_REQUEST_BASE_URL } from "../../../constants/environment";
import UserService from "../../../services/user-service";

function CompletedRequest() {

    const [data, setData] = useState([]);
    const localStorage = UserService.getUser();
    useEffect(() => {
        const data = {
            providerId: localStorage.userId,
            status: "Completed"
        }

        axios
            .post(TRANSPORTATION_REQUEST_BASE_URL + "getByStatusAndIdForProvider", data)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
        console.log(data);
    }, []);

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

export default CompletedRequest;