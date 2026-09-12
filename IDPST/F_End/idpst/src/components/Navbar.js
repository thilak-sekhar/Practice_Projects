import '../styling/Navbar.css';

export const Navbar = () => {
  return (
    <div className="main-container">
      <header className="navbar">
        <h3>Intelligent Diabetic Prediction Support Tool</h3>
        <nav>
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
          <a href="#plg">PLG</a>
        </nav>
      </header>
    </div>
  );
};
