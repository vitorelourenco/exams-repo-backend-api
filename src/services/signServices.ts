import AWS from 'aws-sdk';

export async function signS3(fileName:any, fileType:any) {
  const s3 = new AWS.S3();
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  const promise = new Promise((resolve, reject)=>{
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.error(err);
        throw(err);
      }
      const returnData = {
        signedRequest: data,
        url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      resolve(returnData);
    });
  }) 
  return promise;
}
