# lambda-image-resizer

## What

This is an Amazon AWS lambda function that resizes images to smaller resolutions when they are uploaded to a S3 bucket on Amazon, so you can save some bandwidth, storage space and money.

## How

All you will need is the index.zip file that sits in the root path of this project.

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
