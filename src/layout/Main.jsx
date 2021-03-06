import React from 'react';
import { Movies } from '../components/Movies';
import { Search } from '../components/Search';
import { Preloader } from '../components/Preloader';

const API_KEY_OMDB = process.env.REACT_APP_API_KEY_OMDB;

class Main extends React.Component {
    state = {
        movies: [],
        loading: true
    };

    componentDidMount() {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY_OMDB}&s=matrix`)
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading: false }))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            });
    }

    searchMovies = (str = 'avengers', type = 'all') => {
        this.setState({loading: true})
         str === '' ? (
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY_OMDB}&s=matrix`)
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading: false }))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
            ) : (
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY_OMDB}&s=${str}${
                    type !== 'all' ? `&type=${type}` : ''
                    }`)
                    .then((response) => response.json())
                    .then((data) => this.setState({ movies: data.Search, loading: false }))
                    .catch((err) => {
                        console.error(err);
                        this.setState({loading: false});
                    })
                )
    };

    render() {
        const { movies, loading } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {loading ? <Preloader /> : <Movies movies={movies} />}
            </main>
        );
    }
}

export { Main };