import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getManyProjects } from '../transactions/getManyProjects';

export const getMany = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const projectIdsParam = event.queryStringParameters.ids;

  const projectIds = projectIdsParam.split(',');

  try {
    const db = await mongo();
    const projects = await getManyProjects(db, projectIds);

    cb(
      null,
      makeResponse(200, {
        projects,
      })
    );
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
