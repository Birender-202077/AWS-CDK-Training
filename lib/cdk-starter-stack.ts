import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    //using l3 constructs
    new Bucket(this, "myL3Bucket", {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    });
  }
}


export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ------------------ creating an s3 bucket in three ways -----------------------------

    //using l1 constructs 
    new CfnBucket(this, 'myL1Bucket', {
      //with cloudformation we need to call lifecycleconfiguration.
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled',
        }]
      }
    });

    //cdk deployment parameters
    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })

    //using l2 constructs
    const myL2Bucket = new Bucket(this, "myL2Bucket", {
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber)
      }]
    });

    new cdk.CfnOutput(this, 'myL2BucketName', {
      value: myL2Bucket.bucketName
    })


    new L3Bucket(this, "myL3Bucket", 3)

  }
}
