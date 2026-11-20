export const PAGE_SIZE = 10;

const BACKEND_FIRST_PAGE = 0;

export const toBackendPage = (uiPage) => uiPage - 1 + BACKEND_FIRST_PAGE;

export const getTotalPages = (totalItems, pageSize = PAGE_SIZE) =>
  Math.max(1, Math.ceil(totalItems / pageSize));