import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { addTrack } from '../transactions/addTrack';

export const addTrackHandler = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const projectId = event.pathParameters.id;
  const trackId: string = JSON.parse(event.body).trackId;

  try {
    const db = await mongo();

    const project = await addTrack(db, projectId, trackId);

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
