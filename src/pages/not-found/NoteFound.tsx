import { Link } from "react-router-dom";
// import logoImg from "../../images/logo.png";

function NotFound() {
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center px-4 py-3 bg-white shadow"
      >
        {/* logo */}
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            {/* <img src={logoImg} alt="" /> */}
            <span className="d-none d-lg-block">Dada Bora</span>
          </Link>
        </div>
      </header>
      {/* Not Found Page Content */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#012970]">404</h1>
          <p className="mt-4 text-2xl text-[#012970]">Page non trouvéé</p>
          <p className="mt-2 text-gray-800">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-4 py-3 bg-[#012970] text-white rounded hover:bg-blue-800 transition duration-300"
          >
            {/* <CircleArrowLeft size={20} className="inline mr-2" /> */}
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
}

export default NotFound;
