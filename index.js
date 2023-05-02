const express = require('express');
const path = require('path')
const http = require('http');
const {check, validationResult} = require('express-validator')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const validUrl = require('valid-url');
var app = express();

const port = 3000;


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.end('Provision Spoofer');
});

app.listen(port, () => {(console.log(`Listening on port ${port}`))});

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));


app.post('/buy', (req, res) =>{
  
})

app.post('/reset-hwid', async (req, res) => {
    const license = req.body.License;
    const sellerkey = '91i20jde12d12d'; // not real lol

    const webhook = ''; // put discord webhook here
    
    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=resetuser&user=${license}`)
    .then(res => res.json())
    .then(json => {
        if (json.success) {
            console.log(json);
            res.send('HWID has been reset!');
            
           

            const message = {
                embeds: [
                  {
                    title: 'HWID Reset',
                    color: 0xFFA500, 
                    description: `A user has reset their HWID for the License: ${license}`,
                  },
                ],
              };

            fetch(webhook, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        } else {
            console.log(json);
            let errors = [{msg: "Key isn't valid, please try again"}];
        }
    })
    .catch(err => {
        console.log(err);
    });

});

app.post('/download', async (req, res) => {
    const license = req.body.key;
    const sellerkey = '91i20jde12d12d'; // not real lol

    const webhook = 'null';
    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=verify&key=${license}`)
    .then(res => res.json())
    .then(json => {
        if (json.success) {
            
            console.log(json);
            const filePath = path.join(__dirname, 'public/loader/ProvisionLoader.exe');
            res.download(filePath, (err) => {
                if (err) {
                  console.error(err);
                  
                } else {
                    
                }
              });

            const message = {
                embeds: [
                  {
                    title: 'Download Request',
                    color: 0xFFA500, 
                    description: `A user has requested to download the loader with the License: ${license}`,
                  },
                ],
              };

            fetch(webhook, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        } else {
            console.log(json);
            let errors = [{msg: "Key isn't valid, please try again"}];
        }
    })
    .catch(err => {
        console.log(err);
    });

});
  
app.get('/Panel', (req, res) => {
    res.render('pages/Panel');
});
  

app.get('/', (req, res) => {

    res.render('pages/home');
});
