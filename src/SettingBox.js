import React from 'react'
// import ReactDOM from 'react-dom'
import './css/setting-style.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { TableList } from './TableList.js'



export class SettingBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dateSelect: moment(),
            topic: 'Twitter',
            type: 'all',
            date_show: moment().format('ddd MMM DD'),
            exp: 0,
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDrop = this.handleDrop.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
    }

    handleChange(date) {
        // Sat Mar 31 15:28:15 2018
        var parse_date = moment(date).format('ddd MMM DD')

        this.setState({
            dateSelect: date,
            date_show: parse_date
        });

        // console.log(parse_date)
        // console.log(this.state.date_show)
        // console.log(this.state.dateSelect)
        // console.log(moment(date).format('DD/MM/YYYY'))
    }

    handleDrop(event) {
        this.setState({
            type: event.target.value
        })
        console.log(event.target.value)

    }

    responseFacebook(response) {
        this.setState({
            exp: response.expiresIn,
            name: response.name
        })
        console.log(response)
    }

    render() {
        // const session_login = this.state.exp === 0 ? <FacebookLogin
        //     appId="415192565542865"
        //     autoLoad={true}
        //     fields="name,email,picture"
        //     callback={this.responseFacebook}
        // // onClick={componentClicked}
        // // callback={responseFacebook} 
        // /> : <div>{this.state.name}<br />expire in : {this.state.exp}<br /><button>Logout</button></div>
        return (
            <div>
                <div className='settingbox'>
                    <div className='setting-div-head'>
                        <span className='setting-text-head'>Setting</span>
                    </div>
                    <div className='setting-all'>
                        <span className='setting-text-type-social'>Type of Social Media</span>
                        <select>
                            <option value="twt">Twitter</option>
                            <option value="fb" disabled>Facebook (coming soon)</option>
                        </select><br />
                        {/* <div className='setting-float'>
                            {session_login}
                        </div> */}
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