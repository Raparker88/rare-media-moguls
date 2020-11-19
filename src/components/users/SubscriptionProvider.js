import React, { useState, useEffect } from "react"
export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])

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

    const getAuthorSubscriptionByUser = author => {
        return fetch("http://localhost:8000/subscriptions/get_single_current_subscription",
        { params: {author_id: author}},
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(setSubscriptions)
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
            getAllSubscriptionsByUser()
            return newsubscription.id })
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
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}