# Project Service

This is the project microservice for the Adio project. It is reponisbile for creating, reading, and updating projets.

## Types
### Project
**_id**: `string` Unique ID of a project. 

**name**: `string` Name of the project

**groupId**: `string` Unique ID of the group that this project belongs to.

### ProjectInput
**name**: Name of the new project

**groupId**: Unique ID of the group that the project belongs to.


## Endpoints

### Get Projects
##### Endpoint:
**GET** `/projects?ids=[id,id,id]`

##### Returns:
`Array<Project>`

Used for fetching multiple projects by ids. You must include the `ids` query param as a comma separated list of project ids.

### Get Project
##### Endpoint:
**GET** `/projects/{id}`

##### Returns:
`Project`

Used For fetching one project by id.

### Create Project
##### Endpoint:
**POST** `/projects`

##### Params:
`ProjectInput`

##### Returns:
`Project`

### Set Group
##### Endpoint
**PUT** `projects/{id}/group`

##### Params:
```javascript
{ groupId: string }
```

##### Returns:
`Project`

Sets the projects group to the provided group id