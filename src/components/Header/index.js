import React, { Component } from 'react';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import '../../css/Header.css';

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div className='header'>
                <FormatListNumberedIcon style={{ fontSize: 40 }}/>
                <h1>To-do List</h1>
            </div>
        );
    }
}
 
export default Header;