const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require('fs');

// Set maximum payload size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use(bodyParser.json());

app.use(cors());

app.post('/upload', (req, res) => {
  const image = req.body.image;
  const imageName = `frame_${Date.now()}.jpg`;
  const imagePath = `D:/Mhash/test/server/photos${imageName}`;
  const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  
  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).send('Error saving image');
    } else {
      console.log('Image saved:', imageName);
      res.sendStatus(200);
    }
  });
});


app.get("/get-response", (req, res) => {
    res.status(200).json({message : "Got response"})
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
