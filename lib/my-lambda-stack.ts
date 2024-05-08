import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
export class MyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Function(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler.handler",
      code: Code.fromAsset(path.join(__dirname, "lambda"),
      // get code from additional inpput repo
      // code: Code.fromAsset(path.join(__dirname, "cdk-lambda-child")),
    });
  }
}
