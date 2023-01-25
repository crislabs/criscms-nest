import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import { CreateArticle, UpdateArticle, UpdateContentArticle, UpdateLikesArticle, UpdateTagsArticle } from '../dto/article.input';
import { CreateProduct, UpdateProduct } from '../dto/product.input';
import { InputImage, UpdateImage, UpdateImageProduct } from '../dto/site.input';

export function articleCreated({
  name,
  description,
  siteId,
  parentId,
  uid,
}: CreateArticle) {
  return {
    _id: new Types.ObjectId(),
    parentId: parentId,
    slug: slug(name),
    data: {
      siteId: siteId,
      author: uid,
      name: name,
      description: description,
      
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'article created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function articleUpdated({ name, description, uid }: UpdateArticle) {
  return {
    $set: {
      'data.name': name,
      'data.description': description,
      'data.updateDate.lastUpdatedAt': new Date(),
      slug: slug(name),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'article updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleContentUpdated({ content, uid }: UpdateContentArticle) {
  return {
    $set: {
      'data.content': content,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'article content updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleTagsUpdated({ tags, uid }: UpdateTagsArticle) {
  return {
    $set: {
      'data.tags': tags.map((data) => ({
        uid: uuidv3(),
        text: data,
        slug: slug(data),
      })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'article tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleLikesUpdated({ uid }: UpdateLikesArticle) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
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
        change: 'comment likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleDisLikesUpdated({ uid }: UpdateLikesArticle) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
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
        change: 'comment dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleImageUpdated({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.thumbnail': {
        uid: uuidv3(),
        src: src,
        alt: alt,
      },
      'data.seoArticle.image.src': src,
      'data.seoArticle.image.alt': alt,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'article image updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function typeProduct(type: string) {
  let data: string;
  switch (type) {
    case 'adoption':
      data = 'Adoption';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
