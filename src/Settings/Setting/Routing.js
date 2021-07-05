import React from 'react';
import ES9Static from '../../ES9Static';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';

class Routing extends React.Component {

  render() {
    return(
      <div className="Routing">
        <div className="section">Routing:</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {[...Array(16).keys()].map((i) => (
                  <TableCell align="center">{i+1}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>IN:</TableCell>
                {this.props.routeIn?.mix.map((e) => (
                  <TableCell align="center">{ES9Static.routeIn[e].name}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default Routing
