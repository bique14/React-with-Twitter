import React from 'react';
import ReactDOM from 'react-dom';
import { SettingBox } from './SettingBox.js'
import registerServiceWorker from './registerServiceWorker';

class Layout extends React.Component {
    render() {
        return (
            <div>
                <SettingBox /><br/>
            </div>
        )
    }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
