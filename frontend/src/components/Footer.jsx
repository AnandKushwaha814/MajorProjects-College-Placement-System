import { Link } from "react-router-dom"
const Footer = () => {
  const getYear = () => new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-4 ">
      © {getYear()} AGC Placement System <span className="font-bold" >
        <Link to="https://agcamritsar.in/" className="link-light no-underline" target="_blank">AGC</Link>
      </span>
    </footer>
  );
};

export default Footer;
