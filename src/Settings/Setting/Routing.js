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
                  <TableCell key={i} align="center">{i+1}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th">IN:</TableCell>
                {this.props.routeIn?.mix.map((e, i) => (
                  <TableCell key={i} align="center">{ES9Static.routeIn[e].name}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell component="th">OUT:</TableCell>
                {this.props.routeOut?.mix.map((e, i) => (
                  <TableCell key={i} align="center">{ES9Static.routeOut[e].name}</TableCell>
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
