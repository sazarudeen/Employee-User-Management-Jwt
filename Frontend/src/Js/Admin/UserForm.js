import React, { useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { postData, updateData } from '../Client/AxiosClient';
import ApiConstants from '../Constants/Endpoints';


const AddUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    
    var state = location.state
    console.log('data', state);
    var name_;
    var password_;
    var ischecked_=false;
    
    
    if (state != null) {
        name_ = state.username
        password_ = state.password
        if(state.roles.includes('admin')){
            ischecked_=true;
        }
    } else {
        name_ = ''
        password_ = ''
    }
    
    
    const [isChecked, setIsChecked] = useState(ischecked_);
    const [name, setName] = useState(name_)
    const [password, setPassword] = useState(password_)
    const { id } = useParams();

    const switchStyle = {
        backgroundColor: isChecked ? 'limegreen' : 'orange',
        position: "absolute",
        top: '131%',
        left: '7%'
    };

    const saveOrUpdateUser = async (e) => {
        e.preventDefault();
        var roles = ['user'];
        isChecked && roles.push('admin')
        const user = {
            username: name,
            password: password,
            roles,
        }
        var response;
        var message;
        var status;
        var showgreen;
        try {
            if (id) {
                response = await updateData(ApiConstants.ADMIN_RESOURCE,{...user, id: id });
                if(response.status==200){
                    message = `User ${user.username} has been updated`
                    status = 'Success'
                    showgreen = false;
                }else{
                    message = `Some thing wrong in updating User ${user.username} `
                    status = 'Failure'
                }
            } else {
                response = await postData(ApiConstants.ADMIN_RESOURCE, user);
                if(response.status==200){
                    message = `User ${user.username} has been created`
                    status = 'Success'
                    showgreen = true;
                }else{
                    message = `Some thing wrong in creating User ${user.username} `
                    status = 'Failure'
                }
            }
            navigate("/users",{state:{message,status,showgreen,delay:2500}});
        } catch (error) {

        }

    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update User</h2>
        } else {
            return <h2 className="text-center">Add User</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className="form-container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"><br />
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-floating mt-3 mb-3">
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter User name"
                                        name="userName"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </input>
                                    <label for='name' className="form-label"> User Name </label>
                                </div>

                                <div className="form-floating mt-3 mb-3">
                                    <input
                                        id='progress'
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                    <label for='progress' className="form-label"> Password </label>
                                </div>

                                <div style={{position:'relative',marginTop:'10px'}}>
                                <label className="form-check-label" style={{ position: "absolute",left: "1%",color:"black",fontWeight:'bold'}} htmlFor="flexSwitchCheckDefault">
                                    Enable/Disable Admin Access
                                </label>
                                <div className="form-check form-switch">
                                    <input
                                       style={switchStyle}
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckDefault"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                </div>

                                <div className="btn btn-success" style={{ marginTop: "20px" }} onClick={(e) => saveOrUpdateUser(e)} >Submit </div>
                                <Link to="/users" style={{ marginTop: "20px", marginLeft: "20px" }} className="btn btn-danger"> Cancel </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser
