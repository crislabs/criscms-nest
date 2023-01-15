import { Types } from 'mongoose';
import { slug } from 'utils/function';
import { CreatePage, UpdatePage } from '../dto/page.input';
import {
  InputImage,
  UpdateImage,
} from '../dto/site.input';

export function pageCreated({
  type,
  title,
  description,
  parentId,
  siteId,
  uid,
}: CreatePage) {
  return {
    _id: new Types.ObjectId(),
    dataPage: {
      // type: type,
      type: {
        label: typePage(type),
        slug: type,
      },
      title: title,
      description: description,
      
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'create page',
            updatedAt: new Date(),
          },
        ],
      },
      siteId: siteId,
    },
    parentId: parentId,
    slug: slug(title),
  };
}

export function pageUpdate({ id, type, title, description, uid }: UpdatePage) {
  return {
    $set: {
      'dataPage.type': {
        label: typePage(type),
        slug: type,
      },
      'dataPage.title': title,
      'dataPage.description': description,
      'dataPage.updateDate.lastUpdatedAt': new Date(),
      slug: slug(title),
    },
    $push: {
      'dataPage.updateDate.register': {
        uid: uid,
        change: 'update page',
        updatedAt: new Date(),
      },
    },
  };
}

export function pageUpdateImage({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    $set: {
      'dataPage.seoPage.image.src': src,
      'dataPage.seoPage.image.alt': alt,
      'dataPage.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataPage.updateDate.register': {
        uid: uid,
        change: 'image update',
        updatedAt: new Date(),
      },
    },
  };
}

// export function pageFindOne(id: string) {
//   return {
//     filter: { _id: id },
//     projection: {},
//     options: { lean: true },
//   };
// }

export function page0(id: string, uid: string) {
  return {
    title: 'home',
    description: 'home description',
    type: 'page-blank',
    parentId: id,
    siteId: id,
    uid: uid,
  };
}

export function typePage(type: string) {
  let data: string;
  switch (type) {
    case 'page':
      data = 'Page';
      break;
    case 'page-blank':
      data = 'Page Blank';
      break;
    case 'adoption':
      data = 'Adoption';
      break;
    case 'category':
      data = 'Category';
      break;
    case 'article':
      data = 'Article';
      break;
    case 'sub-category':
      data = 'Sub Category';
      break;
    case 'contact':
      data = 'Contact';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
