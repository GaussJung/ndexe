/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/

// snippet-sourcedescription:[sample.js demonstrates how to get started using the AWS SDK for JavaScript.]
// snippet-service:[nodejs]
// snippet-keyword:[JavaScript]
// snippet-sourcesyntax:[javascript]
// snippet-keyword:[Code Sample]
// snippet-keyword:[Node.js]
// snippet-sourcetype:[full-example]
// snippet-sourcedate:[2018-06-02]
// snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html

// snippet-start:[GettingStarted.JavaScript.NodeJS.getStarted]
// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

// 기존에 생성된 버킷명 지정 (만들어진 버킷 2022.03 )
var bucketName = "data.nuriblock.com"; //  'soma-node-sdk-sample-' + uuid.v4();
// Create name for uploaded object key
var keyName = '/tmp/hello_world.txt';

// Create a promise on S3 service object
// var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
 

try {
    
    let objectParams = {Bucket: bucketName, Key: keyName, Body: 'Nice To S3 World'};
    
    // Create object upload promise
    let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();

    uploadPromise.then(
        function(data) {
            console.log("SampleFix Successfully uploaded data to " + bucketName + "/" + keyName);
        }
    );
}
catch (err) {  
      console.error(err, err.stack);
} 

 
// snippet-end:[GettingStarted.JavaScript.NodeJS.getStarted]