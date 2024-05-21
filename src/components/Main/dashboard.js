import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link} from "react-router-dom";
import { Particles } from "../particles";


function Dashboard(){
    const [meetingTitle, setMeetingTitle] = useState('')  
    const user = JSON.parse(sessionStorage.getItem("UserData"))
    const [meetings, setMeetings] = useState([])
    //const [meetingPrompt, setMeetingPrompt] = useState(null)
    const user_id = user.user_id
    const meetingLink = useRef(null)
    const url = 'https://ksustify.netlify.app/room/';

    const getMeetings = () =>{
        axios.get('https://kserver.okelamedia.com/api/get-meetings').then(res =>{
            if(res.data.success){
                setMeetings(res.data.meetings)
            }
        })
    }
    useEffect(()=>{
        getMeetings();
    }, [])  
    
    function copyLink(){
      meetingLink.current.select()
      navigator.clipboard.writeText(meetingLink.current.value).then(() =>{
        alert("copied: " + meetingLink.current.value)
      }).catch((err) =>{
        console.log(err)
      })
    }

    function addNewMeeting(e){
        e.preventDefault()
        axios.post('https://kserver.okelamedia.com/api/new-meeting', {meetingTitle:meetingTitle, user_id:user_id}).then(res =>{
            if(res.data.success){
                alert(res.data.msg)
                getMeetings();
            }
            else{
                alert("Failed to Create Meeting")
            }
        })
    }
    return(
        <div className="main">
            <Particles />
            <div className="dashboard-header">
                <div></div>
                <div>
                    <img className='logo2' src='/images/ksustify.png' alt='logo' />
                </div>
                <div></div> 
            </div>
            <div className="dashboard-body">
                <div></div>
                <div className="d-body-main">
                    <div className="welcome">
                        <div>
                            <b>Hello, {user.firstName}</b>
                        </div>
                        <div className="links">
                            <Link to="/logout">Logout&#8594;</Link>  
                            
                        </div>
                    </div>
                    <div className="meetings">
                        <div className="new-meeting">
                            <form onSubmit={addNewMeeting}>
                                <label>Meeting Title: </label>
                                <input type="text" name="meetingTitle" required onChange={(e) =>setMeetingTitle(e.target.value)} />
                                <button type="submit" role="submit">Create Meeting</button>
                            </form>
                        </div>
                        <div></div>
                        <table className="existing-meetings">
                            <caption>Your Meetings</caption>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Meeting Title</th>
                                    <th>Meeting ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                                {
                                    meetings.length > 0 ?
                                    <tbody>
                                        {
                                            meetings.map((meeting, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}.</td>
                                                <td>{meeting.meeting_title}</td>
                                                <td>{meeting.meeting_id}</td>
                                                <td>
                                                    <input type="hidden" ref={meetingLink} value={url + meeting.meeting_id} />
                                                    <button className="copy-btn" onClick={copyLink}>Copy Link</button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        
                                    </tbody>:
                                    <tbody>
                                        <tr>
                                            <td colSpan={4}>No Meetings Added Yet</td>
                                        </tr>
                                    </tbody>
                                    
                                    
                                }

                        </table>
                    </div>
                    
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Dashboard;