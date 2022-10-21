import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../custom-hooks/useAxiosFetch";

const Tutorial = () => {
  const { id } = useParams();

  const initialTutorialState = ...;
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);

  const { data, loading, error } = useAxiosFetch({
    method: "GET",
    url: "/tutorials/" + id,
  });

  useEffect(() => {
    if (data) {
      setCurrentTutorial(data);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("getting tutorial...");
    }
  }, [loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  // ...

  return (
    <div>
      {currentTutorial ? (
        <div>
          <h4>Tutorial</h4>

          { loading && <p>loading...</p>}

          <form>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          ...

        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;