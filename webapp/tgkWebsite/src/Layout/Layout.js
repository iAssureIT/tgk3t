import React,{Component}                         from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import HomePage                                  from '../pages/HomePage/HomePage.js';
import PropertyProfile                           from '../pages/PropertyProfile/PropertyProfile.js';
import MyPostedProperties                        from '../pages/MyPostedProperties/MyPostedProperties.js';
import MyInterestedProperties                    from '../pages/MyInterestedProperties/MyInterestedProperties.js';
import RentDetails                               from '../blocks/PostProperty/ResidentialRent/RentDetails/RentDetails.js';
import CommercialSell                            from '../blocks/PostProperty/Commercial/CommercialSell/CommercialSell.js';
import CommercialRent                            from '../blocks/PostProperty/Commercial/CommercialRent/CommercialRent.js';

import 'font-awesome/css/font-awesome.min.css';

 class Layout extends Component{

  render(){
       return(
        <div>
          <Router>
            <Switch>
              <Route path="/"                           exact strict component={HomePage}  />
              <Route path="/PropertyProfile/:id"        exact strict component={PropertyProfile}  />
              <Route path="/MyPostedProperties"         exact strict component={MyPostedProperties}  />
              <Route path="/MyInterestedProperties"     exact strict component={MyInterestedProperties}  />
              <Route path="/RentDetails"                exact strict component={RentDetails}  />
              <Route path="/CommercialSell"             exact strict component={CommercialSell}  />
              <Route path="/CommercialRent"             exact strict component={CommercialRent}  />
            </Switch>        
          </Router>
        </div>
      );
    } 
}
export default Layout;