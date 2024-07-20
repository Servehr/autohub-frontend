import categories from "./categories";

export const getCategoryRoute = (category_id) => {
  let category = categories.filter(
    (category) => category.id === category_id
  )[0];
  let categoryLink = category.link;

  return categoryLink;
};

export const generateProductDetailsRouteWithSlugUrl = (category_id, slug) => {
  return `${getCategoryRoute(category_id)}/${slug}`;
};
export const generateProductDetailsRouteWithIDUrl = (category_id, id) => {
  return `/product/details/id`;
};
