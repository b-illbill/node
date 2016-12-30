/**
 * Created by durka on 12/30/16.
 */

var redirectUri = 'http://localhost:8000/authorize';

// The scopes the app requires
var scopes = [ 'openid',
    'offline_access',
    'https://outlook.office.com/mail.read',
    'https://outlook.office.com/calendars.read' ];

function getAuthUrl() {
    var returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    });
    console.log('Generated auth url: ' + returnVal);
    return returnVal;
}

exports.getAuthUrl = getAuthUrl;

function refreshAccessToken(refreshToken, callback) {
    var tokenObj = oauth2.accessToken.create({refresh_token: refreshToken});
    tokenObj.refresh(callback);
}

exports.refreshAccessToken = refreshAccessToken;

var credentials = {
    client: {
        id: 'xxxxxx',
        secret: 'xxxxxxxxx',
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};

var oauth2 = require('simple-oauth2').create(credentials);

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

exports.getTokenFromCode = getTokenFromCode;
