import React, { Component,PropTypes } from 'react';
// import InlineEdit           from 'react-edit-inline';
import EditableLabel from 'react-inline-editing';

import './approveSociety.css';

class approveSociety extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
         societyAndArea: [
            { society: "Neo",       subArea: 'Hadapsar' },
            { society: "OM",        subArea: 'Kharadi'},
            { society: "Jasminium", subArea: 'Magarpatta'},
            { society: "Acacia",    subArea: 'Wagholi'}
         ],
         message: 'ReactInline demo'
      }

   }

   _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }
 
    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }

   render() {
      console.log("societyAndArea",this.state.societyAndArea)
      return (
         <div>
            <h1 id='title'>Society And SubArea</h1>
            <table id='societyAndArea' className="col-lg-6 col-lg-offset-3 societyTable">
               <tbody>
                   <th>Society</th>
                   <th>SubArea</th>
                   <th>Action</th>
                     {this.state.societyAndArea ?
                        this.state.societyAndArea.map((society, index) => {
                        return(
                           <tr key={index}>
                              <td>
                                 <EditableLabel text={society.society}
                                     labelClassName='myLabelClass'
                                     inputClassName='myInputClass'
                                     inputWidth='200px'
                                     inputHeight='25px'
                                     inputMaxLength='50'
                                     labelFontWeight='bold'
                                     inputFontWeight='bold'
                                     onFocus={this._handleFocus.bind(this)}
                                     onFocusOut={this._handleFocusOut.bind(this)}
                                 />
                              </td>
                              <td>{society.subArea}</td>
                              <td>
                                 <button>Approve</button>
                              </td>
                           </tr>
                           )
                        })
                        :
                        null
                        }
               </tbody>
            </table>
         </div>
      )
   }
}

export default approveSociety; 
