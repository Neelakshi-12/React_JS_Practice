import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default class MainBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            searchData: null,
        }
    }
    componentDidMount() {

        fetch('https://www.mist-one.com/pub/languages')
            .then(res => res.json())
            .then(json => {
                console.log("json", json.data.rows)
                this.setState({
                    isLoaded: true,
                    items: json.data.rows,
                })
            });
    }



    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading.....</div>
        }
        else {
            return (
                <div className="container" style={{ minHeight: '100vh', marginBottom: 50 }}>
                    <h2 style={{ textAlign: "center", padding: 20, fontWeight: "bold" }}> List Of Languages </h2>


                    <Grid container spacing={3} >
                        {items.map((item, id) => {
                            return (
                                <Grid item xs={6} sm={3} key={item.id}>
                                    <Card style={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Image not Found"
                                                height="140"
                                                image={item.image}
                                                title="Language Based Image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {item.languageNameEnglish}

                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {item.languageNameNative}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        {/* <CardActions>
                                            <Button size="small" variant="contained" color="primary">
                                                Like
                                            </Button>
                                            <Button size="small" variant="contained" color="Secondary">
                                                Share
                                            </Button>
                                        </CardActions> */}
                                    </Card>
                                </Grid>
                            )
                        })}

                    </Grid>



                </div>
            )
        }

    }
}



