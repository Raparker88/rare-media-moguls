// Subscribe button only renders if the profile does not belong to the current user
import React, { useContext, useEffect, useState } from "react"
import "./User.css"
import { SubscriptionContext } from './SubscriptionProvider'

export const SubscribeButton = (props) => {
    const { subscriptions, createSubscription, getAuthorSubscriptionByUser } = useContext(SubscriptionContext)
    const [activeSubscription, setIsActive] = useState({})

    useEffect(() => {
        const authorId = props.profile.id
        getAuthorSubscriptionByUser(authorId)
        .then(setIsActive)
        .then(console.warn(activeSubscription))
    }, [])

    const CurrentUserCheck = () => {
        if(!props.profile.is_current_user){
            return (
                <button className="subscribe btn" onClick={()=>{
                    const authorId = props.profile.id
                    console.warn(authorId)
                    getAuthorSubscriptionByUser(authorId)
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