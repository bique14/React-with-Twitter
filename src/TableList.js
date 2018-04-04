import React from 'react'
// import ReactDOM from 'react-dom'
import './css/tablelist-style.css';
// import Product from './Product';
import SeachData from './SearchData'

export class TableList extends React.Component {
    render() {
        var arr_date = []
        var arr_pos = []
        var arr_neg = []
        var arr_all = []

        var chk_sentiment = SeachData.forEach((item, i) => {
            if (item.sentiment === 'pos' && (item.created_at == this.props.dateShow)) {
                console.log('1')                
                arr_pos.push(SeachData[i])
                arr_all.push(SeachData[i])
            } else if (item.sentiment === 'neg' && (item.created_at == this.props.dateShow)) {
                console.log('2')                
                arr_neg.push(SeachData[i])
                arr_all.push(SeachData[i])                
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
                <table>
                    <tbody>
                        <tr>
                            <th>no.</th>
                            <th>screen_name</th>
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