const mongoose = require('mongoose');
 
const db = "mongodb+srv://ChuahYiHern:doingdb@cluster0-nvgpo.mongodb.net/test?retryWrites=true&w=majority";
 
mongoose
  .connect(db)
  .then(()=> {
    console.log("Connected to database");
  }
  )

  .catch( () => {
    console.log("Error Connected to database");
  }
  )

 const filmSchema = new mongoose.Schema({
    title: { type: String},
    year: { type: String},
    runtime: { type: String},
    release_date: { type: String},
    revenue: { type: String},
    spoken_languages: { type: String}
    }
    );
 
    const Film = mongoose.model('Records', filmSchema);
    module.exports = Film;

 
   
   

