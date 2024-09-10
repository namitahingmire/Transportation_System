import React, { useEffect, useState } from "react";
import './accept-request.css';
import axios from "axios";
import { TRANSPORTATION_REQUEST_BASE_URL } from "../../../constants/environment";
import { Link } from "react-router-dom";

function AcceptRequest() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const data = { status: "New" };

        axios
            .post(TRANSPORTATION_REQUEST_BASE_URL + "getByStatus", data)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <div id="accept-request">
            <div className="card mb-4">

                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Goods Description</th>
                            <th>Source Location</th>
                            <th>Destination Location</th>
                            <th>Pickup Date</th>
                            <th>Drop Date</th>
                            <th>Initial Amount</th>
                            <th>Status</th>
                            <th>Vehicle Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            data && data.map((d, index) => {
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
                                            <button className="btn btn-success">
                                                <Link to={{
                                                    pathname: `/request-details/${JSON.stringify(d)}`,
                                                    state: `${JSON.stringify(d)}    `
                                                }}>Show Details</Link>
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

export default AcceptRequest;