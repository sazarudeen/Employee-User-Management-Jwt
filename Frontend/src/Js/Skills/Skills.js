import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteData, fetchData } from '../Client/AxiosClient';
import ApiConstants from '../Constants/Endpoints';
import FooterComponent from '../../FooterComponent';
import $ from 'jquery'
import '../../Css/SearchBar.css'
import { toastFunctions } from '../Status/StatusBar';
import { ToastContainer } from 'react-toastify';
import RefreshBox from '../SearchComponents/RefreshComponent';
import SearchBox from '../SearchComponents/SearchComponent';
import RedisFlush from '../SearchComponents/RedisFlushComponent';

const Skills = ({ setMiddle }) => {

    const navigate = useNavigate();
    setMiddle('Employee Skills')
    var [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            fetchDataFromServer();
        }, 300);
    }, [])

    const fetchDataFromServer = async () => {
        try {
            var response;
            response = await fetchData(ApiConstants.SKILL_RESOURCE)
            if (response.status == 200) {
                if (response.data.length != 0) {
                    if (location.state != null) {
                        if (location.state['status'] = 'success') {
                            if (location.state['showgreen']) {
                                toastFunctions.showSuccessToast(location.state['message'], location.state['delay'])
                            } else {
                                toastFunctions.showWarnToast(location.state['message'], location.state['delay'])
                            }
                        } else {
                            toastFunctions.showErrorToast(location.state['message'], location.state['delay'])
                        }
                        location.state = null;
                    }
                    setSkills(response.data)
                }
                setLoading(false);
            }
        } catch (error) {
            console.log('error occured', error)
        }
    }

    const handleOnKeyDown = e => {
        if (e.keyCode == 13) {
            const searchedValue = $("#searchBox").val();
            const filteredSkills = skills.filter(skill => {
                const technologyName = skill.technologyName.toLowerCase();
                const searchedValueLower = searchedValue.toLowerCase();
                const partialMatch = technologyName.includes(searchedValueLower);
                const caseSensitiveMatch = technologyName === searchedValue;
                const caseInsensitiveMatch = technologyName.toLowerCase() === searchedValueLower;
                return partialMatch || caseSensitiveMatch || caseInsensitiveMatch;
            });

            setSkills(filteredSkills);
        }
    }

    const handleRefresh = () => {
        setLoading('true');
        setTimeout(() => {
            fetchDataFromServer();
        }, 300)
    }

    const handleRedisFlush = async () => {
        try {
            var response = await fetchData(ApiConstants.SKILL_RESOURCE + '/flush')
            if (response.status == 200 && response.data) {
                toastFunctions.showInfoToast('Skills Data has been flushed out in Redis,Click on the refresh skills button for fresh data', 3000)
            } else {
                toastFunctions.showErrorToast('Something wrong in redis flush', 1000)
            }
        } catch (error) {
            console.log('Error occured in redis flush ', error)

        }
    }

    const TableHeader = () => {
        return (
            <thead className="thead-dark">
                <tr>
                    <th>Skill Name</th>
                    <th>Skill Weightage</th>
                    <th>Skill status</th>
                    <th>Update Action</th>
                    <th>Delete Action</th>
                </tr>
            </thead>
        )
    }


    const handleUpdate = (skill, e) => {
        e.preventDefault();
        if (e.target.innerText === 'Update') {
            navigate(`/editskill/${skill.techId}`, { state: skill })
        } else {
            navigate("/addskill")
        }
    }

    const handleDelete = async skill => {
        try {
            var response = await deleteData(ApiConstants.SKILL_RESOURCE + '/' + skill.techId)
            if (response.status == 200) {
                toastFunctions.showErrorToast(`${skill.technologyName} has been deleted `,1000)
                setSkills(response.data);
            }
        } catch (error) {

        }
    }

    const Status = ({ percent }) => {
        var background;
        var text;
        var color = 'white';

        if (percent == 100) {
            background = '#04AA6D';
            text = 'Completed';
        } else if (percent >= 90) {
            background = 'violet';
            text = 'Almost Completed';
            color = 'black';
        } else if (percent >= 75) {
            background = 'yellow';
            text = 'Well Progressed';
            color = 'black';
        } else if (percent >= 50) {
            background = 'aqua';
            text = 'Partially Completed';
            color = 'black';
        } else if (percent >= 25) {
            background = 'wheat';
            text = 'In Progress';
            color = 'black';
        } else if (percent > 0) {
            background = 'orangered';
            text = 'Just Started';
        } else {
            background = 'gray';
            text = 'Not Started';
        }

        return (
            <div class="column">
                <div class="col" style={{ backgroundColor: background, color, borderRadius: "8px" }}><strong style={{ fontSize: "13px" }}>{text}</strong></div>
            </div>
        );
    }



    const TableBody = () => {
        var mapOutput = skills.map((skill, index) => {
            return (<tr key={index} onClick={()=>console.log(skill)}>
                <td><div className='skillstyle'><strong>{skill.technologyName}</strong></div></td>
                <td style={{ paddingTop: "17px" }}>
                    <ProgressBar width={skill.learningProgress} />
                </td>
                <td style={{ paddingTop: "11px" }}>
                    <Status percent={skill.learningProgress} />
                </td>
                <td><div className="btn btn-primary" onClick={(e) => handleUpdate(skill, e)}>Update</div></td>
                <td><div className="btn btn-danger" onClick={() => handleDelete(skill)} >Delete</div></td>
            </tr>)
        })
        return (
            <tbody>
                {mapOutput.length != 0 ? mapOutput : null}
            </tbody>
        )
    }

    const SkillTable = () => {
        return (
            skills.length != 0 ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-dark table-hover align">
                        <TableHeader />
                        <TableBody />
                    </table>
                </div>
            ) : (
                <div className='no-results'><strong>No Results to display.Please add records</strong></div>
            )
        )
    }

    const BuildTable = () => {
        return (
            <>
                {skills.length >= 5 && <SearchBox text="Skills" handleOnKeyDown={handleOnKeyDown} />}
                <RefreshBox text="Skills" handleRefresh={handleRefresh} />
                <RedisFlush text="skills" handleRefresh={handleRedisFlush} />
                <table className="table table-bordered table-dark table-hover align">
                    <SkillTable />
                </table>
            </>
        );
    };


    return (
        <div>
            {
                loading ? (
                    <div className="loader skill-loader">
                        <div className="spinner"></div>
                        <strong><p style={{ color: "white" }}>Loading...</p></strong>
                    </div>
                ) : (
                    <BuildTable />
                )
            }
            <div style={{ marginTop: "40px" }}>
                <div className="btn btn-success skillNav" onClick={(e) => handleUpdate('', e)} >Create New Skill</div>
                <Link to="/home"><div className="btn btn-primary skillNav">Back to Home</div></Link>
            </div>
            <FooterComponent />
            <ToastContainer />
        </div>
    )
}

export default Skills