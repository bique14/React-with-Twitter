import React from 'react'
// import ReactDOM from 'react-dom'
import './css/tablelist-style.css';
// import Product from './Product';
import SeachData from './SearchData'


const arr_user_id = []
const arr_text = []
const arr_created = []
const arr_re_count = []
const arr_fav_count = []
const arr_sentiment = []

export class TableList extends React.Component {
    componentDidMount() {
        fetch('/fetch')
            .then(res => res.json())
            .then(List => {
                List.forEach(function (kuy) {
                    // console.log(kuy.sentiment)
                    arr_user_id.push(kuy.user_id)
                    arr_text.push(kuy.text)
                    arr_created.push(kuy.created_at)
                    arr_re_count.push(kuy.retweet_count)
                    arr_fav_count.push(kuy.fav_count)
                    arr_sentiment.push(kuy.sentiment)
                })
                this.setState({ list: List })
            })

    }

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    render() {
        // var arr_date = []
        var arr_pos = []
        var arr_neg = []
        var arr_all = []

        // var chk_sentiment = 

        this.state.list.forEach((item, i) => {
            if (item.sentiment === 'pos' && (item.created_at == this.props.dateShow)) {
                console.log('1')
                arr_pos.push(this.state.list[i])
                arr_all.push(this.state.list[i])
            } else if (item.sentiment === 'neg' && (item.created_at == this.props.dateShow)) {
                console.log('2')
                arr_neg.push(this.state.list[i])
                arr_all.push(this.state.list[i])
            }
        })

        var list_all = arr_all.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{item.user_id}</td>
                    <td><div className='td-text'>{item.text}</div></td>
                    <td>{item.created_at}</td>
                    <td>{item.retweet_count}</td>
                    <td>{item.fav_count}</td>
                    <td>{item.sentiment}</td>
                </tr>
            )
        })


        var list_pos = arr_pos.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{item.user_id}</td>
                    <td><div className='td-text'>{item.text}</div></td>
                    <td>{item.created_at}</td>
                    <td>{item.retweet_count}</td>
                    <td>{item.fav_count}</td>
                    <td>{item.sentiment}</td>
                </tr>
            )
        })

        var list_neg = arr_neg.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{item.user_id}</td>
                    <td><div className='td-text'>{item.text}</div></td>
                    <td>{item.created_at}</td>
                    <td>{item.retweet_count}</td>
                    <td>{item.fav_count}</td>
                    <td>{item.sentiment}</td>
                </tr>
            )

        })

        const chk = this.props.type === 'pos' ? list_pos : this.props.type === 'neg' ? list_neg : list_all

        return (
            <div className='table-box'>
                <h1>{this.props.topic} : {this.props.dateShow} ({this.props.type})</h1>
                {console.log(this.state.list)}
                <table>
                    <tbody>
                        <tr>
                            <th>no.</th>
                            <th>user_id</th>
                            <th>text</th>
                            <th>created_at</th>
                            <th>re_count</th>
                            <th>fav_count</th>
                            <th>sentiment</th>
                        </tr>
                        {chk}
                    </tbody>
                </table>
            </div>
        )
    }
}