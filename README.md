# Project Service

This is the project microservice for the Adio project. It is reponisbile for creating, reading, and updating projets.

## Types
### Project
*`_id`*: `string` Unique ID of a project. 

*`name`*: `string` Name of the project

*`groupId`*: `string` Unique ID of the group that this project belongs to.

### ProjectInput
*`name`*: Name of the new project

*`groupId`*: Unique ID of the group that the project belongs to.


## Endpoints

### Get Projects
#### Endpoint:
`/projects?ids=[id,id,id]`

##### Returns:
`Array<Project>`

Used for fetching multiple projects by ids. You must include the `ids` query param as a comma separated list of project ids.