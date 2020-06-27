#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkTsBoilerplateStack } from './cdk-ts-boilerplate-stack';

const app = new cdk.App();
new CdkTsBoilerplateStack(app, 'CdkTsBoilerplateStack');
