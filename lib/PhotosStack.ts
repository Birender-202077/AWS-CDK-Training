import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Fn } from 'aws-cdk-lib';

export class PhotosStack extends cdk.Stack {

    private stackSuffix: string;
    public readonly photoBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix();

        const myPhotoBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `photo-bucket-${this.stackSuffix}`
        });

        this.photoBucketArn = myPhotoBucket.bucketArn;  //new way of exporting

        //exporting the bucket
        // new cdk.CfnOutput(this, 'photo-bukcet', {
        //     value: myPhotoBucket.bucketArn,
        //     exportName: 'photo-bucket'
        // })


        // if we change the construct it of the bucket but leave the physical name same then it will throw error 
        // first it will create a new resource for changed construct id.
        // then it will delete the old one. If first step failed then second will not execute.

        // changing the logical id -- (save the bucket in a variable)

        // (myPhotoBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket2257jh8')
    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}