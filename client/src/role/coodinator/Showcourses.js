import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import DataContext from "../../Usecontactapi";
import Courselist from "./Courselist"; // Import the Courselist component
import computerimage from "../../Pictures/compter2.jpg";
import englishimage from "../../Pictures/book1.jpg";
import tamilimage from "../../Pictures/book2.jpg";
import commerceimage from "../../Pictures/computer3.jpg";

export default function ShowCourses() {
  const [resvalue, setresvalue] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // To handle selected course display

  const { setcourse, setidvalue, setdeleted, setcoornav } =
    useContext(DataContext);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("learning-token"));

    if (!tokenData || !tokenData.token) {
      console.error("No authentication token found");
      return;
    }

    setcourse([]);
    setidvalue([]);
    setcoornav(true);

    axios({
      url: "http://localhost:4000/showcorses",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setresvalue(res.data);
        } else {
          console.log("Response data is not an array");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function showcourselistfn(course) {
    setSelectedCourse(course); // Set the clicked course for display
  }

  return (
    <div className="showcourselist">
      {selectedCourse ? (
        // Render the selected course using Courselist
        <Courselist res={selectedCourse} id={selectedCourse._id} />
      ) : (
        <div className="course-container">
          {resvalue.map((res) => (
            <div key={res._id} onClick={() => showcourselistfn(res)}>
              <div
                className="course-card"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
                  ${
                    res.title.toLowerCase().trim() === "html"
                      ? `url("https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg")`
                      : res.title.toLowerCase().trim() === "css"
                      ? `url("https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-css/sta-je-css.png")`
                      : res.title.toLowerCase().trim() === "next js"
                      ? `url("https://images.ctfassets.net/23aumh6u8s0i/c04wENP3FnbevwdWzrePs/1e2739fa6d0aa5192cf89599e009da4e/nextjs")`
                      : res.title.toLowerCase().trim() === "html basics"
                      ? `url("https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg")`
                      : res.title.toLowerCase().trim() === "css basics"
                      ? `url("https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-css/sta-je-css.png")`
                      : res.title.toLowerCase().trim() === "javascript basics"
                      ? `url("https://www.purshology.com/wp-content/uploads/2019/08/Javascript-810.jpg")`
                      : res.title.toLowerCase().trim() === "nodejs basics"
                      ? `url("https://miro.medium.com/v2/resize:fit:1400/1*ODU5V_oAmYmzvZ1wIw3rDw.png")`
                      : res.title.toLowerCase().trim() === "express js basics"
                      ? `url("https://blog.logrocket.com/wp-content/uploads/2020/12/express-middlewares-complete-guide.png")`
                      : res.title.toLowerCase().trim() === "reactjs bascis"
                      ? `url("https://miro.medium.com/v2/resize:fit:1400/0*y6IcBe5J1AdALzXw.png")`
                      : `url(${tamilimage})`
                  }`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex flex-col justify-center items-center">
                <div className="course-content text-center ">
                  <h2 className="font-bold text-red">{res.title}</h2>
                  <p className="text-black text-shadow">{res.description}</p>
                  <p>{res.language}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
