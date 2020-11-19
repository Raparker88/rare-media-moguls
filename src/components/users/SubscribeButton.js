// Subscribe button only renders if the profile does not belong to the current user
import React, { useContext, useEffect, useState } from "react"
import "./User.css"
import { SubscriptionContext } from './SubscriptionProvider'

export const SubscribeButton = (props) => {
    const { subscriptions, singleSubscription, createSubscription, getAuthorSubscriptionByUser, unsubscribe } = useContext(SubscriptionContext)

    useEffect(() => {
        const authorId = props.profile.id
        if(props.profile.id) {
            getAuthorSubscriptionByUser(authorId)
        }
    }, [props.profile.id])

    const CurrentUserCheck = () => {
        if(!props.profile.is_current_user){
            return (
                <button className="subscribe btn" onClick={()=>{
                    const authorId = props.profile.id
                    if(singleSubscription.hasOwnProperty('message')) {
                        createSubscription({"author_id": authorId})
                            .then(() => 
                            getAuthorSubscriptionByUser(props.profile.id))
                    } else {
                        unsubscribe(singleSubscription.id)
                            .then(() => 
                            getAuthorSubscriptionByUser(props.profile.id))
                    }
                }}>
                    {singleSubscription.hasOwnProperty('message') ?
                    "Subscribe"
                    :
                    "Unsubscribe"}
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