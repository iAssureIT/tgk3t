import React,{Component}                         from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import HomePage                                  from '../pages/HomePage/HomePage.js';
import PropertyProfile                           from '../pages/PropertyProfile/PropertyProfile.js';
import MyPostedProperties                        from '../pages/MyPostedProperties/MyPostedProperties.js';
import MyInterestedProperties                    from '../pages/MyInterestedProperties/MyInterestedProperties.js';
import RentDetails                               from '../blocks/PostProperty/ResidentialRent/RentDetails/RentDetails.js';
import CommercialSell                            from '../blocks/PostProperty/Commercial/CommercialSell/CommercialSell.js';
import CommercialRent                            from '../blocks/PostProperty/Commercial/CommercialRent/CommercialRent.js';
import SearchResultPage                          from '../pages/SearchResultPage/SearchResultPage.js';
import AboutUs                                   from '../pages/AboutUs/AboutUs.js';

import 'font-awesome/css/font-awesome.min.css';

 class Layout extends Component{

  render(){
       return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
          <Router>
            <Switch>

              <Route path="/"                             exact strict component={HomePage}  />
              <Route path="/PropertyProfile/:id"          exact strict component={PropertyProfile}  />
              <Route path="/MyPostedProperties"           exact strict component={MyPostedProperties}  />
              <Route path="/MyInterestedProperties"       exact strict component={MyInterestedProperties}  />
              <Route path="/RentDetails"                  exact strict component={RentDetails}  />
              <Route path="/CommercialSell"               exact strict component={CommercialSell}  />
              <Route path="/CommercialRent"               exact strict component={CommercialRent}  />
              <Route path="/SearchResults"                exact strict component={SearchResultPage}  />
              <Route path="/AboutUs"                      exact strict component={AboutUs}  />

            </Switch>        
          </Router>
        </div>
      );
    } 
}
export default Layout;