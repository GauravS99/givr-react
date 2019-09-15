import {useEffect} from "react";
import * as React from "react";
import Rating from 'react-rating';
import * as API from '../util/Api';

/*
* @param {Array} numbers An array of numbers.
* @return {Number} The calculated average (or mean) value from the specified
*     numbers.
*/
function mean(numbers) {
    var total = 0, i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}



export default class RatingComponent extends React.Component<undefined, {rating: number, count: number}>{

    constructor(props) {
        super(props);
        this.state = {rating: 5, count: undefined};
    }

    componentDidMount = () => {
        API.getData("/ratings/redcross", undefined).then((values: number[]) => {
            console.log(values);
            this.setState({rating: mean(values), count: values.length});
        }).catch((e) => {
            console.warn(e.message);
        });
    };

    render(){
        return <div className={'mt-4'}>
            {this.state.count && <h2>{ this.state.count}</h2>}
            <Rating readonly initialRating={this.state.rating}/>
        </div>
    }
}

