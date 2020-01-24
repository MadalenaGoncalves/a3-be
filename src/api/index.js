'use strict';

import HttpStatus from 'http-status-codes';

import query from './query';
import * as contacts from './contacts';
import * as images from './images';
import * as projects from './projects';
import * as fileUtils from '../utils/fileUtils';
import { handleError, handleNotModified } from '../utils/responseUtils';


export async function getAllProjectsWithThumbnails() {
  try {
    const data = await query(projects.getAllWithThumbnails());
    const json = {};
    json.status = HttpStatus.OK;
    json.data = data;

    return json;
  } catch (err) {
    return handleError(err);
  }
}

export async function getOneProjectWithRelations(req) {
  try {
    const project = await query(projects.getOne(req.params.id));
    const data = project[0];

    const relations = {};
    let hasRelations = false;

    const mainImage = await query(images.getOneThumbnail(req.params.id));
    if (!!mainImage){
      hasRelations = true;
      relations.thumbnail = mainImage[0];
    }

    const photos = await query(images.getAllPhotosByProjectId(req.params.id));
    if (!!photos) {
      hasRelations = true;
      relations.photos = photos;
    };

    const designs = await query(images.getAllDesignsByProjectId(req.params.id));    
    if (!!designs) {
      hasRelations = true;
      relations.designs = designs;
    };

    const json = {};
    json.status = HttpStatus.OK;
    json.data = data;
    if (hasRelations) {
      json.relations = relations;
    }
    return json;
  } catch(err) {
    return handleError(err);
  }
}

export async function getAllContactsWithPhoto() {
  try {
    const data = await query(contacts.getAllWithPhoto());
    const json = {};
    json.status = HttpStatus.OK;
    json.data = data;

    return json;
  } catch (err) {
    return handleError(err);
  }
}

export async function getOneContactWithPhoto(req) {
  try {
    const contact = await query(contacts.getOneWithPhoto(req.params.id));
    const json = {};
    json.status = HttpStatus.OK;
    json.data = contact[0];

    return json;
  } catch (err) {
    return handleError(err);
  }
}

// POST
export async function createProject(req) {
  try {
    const image = await query(images.createMinimal(req.body.image));
    const projectData = req.body.project;
    projectData.image = image.insertId;
    const project = await query(projects.create(projectData));

    const json = {};
    json.status = HttpStatus.CREATED;
    json.data = {
      projectId: project.insertId,
      imageId: image.insertId,
    }
    return json;
  } catch (err) {
    return handleError(err);
  }
}

export async function createContact(req) {
  try {
    const image = await query(images.createMinimal(req.body.image));
    const contactData = req.body.contact;
    contactData.image = image.insertId;
    const contact = await query(contacts.create(contactData));

    const json = {};
    json.status = HttpStatus.CREATED;
    json.data = {
      contactId: contact.insertId,
      imageId: image.insertId,
    }
    return json;
  } catch (err) {
    return handleError(err);
  }
}

// PATCH
export async function updateProjectMeta(req) {
  if (!req.params.id) {
    return handleNotModified();
  }
  if (!req.body.project && !req.body.image) {
    return handleNotModified();
  }

  try {
  const id = req.params.id;
  const projectData = req.body.project ? JSON.parse(req.body.project) : undefined;
  const imageData = req.body.image ? JSON.parse(req.body.image) : undefined;

  if (imageData) {
    // A file already exists
    if (imageData && imageData.id) {
      const { id, ...data } = imageData;
      if (req.files) {
        fileUtils.deleteFileById(id);
        fileUtils.saveFile(req.files.file, id);
      }
      await query(images.update(id, data));
    }
    
    // No file exists yet
    if (imageData && !imageData.id) {
      const createdImage = await query(images.createMinimal(imageData));
      if (projectData) {
        projectData.image = createdImage.insertId;
      }

      if (req.files) {
        fileUtils.saveFile(req.files.file, createdImage.insertId);
      }
    }
  }

  if (projectData) {
    await query(projects.update(id, projectData));
  }
  
  const json = {};
  json.code = HttpStatus.OK;
  return json;
  } catch (err) {
    return handleError(err);
  }
}

// router.patch('/images/:id', async function(req, res) {
//   const result = await query(images.update(req.params.id, req.body));
//   handleResponse(res, result);
// });

export async function updateContact(req) {
  try {
    const imageData = req.body.image ? JSON.parse(req.body.image) : undefined;
    const contactData = req.body.contact ? JSON.parse(req.body.contact) : undefined;

    // A file already exists
    if (imageData && imageData.id) {
      const { id, ...data } = imageData;
      if (req.files) {
        fileUtils.deleteFileById(id);
        fileUtils.saveFile(req.files.file, id);
      }
      await query(images.update(id, data));
    }
    
    // No file exists yet
    if (imageData && !imageData.id) {
      const createdImage = await query(images.createMinimal(imageData));
      contactData.image = createdImage.insertId;

      if (req.files) {
        fileUtils.saveFile(req.files.file, createdImage.insertId);
      }
    }

    if (constactData) {
      await query(contacts.update(req.params.id, contactData));
    }

    const json = {};
    json.status = !imageData && !contactData ? HttpStatus.NOT_MODIFIED : HttpStatus.OK;
    return json;
  } catch (err) {
    return handleError(err);
  }
}

// TODO delete also images from fs
export async function deleteProject(req) {
  try {
    await query(images.deleteAllByProjectId(req.params.id));
    await query(projects.deleteOne(req.params.id));
    
    const json = {};
    json.status = HttpStatus.OK;
    return json;
  } catch (err) {
    return handleError(err);
  }
}

// TODO delete also image from fs
export async function deleteContact(req) {
  try {
    await query(images.deleteOneByContactId(req.params.id));
    await query(contacts.deleteOne(req.params.id));
    
    const json = {};
    json.status = HttpStatus.OK;
    return json;
  } catch (err) {
    return handleError(err);
  }
}


// AUTH
// TODO
export async function login(req) {
  const json = {};
    json.status = HttpStatus.OK;
    return json;
}
// TODO
export async function logout(req) {
  const json = {};
  json.status = HttpStatus.OK;
  return json;
}
