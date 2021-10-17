import React from 'react';
import {
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

class StereoLinks extends React.Component {

  render() {
    return(
      <div className="StereoLinks">
        <div className="section">Stereo Links:</div>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {[...Array(8).keys()].map((i) => (
                  <TableCell key={i} align="center">{`${i*2+1}/${i*2+2}`}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.props.stereoLinks || []).map((group, i) => (
                <TableRow key={i}>
                  <TableCell component="th">{group}:</TableCell>
                  {this.props.stereoLinks[group].map((e, ii) => (
                    <TableCell key={ii} align="center">
                      <Checkbox
                        checked={!!e}
                        disabled
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default StereoLinks;
