import { useEffect, useState } from "react";
import Card from "./Card";
// import { CardApi } from "./CardApi";
import axios from "axios";
function Cards() {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // if use CardApi the use it
  // useEffect(() => {
  //   CardApi().then((users) => setUser(users))

  // }, [])
  useEffect(() => {
    const CardData = async () => {
      try {
        const respone = await axios.get("https://jsonfakery.com/users");
        setUser(respone.data)
      } catch (error) {
        console.log("Error fatcing user", error);

        setError("Faield to load users. Please Try again later");

      } finally {
        setIsLoading(false);
      }
    };
    CardData();
  }, [])
  if (isLoading) return <p className="text-center text-gray-500">Loading Users......</p>
  if (error) return <p className="text-center text-red-600">{error}</p>
  return (
    <>
      <h1 className="font-bold text-3xl text-center p-5">Selected Students</h1>
      {
        user.length === 0 ? (
          <p className="text-center text-gray-500">No Students Available....</p>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
              {user.map((el) => (
                <Card key={el.id} id={el.id} img={el.profile_pic} title={el.first_name} role={el.role} />
              ))}
            </div>
          </div>
        )
      }
    </>
  );
}

export default Cards;
