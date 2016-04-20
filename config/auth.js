module.exports = {
    'twitterAuth' : {
        'consumerKey'       : process.env.TWTRCC,
        'consumerSecret'    : process.env.TWTRCS,
        'callbackURL'       : "" + process.env.IP + process.env.PORT + '/auth/twitter/callback'
    }
};
