const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const path = require('path');

require('./conn');
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

const UserRoutes = require('./Routes/user');
const ResumeRoutes =  require('./Routes/resume');

app.use('/api/user', UserRoutes);
app.use('/api/resume', ResumeRoutes);

//Server static files from the React app's build directory
app.use(express.static(path.join(__dirname, "build")));

//Handles React routing, returns the index.html file for all other requests
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(PORT, () => {
    console.log("Backend is running on PORT ", PORT);
})