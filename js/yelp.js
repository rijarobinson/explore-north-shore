
/*get authentication parameters*/
var auth = {
    consumerKey: "27Q83m56HcBQSJCvGOBABg",
    consumerSecret: "H6Yk2QwgUQ0lmHMmI8l1DzOvbFw",
    accessToken: "kWBOL6h1IZHlOEypYpzLvs9xFmt8GOBK",
    accessTokenSecret: "N4waXV7XPRPjT2orKQEHJB0pchk",
  };


/*set search terms*/
    var businessId = 'dowize-bistro-wilmette';

/* set variable accessor to two items in the auth list*/
  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };


/*create list called parameters and push search terms and
authentication items*/
  var parameters = [];
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);


/* set a variable with yelp url string and parameters list*/
  var message = {
    'action': 'https://api.yelp.com/v3/businesses/'+ businessId + '/reviews',
    'method': 'GET',
    'parameters': parameters
  };



/*  OAuth.setTimestampAndNonce(message);

  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

  var url = OAuth.addToURL(message.action,parameterMap);
  var response = UrlFetchApp.fetch(url).getContentText();
  var responseObject = Utilities.jsonParse(response);*/