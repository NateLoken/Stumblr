import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'green',
  },
});

const Spacer = require('react-spacer')

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



function ListBars({ bars }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = React.useState(2);

  console.log(bars)
/* Price Levels
0 Free
1 Inexpensive
2 Moderate
3 Expensive
4 Very Expensive */
  return (
    <ul>
      {bars && bars.length > 0 ? (
        bars.map((bars) => {
          return <li key={bars.place_id}>


            <Card>
              <CardHeader title={bars.name} />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Rating: {bars.rating} ({bars.user_ratings_total})
                    <br />
                    <Rating text-align='right' name="read-only" size="small" precision={0.5} value={bars.rating} readOnly />
                    <br />Price level:
                    <br/>
                        <StyledRating
                          name="customized-color"
                          defaultValue={bars.price_level} readOnly
                          size="small"
                          precision={0.5}
                          icon={<AttachMoneyOutlinedIcon fontSize="inherit" />}
                          emptyIcon={<AttachMoneyOutlinedIcon fontSize="inherit" />}/>
                </Typography>
              </CardContent>
            </Card>
          </li>;
        })
      ) : (
        <li>No bars in area</li>
      )}
    </ul>
  );
}

export default React.memo(ListBars);