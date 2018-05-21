
// secrets.js
const secrets = {
  dbUri: "mongodb://asacurry:merncomment1@ds229450.mlab.com:29450/mern-comment-box"
};

export const getSecret = key => secrets[key];
