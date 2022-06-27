import TopSpacer from '../../../views/Header/TopSpacer'
import {useEffect,useState} from 'react';
import urlcat from "urlcat";
import {BACKEND} from "../../../utils/utils"

export default function FormDataDisplay () {
    const [userData, setUserData] = useState([]);
    console.log(BACKEND)
    useEffect(()=> {
        fetch(urlcat(BACKEND, "/api/users/"))
            .then((response) => response.json())
            .then((data) => {
                setUserData(data)
                console.log(data)
            })
            .catch(error => console.log(error))
    },[]);

    console.log(userData)


    return (
        <>
            <TopSpacer/>
            <div>
                Display Data
            </div>
            {
                userData[0] === undefined ?
                <div>Nothing</div>
                :
                <>
                    <div>Username: {userData[0].username}</div>
                    <div>Email: {userData[0].email}</div>
                    <div>Password: {userData[0].password}</div>
                </>
            }
        </>
        
    )
}