import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getProject } from '../transactions/getProject';
import { createProject } from '../transactions/createProject';
import { IProjectInput } from '../types/IProject';

export const create = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const projectInput: IProjectInput = JSON.parse(event.body);

  if (projectInput.groupId == null) {
    return cb(null, makeResponse(422, { error: 'A project must include a groupId' }));
  }

  try {
    const db = await mongo();

    const projectId = await createProject(db, projectInput);

    const project = await getProject(db, projectId);

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
