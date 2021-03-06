import React, { Component } from 'react';
import './App.css';
const url='http://127.0.0.1:7101/AgencyRebatesApp/tokeninputservlet?q=Murali&fieldName=subscriber';
type State ={
  personList: ?object,
}

class RestPersonList extends Component<Props,State> {
  constructor(props: Props): void {
   super(props);
   this.state = {
     personList: null,
   };
   console.log('constructor');
   this.serverResponseComplete = this.serverResponseComplete.bind(this);
   this.serverResponseError = this.serverResponseError.bind(this);
   this.processResponse = this.processResponse.bind(this);

 }

  componentWillMount(){
    console.log('Component will mount');

  }

  componentDidMount(){
    console.log('Component did mount');
    fetch(url)
    .then(response=>this.serverResponseComplete(response))
    .catch(err=>this.serverResponseError(err));
  }
  render():React.Node {
    return (
      <div>
      {
        this.state.personList
        ? this.state.personList.map(
        (e,i) =>      <div key={e.name+i}>{e.name}</div>
        )
        : 'Fetching data'
      }
    </div>
    );
  }
  processResponse(data):void{
  console.log('Setting data');
   console.log(data);
   this.setState(
   {
     personList:data
   }
   );
 }
 serverResponseError(err):void{
     const error = {
       id : 1,
       name : 'Error while fetching data'
     };
     this.serverResponseComplete(error);
     console.log('Fetch Error :-S', err);
 }
 serverResponseComplete(response):void{
     if (response.status !== 200) {
       console.log('Looks like there was a problem. Status Code: ' +
         response.status);
       return;
     }
     //this.processResponse(response.json());
     // Examine the text in the response
     response.json().then(data=>this.processResponse(data));
 }
}

export default RestPersonList;
