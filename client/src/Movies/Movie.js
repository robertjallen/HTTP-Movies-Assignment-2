import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
// import EditForm from "./Update";

function Movie(props) {
  console.log("Movie", props)
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const edit = (ID) => {
    // let history = useHistory();
    props.history.push(`/update-movie/${ID}`);
  }

  const deleteMovie = (id) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log("delete response", res)
      let newList = props.movieList.filter((item)=> {
        return item.id !== res.data 
      })
      
      props.setMovieList(newList)

      props.history.push('/')
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit" onClick={() => edit(movie.id)}>Edit</div>
      <div className="delete" onClick={() => deleteMovie(movie.id)}>Delete</div>
    </div>
  );
}

export default Movie;
