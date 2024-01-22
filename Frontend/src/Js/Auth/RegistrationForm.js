import React, { useState } from 'react';
import { postData } from '../Client/AxiosClient';
import { Link } from 'react-router-dom';
import RequestBanner from '../RequestBanner';
import ApiConstants from '../Constants/Endpoints';

const RegistrationForm = ({setMiddle}) => {

    setMiddle('Employee')

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        job: '',
        userName: '',
        password: '',
    });

    var showLoginButton = false;

    const [requestResult, setRequestResult] = useState({
        type: null,
        message: '',
    });

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Perform any validation if needed

        try {
            
            const payLoad = {
                username: formData.userName,
                password: formData.password
            }
            const response = await postData(ApiConstants.AUTH_RESOURCE + '/register',payLoad);

            if (response.status === 200) {
                setRequestResult({
                    type: 'success',
                    message: `User ${formData.userName} has been Created sucessfully`,
                });
            }
        } catch (error) {
            var message = `User ${formData.userName} could not be Created due to ` + error;
            setRequestResult({
                type: 'failure',
                message: message,
            });
        }

        // Reset the form data if needed
        setFormData({
            name: '',
            age: '',
            job: '',
            userName: '',
            password: '',
        });
    };

    const renderWithDebugging = () => {
       
        if (requestResult.type === 'success') {
            showLoginButton = true
        }

        return (
            <>
                {requestResult.type && (
                    <RequestBanner type={requestResult.type} message={requestResult.message} />
                )}
                {requestResult.type === 'success' && showLoginButton && (
                    <Link to="/login" style={{ marginTop: "10px" }}>
                        <div className="btn btn-success">Please Go to Login Page</div>
                    </Link>
                )}
            </>
        );
    };

    return (
        <div id="formcontainer">
            <form onSubmit={handleOnSubmit}>
                <h1>Register</h1><br />
                {/* <div className="form-floating mt-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleOnChange}
                        value={formData.name}
                        id="name"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    // required
                    />
                    <label for="name">Enter Name</label><br />
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleOnChange}
                        value={formData.age}
                        id="age"
                        aria-describedby="emailHelp"
                        placeholder="Enter Age"
                    // required
                    />
                    <label for="age" >Enter Age</label><br />
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleOnChange}
                        value={formData.job}
                        id="job"
                        placeholder="Employee Job"
                    // required
                    />
                    <label for="job" >Enter Job</label><br />
                </div> */}
                <div className="form-floating mt-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleOnChange}
                        value={formData.userName}
                        id="userName"
                        placeholder="Enter User Name"
                        required
                    />
                    <label for="userName" >Enter User Name</label><br />
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input
                        type="password"
                        className="form-control"
                        onChange={handleOnChange}
                        value={formData.password}
                        id="password"
                        placeholder="Enter Password"
                        required
                    />
                    <label for="password" >Enter Password</label><br />
                </div>
                <div type="submit" onClick={e=>handleOnSubmit(e)} className="btn btn-primary" style={{ marginBottom: "20px"}}>Create new user</div>
                {
                    renderWithDebugging()
                }
            </form>
        </div>
    );
};

export default RegistrationForm;
