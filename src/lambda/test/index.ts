import 'source-map-support/register';
import { SNSEvent } from 'aws-lambda';

export const handler = (event: SNSEvent): SNSEvent => {
    console.log(event);
    return event;
};
