import profilePic from './assets/profile.jpg'
import './index.css'
function Card(){
return(
    <div className="card">
      <img className="card-image" src={profilePic} alt="profile picture" width={150} />
      <h2 className="card-title">Samuel</h2>
      <p className='card-text'>I am a web developer and play video games</p>
    </div>
);
}

export default Card