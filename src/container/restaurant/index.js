import React, {useState} from "react";
import { useLocation} from "react-router-dom";
import Service from "../../core/service";
import { RESTAURANT_PATH } from "../../core/constants";
import { FaStar } from 'react-icons/fa';

function AboutRestaurant() {
    const location = useLocation();
    const [feedback, setFeedback] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const {restaurant} = location.state;


    const leaveFeedback = () => {
        Service.request(
            RESTAURANT_PATH, 
            restaurant.id,
            'POST',
            JSON.stringify(feedback),
            console.log("ok"),
            (error) => console.log(error)
        )
        setFeedbacks([...feedbacks, feedback]);
        setFeedback("");
    }

        return (
        <div className="container about">
            <h1>About Us </h1>
            <h2>{restaurant.name}</h2>
            <div>
                {[...Array(restaurant.rate)].map((v, id) => {        
                    return (         
                        <FaStar color="orange" key={id}/>       
                    );
                })}
            </div>
            <p>{restaurant.description}</p>
            {feedbacks.map((feedback, index) => <p><span>{index + 1}.</span>{feedback}</p>)}
            <textarea
                onChange={(e) => setFeedback(e.target.value)}
                name="feedback"
                value={feedback}
            />
            <button onClick={leaveFeedback} className="button">Leave feedback</button>
        </div>
    )
}

export default AboutRestaurant