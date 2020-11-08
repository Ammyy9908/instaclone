import React from 'react'
import '../css/suggestion.css'

function suggestion() {
    return (
        <div className="suggestion__meta">
                       <div className="person__detail">
                            <div className="follower__image">
                                <img src="https://randomuser.me/api/portraits/men/4.jpg" alt=""/>
                            </div>
                            <div className="follower__detail">
                                <a href="#/">Follower Name</a>
                                <p>Followed by Mutual and 43 others</p>
                            </div>
                            <div className="follower__link">
                                <a href="#/">Follow</a>
                            </div>
                       </div>
                       <div className="person__detail">
                            <div className="follower__image">
                                <img src="https://randomuser.me/api/portraits/men/4.jpg" alt=""/>
                            </div>
                            <div className="follower__detail">
                                <a href="#/">Follower Name</a>
                                <p>Followed by Mutual and 43 others</p>
                            </div>
                            <div className="follower__link">
                                <a href="#/">Follow</a>
                            </div>
                       </div>
                   </div>
    )
}

export default suggestion
