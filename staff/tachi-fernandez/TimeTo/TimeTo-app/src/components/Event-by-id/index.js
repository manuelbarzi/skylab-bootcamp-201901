import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import ListComments from '../List-comments'
import CreateComment from '../Create-comment'
import './index.css'

import Event from '../../plugins/bus'

class EventById extends Component {
    state = { events: '', eventId: '', user: null, button: false, y : '',m : '', d : '' , h : '', min: '' , s:'',members : []  }
    componentDidMount() {
        this.listEvents()
    }

    listEvents(){
        const { match: { params: { eventId = '' } } } = this.props
        try {
            logic.listEventById(eventId)
                .then(_events => {
                    this.setState({ events: _events , members: _events.memebrs})
                    const date = new Date(_events.date);
                        this.setState({y: date.getFullYear()});
                        this.setState({m : date.getMonth() + 1});
                        this.setState({d : date.getDate()});
                    return logic.retrieveUser()
                        .then(user => {
                            this.setState({ user }, () => {
                                _events.members.some(member => member._id === user.id) ?
                                 this.setState({ button: true }) : 
                                 this.setState({ button: false })
                                console.log(_events.members.some(member => member._id === user.id))
                            })
                        })

                })
                .catch(({ error }) => {
                    this.setState({ events: null })
                })
        } catch ({ message }) {
            this.setState({ events: null })
        }
    }

    handleCreateComment = (eventId, text) => {
        try {
            logic.createComment(eventId, text)
                .then(() => {
                    Event.$emit('updateComments', [])

                })
                .catch(({ message }) => {
                    this.setState({ registerFeedback: message })
                })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    toogleEvent = (eventId) => {
        try {
            logic.toogleEvent(eventId)
                .then(response => {
                    this.listEvents()
                })
                .catch(({ message }) => {
                    this.setState({ registerFeedback: message })
                })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

 



    render() {
        const { handleCreateComment, toogleEvent, state: { events, button, y, m, d}, props: { match: { params: { eventId = '' } } } } = this
        
        return (
            <section className="event">
                <div className="event__card" >
                        <div  className="event__card-container"  >
                        {events.category && <img className="event__card-container-img" src={events.category.image} alt={events.title} /> }
                        <p className="event__card-container-category">{events.category && events.category.name}</p>
                        </div>
                    <div className="event__card-title">
                        <h2 className="event__card-title-h2">{events.title}</h2>
                    </div>
                    

                    

                    <div className="event__card-description">
                        <p className="event__card-description-paragraph">{events.description}</p>
                    </div>

                    <div className="event__card-dateAndUbication" >

                        <p className="event__card-dateAndUbication-date">Date: {`${y} / ${m} / ${d} `}</p>

                        <p className="event__card-dateAndUbication-city">{events.city}</p>

                        <p className="event__card-dateAndUbication-address">{events.address}</p>

                    </div>


                    <div className="event__card-creathor">
                        <label className="event__card-creathor-label" >By</label>
                            <Link className="event__card-creathor-paragraph" to={`/${events.author && events.author.userName}`} >
                                <p>{events.author && events.author.userName}</p>
                            </Link>
                    </div>
                    
                    </div>

                    <div>
                        <label>Members:</label>

                        <div className="event__members" >
                        {events.members && (events.members || []).map(member => (
                                <div>
                                <Link type="text" className="event__members-link" to={`/${member.userName}/${member._id}`}>
                                    <div className="event__members-container">
                                    <img className="event__members-container-img" src={member.image} alt={member.name} />
                                    </div>
                                    <div className="event__members-container-username">
                                        <h2>{member.userName}</h2>
                                    </div>
                                </Link>
                                </div>

                                )
                            )}
                        </div>
                        <div>
                            {(button === true) ? <button className="event__members-container-button-enter" onClick={() => toogleEvent(eventId)}>Salir</button> : <button className="event__members-container-button-exit" onClick={() => toogleEvent(eventId)}>Entrar</button>}
                        </div>

                {/* <div>
                    <Link to="/home">Go home</Link>
                    <Link to={`/category/${events.category && events.category.id}`}>Go category</Link>
                </div> */}
                    </div>
                <CreateComment eventId={eventId} onCreateComment={handleCreateComment} />
                <ListComments eventId={eventId} />
            </section>
        )
    }
}

export default EventById