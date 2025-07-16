const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const os = require('os');

// Function to get local IP address safely
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const interfaceData = interfaces[interfaceName];
        for (const addressInfo of interfaceData) {
            // Skip internal (loopback) and non-IPv4 addresses
            if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
                return addressInfo.address;
            }
        }
    }
    return 'localhost'; // fallback
}

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    socket.on('clientType', (type) => {
        console.log(`A ${type} has been connnected to the server`)
    })

    socket.on('userAction',(action) => {
        console.log('Action:', action);
        socket.broadcast.emit('userAction', action);
        });

    socket.on('volumeVideo',(action) => {
        socket.broadcast.emit('volumeVideo', action);
    });
    
    socket.on('joystickAction', (action) => {
        console.log('Action:', action);
        socket.broadcast.emit('joystickAction', action);
    });

    socket.on('searchInput', (value) => {
        console.log('Search input:', value);
        socket.broadcast.emit('searchInput', value);
    });

    socket.on('disconnect', () => {
        console.log('A user has been disconnected');
    });

});

app.get('/web', (req, res) => {
    res.sendFile(__dirname + '/home_usuario.html');
})

app.get("/remote-controller", (req, rest) => {
    rest.sendFile(__dirname + '/remote-controller.html');
})

// get all the images from images with the extension .jpg, .png, .gif
app.get('/images/:image', (req, res) => {
    res.sendFile(__dirname + '/images/' + req.params.image);
})

// get all the .css files from the /style folder
app.get('/style/:style', (req, res) => {
    res.sendFile(__dirname + '/style/' + req.params.style);
})

// get all the .js files from the /scripts folder
app.get('/scripts/:script', (req, res) => {
    res.sendFile(__dirname + '/scripts/' + req.params.script);
})

// get all the videos in .mp4 format from the /videos folder (/boulder, /F1 and /salto)
app.get('/videos/boulder/:video', (req, res) => {
    res.sendFile(__dirname + '/videos/boulder/' + req.params.video);
})
app.get("/videos/boulder/poster/:image", (req, res) => {
    res.sendFile(__dirname + "/videos/boulder/poster/" + req.params.image);
});
app.get('/videos/F1/:video', (req, res) => {
    res.sendFile(__dirname + '/videos/F1/' + req.params.video);
})
app.get('/videos/F1/Poster/:video', (req, res) => {
    res.sendFile(__dirname + '/videos/F1/Poster/' + req.params.video);
})
app.get("/videos/salto/poster/:image", (req, res) => {
  res.sendFile(__dirname + "/videos/salto/poster/" + req.params.image);
});
app.get('/videos/salto/:video', (req, res) => {
    res.sendFile(__dirname + '/videos/salto/' + req.params.video);
})
app.get('/videos/salto/poster/:image', (req, res) => {
    res.sendFile(__dirname + '/videos/salto/poster/' + req.params.image);
})



http.listen(3000, () => {
    // Show where is the remote controller and the web interface
    console.log("\nel control remoto y la interfaz web deben estar conectadas por medio del mismo wifi \n")

    console.log(`Web interface: \t   http://${getLocalIP()}:3000/index.html\n`);
    console.log(`Remote controller: http://localhost:3000/remote-controller\n`);
});
