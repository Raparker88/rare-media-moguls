// Subscribe button only renders if the profile does not belong to the current user
import React from "react"
import "./User.css"

export const SubscribeButton = (props) => {

    const CurrentUserCheck = () => {
        if(!props.profile.is_current_user){
            return (
                <button className="subscribe btn" onClick={()=>{
                    // conditional logic for subscribe and unsubscribe
                    return
                }}>
                    {/* turnery statement for subscribe and unsubscribe */}
                    Subscribe
                </button>
            )
        }
        else{
            return null
        }
    }

    return (
        <>
        <CurrentUserCheck />
        </>
    )
}