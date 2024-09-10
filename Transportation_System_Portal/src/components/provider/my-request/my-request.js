import React, { useEffect, useState } from "react";
import './my-request.css';
import axios from "axios";
import { TRANSPORTATION_REQUEST_BASE_URL } from "../../../constants/environment";
import { Link } from "react-router-dom";
import UserService from "../../../services/user-service";

function MyRequest() {

    const userId = UserService.getUser().userId;
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const data = {
            providerId: userId,
            status: "New"
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
                            <th>Action</th>
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
                                        <td>
                                            <button type="button" className="btn btn-success">
                                                <Link to={{
                                                    pathname: `/view-bids/${d._id}`,
                                                }}>View</Link>
                                            </button>
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

export default MyRequest;