import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Aux from './app/constants/hoc/_Aux';



const Index = () => {
    return (
        <Aux>
            <div>Welcome to React BTECHSS!</div>
        </Aux>
    );
};
ReactDOM.render(<Index />, document.getElementById('root'));