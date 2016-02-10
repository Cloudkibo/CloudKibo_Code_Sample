# CloudKibo Reports

This is a sample Node.js application which extracts the Company data from CloudKibo application. CloudKibo has officially exposed the REST API which can be found on:

https://www.cloudkibo.com/restapi

Companies can extract following data from CloudKibo server regarding their Support Call sessions held on CloudKibo:

1. Get Company Profile stored on CloudKibo
2. Get the support call chat data for all sessions
3. Get the support call chat data for specific session
4. Set the company webhook which would triggerred by CloudKibo once support call session ends between agent and customer
5. Get the support call session URLs for agent and customer

Note: The sample application is written in Node.js, however, after following the guide given below, it would be easier to have basic understanding of how to fetch data from CloudKibo.

## Credentials
For every company registered on CloudKibo, a unique application id and application secret (password) are created. Company can use these credentials to extract the data from the CloudKibo using REST end points. In order to authenticate, company's application would attach the credentials to each HTTP request it sends to CloudKibo server. REST API exposed is completely stateless and no sessions are stored for clients. Therefore, it is mandatory for client applications to attach the credentials to each HTTP request. Following parameters are required in the HTTP request headers:

- `kibo-app-id`
- `kibo-app-secret`
- `kibo-client-id`

`kibo-client-id` is same as company unique id on CloudKibo.

It is upto client application how it manages the credentials. For this sample application, we store it on Nodejs server like this:

    var  headers =  {
        'kibo-app-id'    : 'your kibo-app-id',
        'kibo-app-secret': 'your kibo-app-secret',
        'kibo-client-id' : 'your kibo-client-id',
    }
    
We create the HTTP request in following method:

    var options = {
          url: 'https://api.cloudkibo.com/api/meetingchat', // URL to get chat data of all support call sessions
          headers:headers,
          rejectUnauthorized : false,
          form:{ 'companyid': headers['kibo-client-id']} // company id is required in the request body.
    };
    
We use Node.js module `request` to send our HTTP request to CloudKibo server:

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.length)
            console.log(info);  
            res.render('meetingrecord',{mydata:info}); // generating HTML page with result
          }
      else
        {
          data = null;
          console.log(error);
          res.send('could not fetch data.');
        }
    });
    
The above HTTP request would fetch all chat done in all support call sessions for a given company.

Please refer to [Developer's Guide](https://www.cloudkibo.com/restapi) on CloudKibo website to get details on complete REST API.

## Setup to run this application

#### Install nodejs

    sudo apt-get update
    sudo apt-get install nodejs
    sudo ln -s `which nodejs` /usr/local/bin/node

install npm, which is the Node.js package manager

    sudo apt-get install npm

source: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

#### Install Git

    sudo apt-get update
    sudo apt-get install git

#### Clone the application on server from github:
    git clone https://www.github.com/Cloudkibo/CloudKibo_Reports
    
Install server side libraries using:

    npm install
    
Run the application using
    
    npm start
    
For request of new features or correction of any bug found, kindly open a new issue on this Github repository.
