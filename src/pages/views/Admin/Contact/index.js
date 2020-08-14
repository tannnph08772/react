import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Contacts = () => {
    const [contact, setContact] = useState([]);

    useEffect(() => {
        loadContact();
    }, []);

    const loadContact = async () => {
        const result = await axios.get("http://localhost:8080/contact");
        setContact(result.data.reverse());
    };

    const deleteContact = async id => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this file?",
            cancelButtonColor: "red",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
            await axios.delete(`http://localhost:8080/contact/${id}`);
            swal("Deleted!", "Your imaginary file has been deleted!", "success");
            loadContact();
        }  
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-2 text-gray-800">Quản lý sản phẩm</h1>
            </div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table class="table table-bordered table-striped text-center shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Content</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact.map(({id,email, content}, index) => (
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{email}</td>
                                        <td>{content}</td>
                                        <td>
                                            <Link
                                                class="btn btn-danger"
                                                onClick={() => deleteContact(id)}
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

Contacts.propTypes = {
}

export default Contacts
