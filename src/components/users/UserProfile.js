import React, { useEffect, useContext, useState } from "react"
import DefaultProfileImage from "./default_profile_image.jpg"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { PostContext } from "../posts/PostProvider"

export const UserProfile = (props) => {
    const { getUserProfile } = useContext(UserContext)
    const [profile, setProfile] = useState({})
    const [image, setImage] = useState(DefaultProfileImage)
    const [DD, setDD] = useState("00")
    const [MM, setMM] = useState("00")
    const [YYYY, setYYYY] = useState("0000")
    const [articleCount, setArticleCount] = useState(0)

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getUserProfile(userId)
        .then(setProfile)
    }, [])


    useEffect(()=> {
        if(profile !== {}){
            if(profile.date_joined !== undefined){
                const date = profile.date_joined.split('T')[0]
                const [year, month, day] = date.split('-')
                const [dayOne, dayTwo] = day.split('')
                const [monthOne, monthTwo] = month.split('')
                if(dayOne === "0"){
                    setDD(dayTwo)
                }
                else{
                    setDD(day)
                }
                if(monthOne === "0"){
                    setMM(monthTwo)
                }
                else {
                    setMM(month)
                }
                setYYYY(year)
            }
            if(profile.profile_image_url !== null){
                const img = profile.profile_image_url
                setImage(img)
            }
        }
    }, [profile])

    console.log(DD, "DAY OUTSIDE USE EFFECT")
    console.log(MM, "MONTH OUTSIDE USE EFFECT")
    console.log(YYYY, "MONTH OUTSIDE USE EFFECT")

    return (
        <article className="profile">
            <section className="profile__info-left">
                <div className="profile__img">
                    <img className="image" src={image} />
                </div>
                <div className="profile__name">
                    {profile.full_name}
                </div>
            </section>

            <section className="profile__info-right">
                <div className="profile__username">
                    @{profile.username}
                </div>
                <div className="profile__email">
                    Email: {profile.email}
                </div>
                <div className="profile__datejoin">
                    Member Since: {MM}-{DD}-{YYYY}
                </div>
                <div className="profile__type">
                    {profile.is_staff
                    ? "Admin"
                    : "Author"
                    }
                </div>
                <Link
                title={`Article Count ${articleCount}`}
                className="profile__articles"
                to={`/users/posts`} >
                    {articleCount}
                </Link>
            </section>
                <div className="profile__bio">Bio:{profile.bio}</div>
        </article>
    )
}