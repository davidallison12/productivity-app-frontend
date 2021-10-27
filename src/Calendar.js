import React, { Component } from 'react';
import SimpleReactCalendar from 'simple-react-calendar'

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return ( 
            <React.Fragment>
                <SimpleReactCalendar />
            </React.Fragment> 

            
         );
    }
}
 
export default Calendar;