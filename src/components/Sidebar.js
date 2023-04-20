import React from 'react'
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="Sidebar">
            <form className="Weather">
                <strong>Weather</strong>
                <br/>
                <input type="radio" value="Sunny" name="weather"/>Sunny
                <br/>
                <input type="radio" value="Overcast" name="weather"/>Cloudy
                <br/>
                <input type="radio" value="Raining" name="weather"/>Raining
                <br/>
            </form>
            <form className="Cost">
                <strong>Cost</strong>
                <br/>
                <input type="radio" value="Sunny" name="weather"/>0-10
                <br/>
                <input type="radio" value="Overcast" name="weather"/>11-20
                <br/>
                <input type="radio" value="Raining" name="weather"/>21-50
                <br/>
                <input type="radio" value="Raining" name="weather"/>50+
                <br/>
            </form>
        </div>
    )
}

export default Sidebar;