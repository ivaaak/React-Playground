import React, { useState, useEffect } from "react";
import { useAxiosFetch } from "../custom-hooks/useAxiosFetch";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const { fetchData, data, loading, error } = useAxiosFetch({
    method: "GET",
    url: "/tutorials",
    params: {
      title: searchTitle,
    },
  });

  useEffect(() => {
    if (data) {
      setTutorials(data);
      console.log(data);
    } else {
      setTutorials([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving tutorials...");
    }
  }, [loading]);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const findByTitle = () => {
    fetchData();
  };

  // ...

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />

        <button type="button" onClick={findByTitle} >
          Search
        </button>
      </div>

      <div>
        <h4>Tutorials List</h4>

        {loading && <p>loading...</p>}

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li key={index} >
                {tutorial.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TutorialsList;