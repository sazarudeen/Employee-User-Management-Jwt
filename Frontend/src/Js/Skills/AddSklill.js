import React, { useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { postData, updateData } from '../Client/AxiosClient';
import ApiConstants from '../Constants/Endpoints';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer } from 'react-toastify';


const AddSkill = () => {
    const navigate = useNavigate();
    const location = useLocation();
    var state = location.state
    var name_;
    var progress_;
    var selectedValue_;
    if (state != null) {
        name_ = state.technologyName
        progress_ = state.learningProgress
        selectedValue_ = state.type
    } else {
        name_ = ''
        progress_ = ''
        selectedValue_ = 'Select an skill type'
    }
    const [name, setName] = useState(name_)
    const [progress, setProgress] = useState(progress_)
    const { id } = useParams();


    const [selectedValue, setSelectedValue] = useState(selectedValue_);

    const handleDropdownSelect = (eventKey, event) => {
        event.preventDefault();
        setSelectedValue(eventKey);
    };

    const saveOrUpdateSkill = async (e) => {
        e.preventDefault();
        const skill = {
            technologyName: name,
            learningProgress: progress,
            type: selectedValue
        }
        var response;
        var message;
        var status;
        var showgreen;
        try {
            if (id) {
                response = await updateData(ApiConstants.SKILL_RESOURCE, { ...skill, techId: id });
                if(response.status==200){
                    message = `${skill.technologyName} has been updated`
                    status = 'Success'
                    showgreen = false;
                }else{
                    message = `Some thing wrong in updating ${skill.technologyName} `
                    status = 'Failure'
                }
            } else {
                response = await postData(ApiConstants.SKILL_RESOURCE,skill);
                if(response.status==200){
                    message = `${skill.technologyName} has been created`
                    status = 'Success'
                    showgreen = true;
                }else{
                    message = `Some thing wrong in creating ${skill.technologyName}`
                    status = 'Failure'
                }
            }
            navigate("/skills",{state:{message,status,showgreen,delay:2500}});
        } catch (error) {

        }

    }

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update Skill</h2>
        } else {
            return <h2 className="text-center">Add Skill</h2>
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
                                        placeholder="Enter Skill name"
                                        name="skillName"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </input>
                                    <label for='name' className="form-label"> Skill Name </label>
                                </div>

                                <div className="form-floating mt-3 mb-3">
                                    <input
                                        id='progress'
                                        type="text"
                                        placeholder="Enter value between 0 to 100"
                                        name="lastName"
                                        className="form-control"
                                        value={progress}
                                        onChange={(e) => setProgress(e.target.value)}
                                    >
                                    </input>
                                    <label for='progress' className="form-label"> Skill Progress </label>
                                </div>
                                <div style={{ marginTop: "15px" }}>
                                    <label className="form-label"> Skill type :</label>
                                    <Dropdown onSelect={handleDropdownSelect} >
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {selectedValue}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Backend">Backend</Dropdown.Item>
                                            <Dropdown.Item eventKey="Frontend">Frontend</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="btn btn-success" style={{ marginTop: "20px" }} onClick={(e) => saveOrUpdateSkill(e)} >Submit </div>
                                <Link to="/skills" style={{ marginTop: "20px", marginLeft: "20px" }} className="btn btn-danger"> Cancel </Link>
                                <ToastContainer/>
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddSkill
