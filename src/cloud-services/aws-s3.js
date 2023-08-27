import AWS from "aws-sdk";
import {awsCredentials} from './aws.credential';

export const getSignedUrl = ({
                                 Bucket = awsCredentials.Bucket,
                                 Key,
                                 Expires = awsCredentials.Expires
                             }) => {
    const s3 = new AWS.S3;
    return s3.getSignedUrl('getObject', {
        Bucket,
        Key,
        Expires,
    });
}

export const getAwsCredential = () => {
    AWS.config.update({
        region: awsCredentials.region,
        accessKeyId: awsCredentials.accessKeyId,
        secretAccessKey: getSecretAccessKey(awsCredentials.secretAccessKey),
    });
}
const getSecretAccessKey = (key) => {
    return window.atob(key);
}
