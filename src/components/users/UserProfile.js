import React, { useEffect, useContext, useState } from "react"
import DefaultProfileImage from "./default_profile_image.jpg"
import { UserContext } from "./UserProvider"


export const UserProfile = (props) => {
    const { getUserProfile } = useContext(UserContext)
    const [profile, setProfile] = useState({})
    const [image, setImage] = useState(DefaultProfileImage)
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getUserProfile(userId)
        .then(setProfile)
    }, [])

    useEffect(()=> {
        if(profile !== {} && profile.date_joined !== undefined){
            const date = profile.date_joined
            setDate(date.split('T')[0])
            if(profile.profile_image_url !== null){
                const img = profile.profile_image_url
                setImage(img)
            }
            if(profile.is_staff){
                setType("Admin")
            }
            else{
                setType("Author")
            }
        }
    }, [profile])

    return (
        <article className="profile">
            <section className="profile__info">
                <div className="profile__img">
                    <img className="image" src={image} />
                </div>
                <div className="profile__name">
                    {profile.full_name}
                </div>
                <div className="profile__username">Username: @{profile.username}</div>
                <div className="profile__email">Email: {profile.email}</div>
                <div className="profile__datejoin">Member Since: {date}</div>
                <div className="profile__type">Type: {type}</div>
                <div className="profile__bio">Bio:{profile.bio}</div>
            </section>
        </article>
    )
}