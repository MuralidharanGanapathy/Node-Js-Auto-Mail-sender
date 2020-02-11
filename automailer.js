var fs = require('fs');
var parse = require('csv-parse');

var op = "";

let cron = require('node-cron');
  let nodemailer = require('nodemailer');


cron.schedule('* * * * *', function(){

var inputFile='samplecsv.csv';
console.log("Processing csv file and parsing");
  
  let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'murali9942@gmail.com',
          pass: 'Muralidharan01'
        }
    });
var parser = parse({delimiter: ','}, function (err, data) {

    data.forEach(function(line) {
  
      let mailOptions = {
        from: 'murali9942@gmail.com',
        to: line[2],
        subject: 'An automated Node js message',
        text: 
        "Hey"+ line[0] + "\n" +"Kindly confirm if the following details are correct.\n"+
             line[0] + line[1] + "\n" + line[2] + "\n" + line[3] + "\n" + line[4] + "\n" + line[5] + "\n" +
             "Regards,\n"+
             "Muralidharan."
   };



  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    });    
});
 

fs.createReadStream(inputFile).pipe(parser);

});