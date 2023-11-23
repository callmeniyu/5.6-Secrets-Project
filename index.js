// HINTS:


// 1. Import express and axios
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'


// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com"

// 3. Use the public folder for static files.
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))


// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "/random")
        res.render("index",{secret:response.data.secret,user:response.data.username})

    } catch (err) {
        console.log(err.response.data);
        res.render("index",{secret:err.response.data,user:"No user found"})
    }
})



// 6. Listen on your predefined port and start the server.
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})