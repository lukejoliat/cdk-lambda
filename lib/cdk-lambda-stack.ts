import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { MyPipelineAppStage } from "./my-pipeline-app-stage";
import { CfnRole } from "aws-cdk-lib/aws-iam";

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "MyPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("lukejoliat/cdk-lambda", "main"),
        additionalInputs: {
          "cdk-lambda-child": CodePipelineSource.gitHub(
            "lukejoliat/cdk-lambda-child",
            "main"
          ),
        },
        commands: [
          "npm ci",
          "printenv",
          "npm run build",
          "printenv",
          "npx cdk synth",
          "printenv",
        ],
      }),
    });

    pipeline.addStage(
      new MyPipelineAppStage(this, "test", {
        env: { account: "109095901433", region: "us-east-1" },
      })
    );
  }
}
