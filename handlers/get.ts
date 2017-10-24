import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getProject } from '../transactions/getProject';

export const get = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const projectId = event.pathParameters.id;

  try {
    const db = await mongo();

    const project = await getProject(db, projectId);

    if (project == null) {
      cb(
        null,
        makeResponse(400, {
          error: `A group with the ID of ${projectId} could not be found`,
        })
      );

      return;
    }

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
