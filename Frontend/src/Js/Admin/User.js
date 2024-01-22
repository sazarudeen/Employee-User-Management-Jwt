import React, { useState, useEffect } from 'react'
import FooterComponent from '../../FooterComponent'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ApiConstants from '../Constants/Endpoints';
import $ from 'jquery'
import { deleteData, fetchData } from '../Client/AxiosClient';
import RefreshBox from '../SearchComponents/RefreshComponent';
import SearchBox from '../SearchComponents/SearchComponent';
import RedisFlush from '../SearchComponents/RedisFlushComponent';
import { toastFunctions } from '../Status/StatusBar';
import { ToastContainer } from 'react-toastify';

const User = ({ setMiddle }) => {

    const navigate = useNavigate();
    setMiddle('Users')
    var dynamicClass = ''
    var [users, setUsers] = useState([])
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetchDataFromServer();
        }, 300);
    }, [])


    const fetchDataFromServer = async () => {
        try {
            var response;
            response = await fetchData(ApiConstants.ADMIN_RESOURCE)
            if (response.status == 200) {
                if (response.data.length != 0) {
                    if (location.state != null) {
                        if (location.state['status'] = 'Success') {
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
                    setUsers(response.data)
                }
                setLoading(false);
            }
        } catch (error) {

        }
    }


    const handleOnKeyDown = e => {
        if (e.keyCode == 13) {
            const searchedValue = $("#searchBox").val();
            const filteredUsers = users.filter(user => {
                const userName = user.username.toLowerCase();
                const searchedValueLower = searchedValue.toLowerCase();
                const partialMatch = userName.includes(searchedValueLower);
                const caseSensitiveMatch = userName === searchedValue;
                const caseInsensitiveMatch = userName.toLowerCase() === searchedValueLower;
                return partialMatch || caseSensitiveMatch || caseInsensitiveMatch;
            });

            setUsers(filteredUsers);
        }
    }

    const handleRefresh = () => {
        setLoading('true');
        setTimeout(() => {
            fetchDataFromServer();
        }, 300)
    }


    const getRoles = roles => {
        const buildedRoles = roles.map(role => <div className='role'>{role}</div>)
        if (buildedRoles.length == 2) {
            dynamicClass = 'align_' + buildedRoles.length
        } else {
            dynamicClass = ''
        }
        return (
            <div id='roleContainer'>{buildedRoles}</div>
        )
    }

    const UserTableBody = () => {
        var mapOutput = users.map((user, index) => {
            return (<tr key={index}>
                <td><div className='userstyle'><strong>{user.username}</strong></div></td>
                <td style={{ paddingTop: "17px" }}>
                    <div className='userstyle'><strong>***********</strong></div>
                </td>
                <td style={{ paddingTop: "17px" }}>
                    <div className='userstyle'><strong>{getRoles(user.roles)}</strong></div>
                </td>
                <td><div className={`btn btn-primary ${dynamicClass}`} onClick={(e) => handleUpdate(user, e)}>Update</div></td>
                <td><div className={`btn btn-danger  ${dynamicClass}`} onClick={() => handleDelete(user)} >Delete</div></td>
            </tr>)
        })
        return (
            <tbody>
                {mapOutput.length != 0 ? mapOutput : null}
            </tbody>
        )
    }

    const UserTable = () => {
        return (
            users.length != 0 ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-dark table-hover align">
                        <UserTableHeader />
                        <UserTableBody />
                    </table>
                </div>
            ) : (
                <div className='no-results'><strong>No Users found.Please add Yours..</strong></div>
            )
        )
    }

    const handleRedisFlush = async () => {
        try {
            var response = await fetchData(ApiConstants.ADMIN_RESOURCE + '/flush')
            if (response.status == 200 && response.data) {
                toastFunctions.showInfoToast('User Data has been flushed out in Redis,Click on the refresh Users button for fresh data', 3000)
            } else {
                toastFunctions.showErrorToast('Something wrong in redis flush', 1000)
            }
        } catch (error) {
            console.log('Error occured in redis flush ', error)

        }
    }


    const BuildUserTable = () => {
        return (
            <>
                {users.length >= 5 && <SearchBox text="Users" handleOnKeyDown={handleOnKeyDown} />}
                <RefreshBox text="Users" handleRefresh={handleRefresh} />
                <RedisFlush text="users" handleRefresh={handleRedisFlush} />
                <UserTable />
            </>
        );
    }

    const handleUpdate = (user, e) => {
        e.preventDefault();
        if (e.target.innerText === 'Update') {
            navigate(`/edituser/${user.id}`, { state: user })
        } else {
            navigate("/adduser")
        }
    }

    const handleDelete = async user => {
        try {
            var response = await deleteData(ApiConstants.ADMIN_RESOURCE + '/' + user.id)
            if (response.status == 200) {
                toastFunctions.showErrorToast(`User ${user.username} has been deleted `, 1000)
                fetchDataFromServer();
            }
        } catch (error) {

        }
    }

    const UserTableHeader = () => {
        return (
            <thead className="thead-dark">
                <tr>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>User Roles</th>
                    <th>Update Action</th>
                    <th>Delete Action</th>
                </tr>
            </thead>
        )
    }
    return (
        <div>
            {
                loading ? (
                    <div className="loader user-loader">
                        <div className="spinner"></div>
                        <strong><p style={{ color: "white" }}>Loading...</p></strong>
                    </div>
                ) : (
                    <BuildUserTable />
                )
            }
            <div style={{ marginTop: "50px" }}>
                <div className="btn btn-success userNav" onClick={(e) => handleUpdate('', e)} >Create New user</div>
                <Link to="/home" style={{ marginLeft: "30px" }}><div className="btn btn-primary userNav">Back to Home</div></Link>
            </div>
            <ToastContainer />
            <FooterComponent />
        </div>
    )
}

export default User