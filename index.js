const fs = require("fs").promises;
const axios = require("axios");
const path = require("path");

const Dir = "result";
const Url = 
"http://jsonplaceholder.typicode.com/posts";

// function to send request to the API endpoint
const getData = async (url) => {
    try {

        let response = await axios.get(url);
	return response.data;

    } catch (error) {

        console.log(error)

    }
}

// function to write the post data to a json file
const DataToFile = (data) => {

  fs.writeFile(path.join( __dirname, "result/posts.json"), data)
	.then(() => console.log(`\n[File Operation]: success! \n\n[+]: Your data has been saved to [ ./result/posts.json ]`) )
	.catch(error => console.log(`\ny[File Operation]: Failed! \n\n[-]: ${error}`) );

}


// main function 
const fileOperation = async () => {

  try {
    
    let data = await getData(Url)
    data = JSON.stringify(data, null, 2);
    
    fs.access(path.join(__dirname, Dir))
      .then(() => DataToFile(data))
      .catch((error) => {
      
	  fs.mkdir(targetDir)
    	    .then(() => DataToFile(data))
    	    .catch(error => console.log(error))
  
      })

  } catch(error) {
  
    console.log(error);
    
  }

}

fileOperation();
