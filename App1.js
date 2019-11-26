const express = require('express');
const app = express();
const axios = require('axios');
const Film = require('./Film');
const apikey = 'de75dbbf';
const apikey1 = 'e9db68dfd8582eaecac57ec915ac1559';
const port = process.env.PORT || 2000;

//localhost:5000/getmovie?title=MovieTitle
app.get('/getmovie', (req, res) => {
    const title = req.query.title;
    const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;
    const querystr1 = `https://api.themoviedb.org/3/movie/550?api_key=e9db68dfd8582eaecac57ec915ac1559`;


    axios
      .get(querystr)
      .then(response => {
        console.log(response.data);
          var movie = new Film({
              title: response.data.Title,
              year: response.data.Year,
              runtime: response.data.Runtime,
              release_date: response.data.Releasedate,
              revenue: response.data.Revenue,
              spoken_languages: response.data.Spokenlanguages
          });
       
          movie
            .save()
            .then(result => {
                console.log("Success" + result);
            }
            )
            .catch(error => {
                console.log("Error" + error);
            }
            );

            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(400).json(error);
        });
    
        axios
        .get(querystr1)
        .then(response => {
          console.log(response.data);
            var movie = new Film({
                title: response.data.Title,
                year: response.data.Year,
                runtime: response.data.Runtime,
                release_date: response.data.Releasedate,
                revenue: response.data.Revenue,
                spoken_languages: response.data.Spokenlanguages
            });
         
            movie
              .save()
              .then(result => {
                  console.log("Success" + result);
              }
              )
              .catch(error => {
                  console.log("Error" + error);
              }
              );
  
              res.status(200).json(response.data);
          })
          .catch(error => {
              res.status(400).json(error);
          });
});

//localhost:5000/getallmovies
app.get('/getallmovies', (req, res) => {
    Film.find({})
      .then(response => {
          res.status(200).json(response);
      })
      .catch(error => {
          res.status(400).json(error);
      });
});

//localhost:5000/deletemovie?title=MovieTitle
app.get('/deletemovie', (req, res) => {
    Film.deleteMany({ title: req.query.title })
      .then(response => {
          res.status(200).json(response);
      })
      .catch(error => {
          res.status(400).json(error);
      });
});

app.listen(5000, () => {
    console.log('server listening on port 5000');
});

      