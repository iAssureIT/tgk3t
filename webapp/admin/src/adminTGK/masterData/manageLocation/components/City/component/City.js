import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const City = new Mongo.Collection('city');

if(Meteor.isServer){
  Meteor.publish('citydata',function districtdata(){
      return City.find({});
  });  
  
}
Meteor.methods({
  'addCity' : function(cityValues) { 
    var districtVar = City.findOne({countryName : cityValues.country, stateName : cityValues.state, cityName : cityValues.city});     
    if(districtVar){
      var result = 'exist';
    }else{   
       var result = City.insert({
        countryName     : cityValues.country,           
        stateName       : cityValues.state,   
        cityName        : cityValues.city,     
        updatedAt       : new Date(), 
        createdAt       : new Date(),             
                    
        });
    } 
    return result;                                                      
  },

  'deleteCity':function(id){
     City.remove({'_id': id});
  },

  'updateCity' : function(id,cityValues) {      
      City.update(
        { '_id': id },
       {
         $set:{ 
          countryName     : cityValues.country,           
          stateName       : cityValues.state,   
          cityName        : cityValues.city,   
          updatedAt       : new Date(), 
                    
       } });                                                   
  },


'CSVUploadcity': function(csvObject){
    var uploadSyncArr = [];
    var count         = 0;
    if(csvObject){
      // console.log("csvObject.length: ",csvObject.length);
/*      UserSession.set("allProgressbarSession", csvObject.length-2, Meteor.userId());*/
      for(i=0;i<csvObject.length-1;i++){
        count++;
        var cityData = City.findOne({
                'countryName': csvObject[i].country,
                'stateName'  : csvObject[i].state,
                'cityName'   : csvObject[i].city
              });
        if(cityData){
          City.update(
            {'_id':cityData._id},
            {
              $set:{
                'countryName' : csvObject[i].country,
                'stateName'   : csvObject[i].state,
                'cityName'    : csvObject[i].city,
                'updatedAt'   : new Date()
              }
            }
          )
        }else{
          
                  uploadSyncArr[i] = City.insert({
                    'countryName'                   : csvObject[i].country,
                    'stateName'                     : csvObject[i].state,
                    'cityName'                      : csvObject[i].city,
                    'updatedAt'                     : new Date(), 
                    'createdAt'                     : new Date(), 
                  });
                  if(uploadSyncArr[i]){
    /*                UserSession.set("progressbarSession", i, Meteor.userId());*/
                  }
          }// EOF i
      }
    }

    return count;
  },
});
