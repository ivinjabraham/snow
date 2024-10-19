import '../components/style/landing-button.css'

import { useNavigate } from 'react-router-dom';

const LandingButton: React.FC = () => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/gallery'); 
    };

    return (
        <button className="button button--nina button--text-thick button--text-upper button--size-s" data-text="Start" onClick={handleClick}>
            <span>S</span>
            <span>T</span>
            <span>A</span>
            <span>R</span>
            <span>T</span>
        </button>
    );
  };
  
  export default LandingButton;