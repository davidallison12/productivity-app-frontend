import React, { Component } from 'react';
import Calendar from 'react-calendar'

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return ( 
            <React.Fragment>
                <Calendar />
            </React.Fragment> 

            
         );
    }
}
 
export default Calendar;