const FooterComponent = () => {
  return (

    <footer className="bg-secondary text-white py-4">
      <div className="container-fluid text-center">
        <p>&copy; 2026 gratnum. All rights reserved.</p>
        <p>Contact us on the following platforms:</p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/gratnum"
            className="text-white me-3"
          >
            {" "}
            Facebook
          </a>
          <a href="https://www.twitter.com/gratnum" className="text-white me-3">
            {" "}
            Twitter
          </a>
          <a href="https://www.instagram.com/gratnum" className="text-white">
            {" "}
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
