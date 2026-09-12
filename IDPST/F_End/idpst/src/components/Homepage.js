import { useNavigate } from 'react-router-dom';
import '../styling/Homepage.css';

export const Homepage = () => {
        const navigate = useNavigate();
  return (
    <div className="content">
        <h1 className='heading'>Diabetic<br />Risk<br />Predictor</h1>
        <p className='description'>Get instant insights into your diabetes risk based on your inputs.</p>
        <button className='predictButton' onClick={() => navigate('/predict')}>Start New Prediction</button>
      </div>
  )
}
