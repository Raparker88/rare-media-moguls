import React, { useState, useEffect } from "react"
export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])
    const [singleSubscription, setSingleSubscription] = useState({})

    const getAllSubscriptionsByUser = () => {
        return fetch("http://localhost:8000/subscriptions", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setSubscriptions)
    }

    const getAuthorSubscriptionByUser = (author) => {
        return fetch(`http://localhost:8000/subscriptions/${author}/get_single_current_subscription`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(setSingleSubscription)
    }

    const createSubscription = subscription => {
        return fetch("http://localhost:8000/subscriptions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        })
        .then(res => res.json())
        .then(newsubscription => {
            getAuthorSubscriptionByUser(newsubscription.author.id)
                .then(console.warn(subscriptions))
            return newsubscription.id })
    }

    const unsubscribe = (subscriptionId) => {
        return fetch(`http://localhost:8000/subscriptions/${ subscriptionId }/unsubscribe`, {
            method: "PATCH",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(() => {setSingleSubscription({})})
    }

useEffect(()=>{
    getAllSubscriptionsByUser()
}, [])

    return (
        <SubscriptionContext.Provider value={{
            subscriptions,
            createSubscription,
            getAllSubscriptionsByUser,
            getAuthorSubscriptionByUser,
            unsubscribe,
            singleSubscription
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}