import './FooterButton.css'
import {Link} from "react-router-dom"

export default function FooterButton({buttonData}) {
    return (
        <Link to={buttonData.link}>
            <div className="button">
                <img src={buttonData.icon}></img>
                <div>{buttonData.name}</div>
            </div>
        </Link>
    )
}