const {
    generateGetUrl,
    generatePutUrl
} = require('../middleware/AWSBucketMiddleware');

const AWSBucketController = {
    getURL: async (req, res) => {
        const { Key } = req.query;
        generateGetUrl(Key)
            .then(getURL => {
                res.send(getURL);
            })
            .catch(err => {
                res.send(err);
            });
    },
    putURL: async (req, res) => {
        const { Key, ContentType } = req.query;
        generatePutUrl(Key, ContentType)
            .then(putURL => {
                res.send({ putURL });
            })
            .catch(err => {
                res.send(err);
            });
    }
}
module.exports = AWSBucketController;