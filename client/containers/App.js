import React from 'react'
import NavigationBar from './NavigationBar';
import GlobalCss from '../../public/styles/containers.css'


class App extends React.Component {
    render() {
        return (
            <div className="fluid-container">
                <NavigationBar/>
                {this.props.children}
            </div>
        )
    }
}

export default App;