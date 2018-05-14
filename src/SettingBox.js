import React from 'react'
// import ReactDOM from 'react-dom'
import './css/setting-style.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { TableList } from './TableList.js'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    signIn = (username, password) => {
        this.setState({
            username: username,
            password: password
        })
    }

    signOut = () => {
        this.setState({
            username: null, password: null
        })
    }

    handleSignIn = (e) => {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        if (!username && !password) {
            alert('invalid input')
        } else {
            // TODO: check match in DB
            // then signIn
            this.signIn(username, password)
        }
    }



    render() {
        const chkLogin = this.state.username ? <div>Welcome, {this.state.username} <button onClick={this.signOut}>Logout</button></div> :
            <div>
                <form onSubmit={this.handleSignIn}>
                    <span>Login </span>
                    <input type="text" ref="username" placeholder="username" style={{ margin: 3 }} />
                    <input type="password" ref="password" placeholder="password" style={{ margin: 3 }} />
                    <input type="submit" value="Login" style={{ margin: 5 }} />
                </form>
            </div>

        return (
            <div className='loginbox'>
                {chkLogin}
            </div>
        )
    }
}

export class SettingBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dateSelect: moment(),
            topic: 'Twitter',
            type: 'all',
            date_show: moment().format('ddd MMM DD'),
            exp: 0,
            name: '',
            visibleSignUp: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDrop = this.handleDrop.bind(this)
    }

    handleChange(date) {
        // Sat Mar 31 15:28:15 2018
        var parse_date = moment(date).format('ddd MMM DD')

        this.setState({
            dateSelect: date,
            date_show: parse_date
        });
    }

    handleDrop(event) {
        this.setState({
            type: event.target.value
        })
        console.log(event.target.value)

    }

    toggleSignUp = () => {
        this.setState({
            visibleSignUp: !this.state.visibleSignUp
        })
    }

    hangleSignUp = (e) => {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        if (!username && !password) {
            alert('invalid register input')
        } else {
            // TODO: save to DB
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            this.toggleSignUp()
        }
    }

    render() {
        const chkSignUp = this.state.visibleSignUp ? <div className='signupbox'>
            <form onSubmit={this.hangleSignUp}>
                <span>SignUp </span>
                <br />
                <input type="text" ref="username" placeholder="username" style={{ margin: 3 }} />
                <input type="password" ref="password" placeholder="password" style={{ margin: 3 }} />
                <input type="submit" value="Submit" style={{ margin: 5, width: 100 }} />
            </form>
        </div> : <div className='divbtnRegister'><button className='btnRegister' onClick={this.toggleSignUp}>Register</button></div>

        return (
            <div>
                <div className='settingbox'>
                    <div className='setting-div-head'>
                        <span className='setting-text-head'>Setting</span>
                    </div>
                    <div style={{ float: "right" }}>
                        < LoginForm />
                        {chkSignUp}
                    </div>
                    <div className='setting-all'>
                        <span className='setting-text-type-social'>Type of Social Media</span>
                        <select>
                            <option value="twt">Twitter</option>
                            <option value="fb" disabled>Facebook (coming soon)</option>
                        </select><br />


                        <div className='setting-date'>
                            <span>Select Date</span>
                            <DatePicker
                                className='aa'
                                // placeholderText="Select a date"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.dateSelect}
                                onChange={this.handleChange}
                            />

                            <span className='setting-text-type-sentiment'>Type of Sentiment</span>
                            <select className='select-type' onChange={this.handleDrop} >
                                <option value="all" >All</option>
                                <option value="pos">Positive</option>
                                <option value="neg">Negative</option>
                                {/* <option value="no" disabled>No emotional</option> */}
                            </select><br />
                        </div>

                    </div>
                </div>
                <TableList
                    topic={this.state.topic}
                    type={this.state.type}
                    dateShow={this.state.date_show}
                />

            </div>
        )
    }
}