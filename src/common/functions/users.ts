import { Types } from 'mongoose';
import { capitalizar, slug } from 'utils/function';
import { UpdatePage } from '../dto/page.input';
import { InputImage, UpdateImage } from '../dto/site.input';
import { CreateUser } from '../dto/user.input';
import * as bcrypt from 'bcrypt';

export async function  userCreated({
  role,
  email,
  image,
  username,
  password,
  oAuth,
  siteId,
}: CreateUser) {
  return {
    _id: new Types.ObjectId(),
    data: {
      role: role,
      picture: image,
      username: username,
      status: true,
      oAuth: {
        provider: oAuth ? oAuth : 'credentials',
      },
      siteId: siteId,
      password: await bcrypt.hash(password, 10),
    },
    updateDate: {
      createdAt: new Date(),
    },
    email: email.toLowerCase(),
    // password: await bcrypt.hash(password, 10),
  };
}

export function pageUpdate({ id, type, name, description, uid }: UpdatePage) {
  return {
    filter: { _id: id },
    update: {
      $set: {
        'data.type': type,
        'data.seoPage.name': capitalizar(name),
        'data.seoPage.href': slug(name),
        'data.seoPage.description': description,
        'data.updateData.lastUpdatedAt': new Date(),
        slug: slug(name),
      },
      $push: {
        'data.updateDate.register': {
          uid: uid,
          change: 'page update',
          updatedAt: new Date(),
        },
      },
    },
    options: { lean: true, new: true },
  };
}

export function pageUpdateImage({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    filter: { _id: id },
    update: {
      $set: {
        'data.seoPage.image.src': src,
        'data.seoPage.image.alt': alt,
        'data.updateDate.lastUpdatedAt': new Date(),
      },
      $push: {
        'data.updateDate.register': {
          uid: uid,
          change: 'image update',
          updatedAt: new Date(),
        },
      },
    },
    options: { lean: true, new: true },
  };
}

export function pageFindOne(id: string) {
  return {
    filter: { _id: id },
    projection: {},
    options: { lean: true },
  };
}

export function page0(id: string, uid: string) {
  return {
    name: 'home',
    description: 'home description',
    type: 'page blanck',
    parentId: id,
    siteId: id,
    uid: uid,
  };
}
