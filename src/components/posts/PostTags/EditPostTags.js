import React, {useState, useEffect} from "react"

export const EditPostTags = (props) => {
    const [checked, setChecked] = useState(false);
    const tagId = props.tag.id
    const postTagIds = props.postTagIds

    useEffect(() => {
        if (postTagIds.indexOf(tagId) > -1) {
            setChecked(true)
        }
    }, [postTagIds]); 


    return (
        <div className="modify-tags-container">
            <label>
                <input type="checkbox" id="first-tag" checked={checked} onClick={() => setChecked(!checked)}></input>
                {props.tag.tag}
            </label>
        </div>
    )
}