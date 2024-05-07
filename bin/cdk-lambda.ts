#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkLambdaStack } from "../lib/cdk-lambda-stack";

const app = new cdk.App();

new CdkLambdaStack(app, "CdkLambdaStack", {
  env: {
    account: "109095901433",
    region: "us-east-1",
  },
});

app.synth();
