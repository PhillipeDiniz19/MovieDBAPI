import React from 'react';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from './components/Button/Button';



class App extends React.Component {
  state ={
    movies: [],
    allMovies: [],
    page: 0,
    MoviesPerPage: 5,
    searchValue: ''
  }
  
  componentDidMount() {
    this.loadFilms();
  }
  loadFilms = async () => {
    const {page, MoviesPerPage} = this.state
    const moviesResponse = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=f050ec0b7855de2a4c5e0d9aeaec97a4');
    const moviesData = await moviesResponse.json();
      const postPerPage = moviesData.results
      this.setState({ 
        movies: postPerPage.slice(page, MoviesPerPage) ,
        allMovies: moviesData.results
      });
  };

  loadMoreMovies = () => {
    const {
      page,
      allMovies,
      MoviesPerPage,
      movies
    } = this.state

    const nextPage = page + MoviesPerPage;
    const nextPosts = allMovies.slice(nextPage, nextPage + MoviesPerPage);
    movies.push(...nextPosts);

    this.setState({movies, page:nextPage})
   
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }
  
  
  render() {
    const { movies, page, MoviesPerPage, allMovies, searchValue } = this.state;
    const noMoreMovies = page + MoviesPerPage >= allMovies.length;
    const filteredMovies = !!searchValue ? 
      allMovies.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase());
      }) 
      :
      movies
    return (
      <div className="App">
          <div className="search-bar-container">
           {!!searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
           )} 
              <input type="search"
              className='buttonSearch'
              onChange={this.handleChange}
              value={searchValue} 
              placeholder='Typer your search...'
              />
          </div>  
            <section className="container">       
                <div className="posts">
                {filteredMovies.length > 0 && (
                  filteredMovies.map(movie => (
                      <div key={movie.id} className="post">
                          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                          <div className="post-content">
                              <h1>{movie.title}</h1>
                              <p className='average'><FaStar color='black' /> {movie.vote_average}</p>
                              <button type='submit' className='btn-description'>
                                  <Link to={`/movie/${movie.id}`}>Descrição</Link>
                              </button>
                          </div>
                      </div>
                  ))
              )}
                {filteredMovies.length === 0 && (
                   <p>Filme Não encontrado...</p>
                )}
                </div>
                <div className="button-container">
                  {!searchValue && (
                    <Button 
                        text="Load more movies"
                        onClick={this.loadMoreMovies}
                        disabled={noMoreMovies}
                      /> 
                  )}    
                </div>
              </section>
      </div>
    );
  }
}

export default App;
