import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './apiConfig'
import MovieForm from './shared/MovieForm'
// import Layout from './shared/Layout.js'

class MovieEdit extends Component {
  constructor () {
    super()
    this.state = {
      movie: null,
      updated: null,
      deleted: null
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/movies/${this.props.match.params.id}`)
      this.setState({ movie: res.data.movie })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    // console.log('event-target', event.target.value)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedMovie = Object.assign(this.state.movie, updatedField)
    this.setState({ movie: editedMovie })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.patch(`${apiUrl}/movies/${this.props.match.params.id}`, {
      movie: this.state.movie
    })
      .then(res => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { movie, updated } = this.state
    // console.log('movie', movie)
    let movieJsx = ''
    if (updated) {
      return <Redirect to={/movies/ + this.props.match.params.id}/>
    } else {
      movie ? movieJsx = (
        <MovieForm
          movieInfo={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      ) : movieJsx = 'Loading...'
    }
    return (
      <Fragment>
        <h3>edit page</h3>
        {movieJsx}
      </Fragment>
    )
  }
}

export default MovieEdit
