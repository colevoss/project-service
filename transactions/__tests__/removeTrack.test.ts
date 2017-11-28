import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../../types/IProject';
import { removeTrack } from '../removeTrack';
import { mongo } from '../../utils/mongo';

let db: IDb;
let project: IProject;
let projectId: ObjectId;
let trackId = '5a19e73b951333456b4c88c3';
let trackId2 = '59dffede86597a6490ba7ea0';

beforeAll(async () => {
  db = await mongo();

  const projectInsert = await db
    .collection('projects')
    .insertOne({ name: 'Test Project', trackIds: [new ObjectId(trackId), new ObjectId(trackId2)] });

  projectId = projectInsert.insertedId;

  project = await removeTrack(db, projectId, trackId2);
});

afterAll(async () => {
  await db.close();
});

test('Adds a track id to the project', () => {
  expect(project.trackIds).toHaveLength(1);
  expect(project.trackIds[0]).toBeInstanceOf(ObjectId);
  expect(project.trackIds[0].toHexString()).toBe(trackId);
});
