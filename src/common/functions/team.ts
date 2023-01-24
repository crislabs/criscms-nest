import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateTeam,
  UpdateDetailTeam,
  UpdateLikesTeam,
  UpdatePriceTeam,
  UpdateTeam,
  UpdateSpecsTeam,
  UpdateTagsTeam,
} from '../dto/team.input';
import { UpdateImageSeo, UpdateImageProduct } from '../dto/site.input';

export function teamCreated({
  name,
  siteId,
  parentId,
  uid,
}: CreateTeam) {
  return {
    _id: new Types.ObjectId(),
    parentId: parentId,
    slug: slug(name),
    data: {
      name: name,
      siteId: siteId,
      // type: type,
      

      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'team created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function teamUpdated({ id, name, uid }: UpdateTeam) {
  return {
    $set: {
      'data.name': name,
      'data.updateDate.lastUpdatedAt': new Date(),
      slug: slug(name),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function teamDetailUpdated({ text, uid }: UpdateDetailTeam) {
  return {
    $set: {
      'data.details': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team detail updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function teamSpecsUpdated({ text, uid }: UpdateSpecsTeam) {
  return {
    $set: {
      'data.specs': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team specs updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function teamPriceUpdated({ price, discountPrice, inStock, uid }: UpdatePriceTeam) {
  return {
    $set: {
      'data.price': price,
      'data.discountPrice': discountPrice,
      'data.inStock': inStock,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team price updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function teamTagsUpdated({ tags, uid }: UpdateTagsTeam) {
  return {
    $set: {
      'data.tags': tags.map((data) => ({
        
        text: data,
        slug: slug(data),
      })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function teamLikesUpdated({ uid }: UpdateLikesTeam) {
  return {
    $set: {
      // 'data.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'data.likes': uid,
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function teamDisLikesUpdated({ uid }: UpdateLikesTeam) {
  return {
    $set: {
      // 'data.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $pull: {
      'data.likes': uid,
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'team dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function teamUpdateImage({
  id,
  images,
  type,
  uid,
}: UpdateImageProduct) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.images': images.map((data) => ({
        src: data.src,
        alt: data.alt,
      })),
      // 'data.seoTeam.image.src': images[0].src,
      // 'data.seoTeam.image.alt': images[0].alt,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image team update',
        updatedAt: new Date(),
      },
    },
  };
}
export function teamUpdateImageSeo({
  id,
  src,
  uid,
}: UpdateImageSeo) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.thumbnailUrl': src,
      // 'data.seoTeam.image.src': images[0].src,
      // 'data.seoTeam.image.alt': images[0].alt,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image for seo update',
        updatedAt: new Date(),
      },
    },
  };
}

export function typeTeam(type: string) {
  let data: string;
  switch (type) {
    case 'team':
      data = 'Team';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
