spotifyApi.token = 'BQB4HcnHHEM8lYCrXfRnz_tJeisxDh_9MJyOh2Fo_WMhAx3Av85OGm8A1xLyAZggzrDa7GoDSt_oAuY5tWwzB9SqfU5dXtt_S_9mKu-i8b6i20ihumDa60ANLrAi8tZ7M1h2Qd1MMv8RqPHduU8'

function Songs({ results }) {
    return <section>
        <ul>
            {results.map(({ name, preview_url }) => <li>
                {name}
                <audio src={preview_url} controls ></audio>
            </li>)}
        </ul>
    </section>

}

function Results({ results, onItemClick }) {
    return <section className="results container" >
        <ul>
            {results.map(({ id, name, images }) => <li key={id} onClick={() => onItemClick(id)}>{name}
                <img className="images" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} alt="artis-image"></img>
            </li>)}
        </ul>
    </section>
}

class Search extends React.Component {
    state = { query: '' }

    handleQuery = ({ target: { value: query } }) => this.setState({ query })

    handleSearchSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleQuery, handleSearchSubmit } = this

        return <section className="search container col-6">
            <h1 className="title">Spotify App</h1>
            <form className="register__form p-2" onSubmit={handleSearchSubmit}>
                <h4 className="font-weight-light-normal">Search</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend"></div>
                </div>
                <input type="text" placeholder="Search an artist..." onChange={handleQuery} />
                <button type="submit">Search</button>
            </form>
        </section >
    }
}

class Home extends React.Component {
    state = { artists: null, albums: null, songs: null, artistVisible: false, albumsVisible: false, songsVisible: false }

    handleSearch = query => logic.searchArtists(query, (error, artists) => {
        if (error) console.error(error)
        else this.setState({ artistVisible: true, albumsVisible: false, songsVisible: false, artists: artists.map(({ id, name, images }) => ({ id, name, images })) })

    })

    handleArtistSelected = id => logic.retrieveAlbums(id, (error, albums) => {
        if (error) console.error(error)
        else this.setState({
            artistVisible: false, albumsVisible: true, songsVisible: false,
            albums: albums.map(({ id, name, images }) => ({ id, name, images }))
        })
    })

    handleAlbumSelected = id => logic.retrieveTracks(id, (error, tracks) => {
        console.log(tracks)
        if (error) console.error(error)
        else this.setState({
            artistVisible: false, albumsVisible: false, songsVisible: true,
            songs: tracks.map(({ name, preview_url }) => ({ name, preview_url }))
        })
    })

    render() {
        return <section className="home container">
            <Search onSearch={this.handleSearch} />
            {this.state.artistVisible && this.state.artists && <Results results={this.state.artists} onItemClick={this.handleArtistSelected} />}
            {this.state.albumsVisible && this.state.albums && <Results results={this.state.albums} onItemClick={this.handleAlbumSelected} />}
            {this.state.songsVisible && this.state.songs && <Songs results={this.state.songs} />}
        </section>
    }
}

class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleName = (event) => {
        const name = event.target.value
        this.setState({ name })
    }

    handleSurname = (event) => {
        const surname = event.target.value
        this.setState({ surname })
    }

    handleEmail = (event) => {
        const email = event.target.value
        this.setState({ email })
    }

    handlePasword = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handlePasswordConfirmation = (event) => {
        const passwordConfirmation = event.target.value
        this.setState({ passwordConfirmation })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onHandleSubmit(this.state.name, this.state.surname, this.state.email, this.state.password, this.state.passwordConfirmation)
    }

    handlePageChange = (event) => {
        event.preventDefault()
        this.props.changePageFunc()
    }

    render() {
        return <section className="register container col-6">
            <h1 className="title">Spotify App</h1>
            <form className="register__form p-2" onSubmit={this.handleSubmit}>
                <h4 className="font-weight-light-normal">Register</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Name</label>
                    </div>
                    <input className="form-control" type="text" name="name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" required onChange={this.handleName} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Surame</label>
                    </div>
                    <input className="form-control" type="text" name="surname" required onChange={this.handleSurname} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required onChange={this.handleEmail} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="text" name="password" required onChange={this.handlePasword} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Confirm password</label>
                    </div>
                    <input className="form-control" type="text" name="password-confirmation" required onChange={this.handlePasswordConfirmation} />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={this.handlePageChange}><strong>Login</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Register</strong></button>
            </form>
        </section>
    }
}

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailChange = (event) => {
        const email = event.target.value
        this.setState({ email }) // this.setState({email: email })
    }

    handlePasswordChange = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.onHandleSubmit(this.state.email, this.state.password)
    }

    handlePageChange = (event) => {
        event.preventDefault()
        this.props.changePageFunc()
    }

    render() {
        return <section className="login container col-6">
            <h1 className="title">Spotify App</h1>
            <form className="login__form p-2" onSubmit={this.handleSubmit} >
                <h4 className="font-weight-light-normal">Login</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required onChange={this.handleEmailChange} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="password" name="password" required onChange={this.handlePasswordChange} />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={this.handlePageChange}><strong>Register</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Login</strong></button>
            </form>
        </section>
    }
}

class App extends React.Component {
    state = { loginVisible: true, registerVisible: false, homeVisible: false }

    handleClickRegisterButton = () => {
        this.setState({ loginVisible: false, registerVisible: true });
    };

    handleClickLoginButton = () => {
        this.setState({ loginVisible: true, registerVisible: false });
    };

    handleLogin = (thisEmail, thisPassword) => {
        try {
            logic.login(thisEmail, thisPassword, (user) => {

                this.setState({ loginVisible: false, homeVisible: true })

            })
        } catch (error) {
            console.log(error.message)
        }

    }

    handleRegister = (thisName, thisSurname, thisEmail, thisPassword, thisPasswordConfirmation) => {
        try {
            logic.register(thisName, thisSurname, thisEmail, thisPassword, thisPasswordConfirmation, () => {
                this.setState({ loginVisible: true, registerVisible: false })
            })
        } catch (error) {
            console.log(error.message)
        }

    }

    render() {
        return <div>
            {this.state.loginVisible && <Login onHandleSubmit={this.handleLogin} changePageFunc={this.handleClickRegisterButton} />}
            {this.state.registerVisible && <Register onHandleSubmit={this.handleRegister} changePageFunc={this.handleClickLoginButton} />}
            {this.state.homeVisible && <Home />}
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))