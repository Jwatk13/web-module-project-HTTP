import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


//this is what we need to update our state for movie deletion
//filter recieves logic that looks at the id that we provide when we click the delete button and matches that id to the correct movie in the database so we can delete the proper one and it is recorded in state.
  const deleteMovie = (id)=> {
    setMovies(movies.filter(item => 
      item.id !== id
    ));
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/add">
              <AddMovieForm />
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm  setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              {/* //Now to pass in our delete movie function to the component that needs it */}
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

