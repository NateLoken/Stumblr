import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'green',
  },
});

function ListBars({ bars }) {
  console.log(bars)
  return (
    <ul>
      {bars && bars.length > 0 ? (
        bars.map((bars) => {
          return <li key={bars.place_id}>
            <Card>
              <CardHeader title={bars.name} />
              <Divider />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                    Rating: {bars.rating} ({bars.user_ratings_total})
                    <br />
                    <Rating text-align='right' name="read-only" size="small" precision={0.5} value={bars.rating} readOnly />
                    <br />Price level:
                    <br/>
                        <StyledRating
                          name="customized-color"
                          defaultValue={bars.price_level} readOnly
                          size="small"
                          precision={.5}
                          max={4}
                          icon={<AttachMoneyOutlinedIcon fontSize="inherit" />}
                          emptyIcon={<AttachMoneyOutlinedIcon fontSize="inherit" />}/>
                </Typography>
              </CardContent>
            </Card>
          </li>;
        })
      ) : (
        <li>No bars in area </li>
      )}
    </ul>
  );
}

export default React.memo(ListBars);