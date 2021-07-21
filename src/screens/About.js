import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


export default class About extends Component {

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
                console.log("searchData", this.state.searchData)
            });
    }


    search(key) {
        console.warn(key)
        this.setState({
            searchData: key,
        })
        console.log("searchData", this.state.searchData)
    }

    // .then(res => res.json())
    // .then(json => {
    //     console.log("json", json.data.rows)

    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading  data.....</div>
        }
        else {
            return (
                <div className="container" style={{ minHeight: '100vh', marginBottom: 50 }}>
                    <h2 style={{ textAlign: "center", padding: 20, fontWeight: "bold" }}> List Of Languages </h2>

                    <div style={{ marginBottom: 40, marginLeft: '20%', marginRight: '20%' }}>

                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(event) => this.search(event.target.value)} />

                    </div>
                    <Grid container spacing={3} >
                        {items.filter((item) => {
                                if (this.state.searchData === "") {
                                    console.log('if ka item', item)
                                    return item

                                } else if (item.languageNameEnglish.toLowerCase().includes(this.state.searchData)) {
                                    console.log('else if ka item', item)
                                    return item
                                } else if(this.state.searchData === null) {
                                    return item
                                }
                                
                            }).map((item, id) => {

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



