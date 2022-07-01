require('dotenv').config();
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = AWS_BUCKET_NAME= "awsimagebucket1"
const region = AWS_BUCKET_REGION="us-east-2"
const accessKeyId= AWS_ACCESS_KEY="AKIA6BHXPKUZUOF7QTEE"
const secretAccessKey = AWS_SECRET_KEY="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"

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
//uploads a file to s3
function uploadFile(file){
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket:bucketName,
        Body:fileStream,
        Key:file.filename 
    }
    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;
//downloads a file from s3

