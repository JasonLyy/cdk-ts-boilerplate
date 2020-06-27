import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
const lambdaDir = './dist/src/lambda';

export class CdkTsBoilerplateStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const testTopic = new sns.Topic(this, 'cdk-test-topic', {
            topicName: 'cdk-test-topic',
        });

        const testLambda = new lambda.Function(this, 'cdk-test-lambda', {
            functionName: `cdk-test-lambda`,
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset(`${lambdaDir}/test`),
            handler: 'index.handler',
            timeout: cdk.Duration.seconds(5),
        });

        testTopic.addSubscription(new subscriptions.LambdaSubscription(testLambda));
    }
}
