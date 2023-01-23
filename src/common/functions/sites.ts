import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateSite,
  InputImage,
  UpdateAdminSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from '../dto/site.input';

export function siteCreated({
  name,
  type,
  uid,
}: CreateSite) {
 
  return {
    _id: new Types.ObjectId(),
    data: {
      name: name,
      type: {
        label: typeSite(type),
        slug: slug(type),
      },
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'created site',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function siteUpdate({ id, uid, name }: UpdateSite) {
  
  return {
    $set: {
      'data.name': name,
      
      'data.updateDate.lastUpdatedAt': new Date(),
      
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'updated site',
        updatedAt: new Date(),
      },
    },
  };
}
export function siteDBUpdate({ id, type }: UpdateDB) {
  return {
    $set: {
      'data.dbSite': type.map((data) => ({
        label: capitalizar(data),
        slug: slug(data),
      })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        change: 'updated site db',
        updatedAt: new Date(),
      },
    },
  };
}
export function siteAdminUpdate({ admin }: UpdateAdminSite) {
  return {
    $set: {
      'data.adminSite': admin.map((data) => ({
        privilege: data.privilege,
        sid: data.sid,
      })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        change: 'updated admin user',
        updatedAt: new Date(),
      },
    },
  };
}
export function siteImageUpdate({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    $set:
      type === 'logo'
        ? {
            'data.imageSite.logo': {
              src: src,
              alt: alt,
            },
            'data.updateDate.lastUpdatedAt': new Date(),
          }
        : type === 'banner'
        ? {
            'data.imageSite.banner': {
              src: src,
              alt: alt,
            },
            'data.updateDate.lastUpdatedAt': new Date(),
          }
        : {
            'data.imageSite.icon': {
              src: src,
              alt: alt,
            },
            'data.updateDate.lastUpdatedAt': new Date(),
          },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: `${type} image update`,
        updatedAt: new Date(),
      },
    },
  };
}

// export function siteFindOne(id: string) {
//   return {
//     filter: { _id: id.toString() },
//     projection: {},
//     options: { lean: true },
//   };
// }

export function typeSite(type: string) {
  let data: string;
  switch (type) {
    case 'food':
      data = 'Food';
      break;
    case 'pet':
      data = 'Pet';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
// export function typeDbSite(type: string) {
//   let data: string;
//   switch (type) {
//     case 'adoption':
//       data = 'Adoption';
//       break;
//     case 'pet':
//       data = 'Pet';
//       break;

//     default:
//       console.log(`Sorry, we are out of ${type}.`);
//       break;
//   }
//   return data;
// }
