/* Created by durka on 12/30/16. */

var credentials = {
    client: {
        id: 'xxxxxxxxxxxx',
        secret: 'xxxxxxxxxxxx',
    },
    auth: {
        tokenHost: 'xxxxxxxxxxxx',
        authorizePath: 'xxxxxxxxxxxx',
        tokenPath: 'xxxxxxxxxxxx'
    }
};


var oauth2 = require('simple-oauth2').create(credentials);

var redirectUri = 'xxxxxxxxxxxx';

// The scopes the app requires
var scopes = [ 'openid',
    'offline_access',
    'https://outlook.office.com/mail.read',
    'https://outlook.office.com/calendars.read',
    'https://outlook.office.com/contacts.read' ];

function getAuthUrl() {
    var returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    });
    console.log('Generated auth url: ' + returnVal);
    return returnVal;
}

function getTokenFromCode(auth_code, callback, response) {
    var token;
    oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    }, function (error, result) {
        if (error) {
            console.log('Access token error: ', error.message);
            callback(response, error, null);
        } else {
            token = oauth2.accessToken.create(result);
            console.log('Token created: ', token.token);
            callback(response, null, token);
        }
    });
}

function refreshAccessToken(refreshToken, callback) {
    var tokenObj = oauth2.accessToken.create({refresh_token: refreshToken});
    tokenObj.refresh(callback);
}

exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;
exports.refreshAccessToken = refreshAccessToken;
