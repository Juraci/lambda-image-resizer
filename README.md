# lambda-image-resizer
[![Build Status](https://travis-ci.org/Juraci/lambda-image-resizer.svg?branch=master)](https://travis-ci.org/Juraci/lambda-image-resizer)

### What

This is an **Amazon AWS lambda function** that automatically resizes images to smaller resolutions when they are uploaded to a S3 bucket on Amazon, so you can save some bandwidth, storage space and money.

### How

All you will need is the **index.zip** file that sits in the root path of this project.

###### Creating the lambda

1. Create a new lambda on Amazon AWS
2. Put imageResizer as the name
3. Leave Node.js 4.3 as the Runtime option
4. In Lambda function code select "Upload .ZIP file"
5. In Lambda function handler and role
  - 5.1 leave index.imageResizer as the Handler
  - 5.2 leave lambda_s3_exec_role as the Role
6. Select 512 as memory (should be enough for most images)
7. Use at least 1 minute as timeout (extra margin just to be safe) 
8. Click Next
9. Click Create Function

###### Configuring the lambda

1. Go to Event Sources tab
2. Select S3 as the venvent source type
3. Select the target Bucket
4. Select Object Created > Put as the Event type
5. Optionally you can filter by the folder inside your bucket
6. Optionally you can filter the type of files you want to target (the funciton will ignore anything that isn't a jpeg or png file).

If all the configuration is correct you should be able to upload an image to your target bucket (and folder if that is tha case) and see that it was resized after the upload.
You can check the logs in `CloudWatch > LogGroups > aws/lambda/imageResizer`

### Changing the target size

First run `npm install` to install all the dependencies locally. You can change the target size in the **config.js** file. 
```
/*jslint node: true */
"use strict";

/* The GM library will keep the aspect ratio  */
var config = function() {
    return {
        width: 640,
        height: 640
    };
};
```

Then just compact the following files and folders into a zip file:
- lib 
- node_modules 
- index.js 
- config.js

If you have the zip command line program installed you can simply run:
`$ npm run build`

This command will automatically compact all the necessary files into a index.zip file in the root folder.
