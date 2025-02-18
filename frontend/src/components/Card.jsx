/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function Card({ id, img, title, role }) {
  const navigate = useNavigate();
  const viewMore = () => {
    navigate(`/user/${id}`);
  }
  return (
    <>
      <div className="w-80 bg-blue-400 shadow-lg rounded-lg overflow-hidden custom-shadow2">
        <img src={img} alt="Card image" className="w-full h-65 object-cover" />
        <div className="p-4">
          <h5 className="text-lg font-semibold">{title}</h5>
          <p className="text-sm mt-2 text-justify text-white">
            {role}
          </p>
          <button onClick={viewMore} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg custom-shadow3 rounded-5 cursor-pointer hover:bg-green-500">
            View More
          </button>
        </div>
      </div>
    </>
  )
}

export default Card