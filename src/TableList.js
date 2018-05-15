import React from 'react'
// import ReactDOM from 'react-dom'
import './css/tablelist-style.css';


export class TableList extends React.Component {
    componentDidMount() {
        fetch('/fetch')
            .then(res => res.json())
            .then(List => {
                this.setState({ list: List })
            })

    }

    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
    }

    updateSentiment = (pos, neg, nat, id, sum) => {
        fetch('/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                pos: parseInt(pos),
                neg: parseInt(neg),
                nat: parseInt(nat),
                sum: parseInt(sum)
            })
        })
    }


    render() {
        var arr_pos = []
        var arr_neg = []
        var arr_all = []

        this.state.list.forEach((item, i) => {
            if (item.sentiment === 'pos' && (item.created_at === this.props.dateShow)) {
                arr_pos.push(this.state.list[i])
                arr_all.push(this.state.list[i])
            } else if (item.sentiment === 'neg' && (item.created_at === this.props.dateShow)) {
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
                    {/* <td>{item.created_at}</td> */}
                    <td>{item.retweet_count}</td>
                    <td>{item.fav_count}</td>
                    <td>{item.sentiment}</td>
                    <td>{item.pos}% {item.neg}% {item.nat}%</td>
                    <td>
                        <button onClick={() => {
                            if (this.props.username) {
                                // TODO: บัค เพราะต้อเอาตัวจาก DB มาคิด ไม่ใช่จาก client
                                item.pos += 1
                                var sum = item.pos + item.neg + item.nat
                                var pos_percent = ((item.pos / sum) * 100).toFixed(2)
                                var neg_percent = ((item.neg / sum) * 100).toFixed(2)
                                var nat_percent = ((item.nat / sum) * 100).toFixed(2)
                                console.log('id:', item._id, 'sum:', sum, 'score :', item.pos, pos_percent, item.neg, neg_percent, item.nat, nat_percent)
                                this.updateSentiment(pos_percent, neg_percent, nat_percent, item._id, sum)
                            } else {
                                alert('no login')
                            }

                        }}>+</button>
                        <button onClick={() => {
                            if (this.props.username) {
                                // TODO: บัค เพราะต้อเอาตัวจาก DB มาคิด ไม่ใช่จาก client                                
                                item.neg += 1
                                var sum = item.pos + item.neg + item.nat
                                var pos_percent = ((item.pos / sum) * 100).toFixed(2)
                                var neg_percent = ((item.neg / sum) * 100).toFixed(2)
                                var nat_percent = ((item.nat / sum) * 100).toFixed(2)
                                console.log('id:', item._id, 'sum:', sum, 'score :', item.pos, pos_percent, item.neg, neg_percent, item.nat, nat_percent)
                                this.updateSentiment(pos_percent, neg_percent, nat_percent, item._id, sum)
                            } else {
                                alert('no login')
                            }
                        }}>-</button>
                        <button onClick={() => {
                            if (this.props.username) {
                                // TODO: บัค เพราะต้อเอาตัวจาก DB มาคิด ไม่ใช่จาก client                                
                                item.nat += 1
                                var sum = item.pos + item.neg + item.nat
                                var pos_percent = ((item.pos / sum) * 100).toFixed(2)
                                var neg_percent = ((item.neg / sum) * 100).toFixed(2)
                                var nat_percent = ((item.nat / sum) * 100).toFixed(2)
                                console.log('id:', item._id, 'sum:', sum, 'score :', item.pos, pos_percent, item.neg, neg_percent, item.nat, nat_percent)
                                this.updateSentiment(pos_percent, neg_percent, nat_percent, item._id, sum)
                            } else {
                                alert('no login')
                            }
                        }}>?</button>
                    </td>
                </tr>
            )
        })


        var list_pos = arr_pos.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{item.user_id}</td>
                    <td><div className='td-text'>{item.text}</div></td>
                    <td>{item.retweet_count}</td>
                    <td>{item.fav_count}</td>
                    <td>{item.sentiment}</td>
                    <td>{item.pos}% {item.neg}% {item.nat}%</td>
                    <td><button>+</button><button>-</button><button>?</button></td>
                </tr>
            )
        })

        var list_neg = arr_neg.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{item.user_id}</td>
                    <td><div className='td-text'>{item.text}</div></td>
                    <td>{item.retweet_count}</td>
                    <td>{item.fav_count}</td>
                    <td>{item.sentiment}</td>
                    <td>{item.pos}% {item.neg}% {item.nat}%</td>
                    <td><button>+</button><button>-</button><button>?</button></td>
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
                            <th>user_id</th>
                            <th>text</th>
                            <th>re_count</th>
                            <th>fav_count</th>
                            <th>sentiment</th>
                            <th>score</th>
                            <th>vote</th>
                        </tr>
                        {chk}
                    </tbody>
                </table>
            </div>
        )
    }
}