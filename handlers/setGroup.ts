import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { setProjectGroup } from '../transactions/setProjectGroup';

export const setGroup = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const projectId = event.pathParameters.id;
  const groupId: string = JSON.parse(event.body).groupId;

  try {
    const db = await mongo();

    const project = await setProjectGroup(db, projectId, groupId);

    cb(null, makeResponse(200, { project }));
  } catch (e) {
    console.error(e);

    cb(
      e,
      makeResponse(500, {
        error: e.toString(),
      })
    );
  }
};
