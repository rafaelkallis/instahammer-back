/**
 * @file errors
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

export interface IClientError {
  isClientError: true;
  code: string;
  message: string;
}

export interface IServerError {
  isServerError: true;
  code: string;
  message: string;
}

const ClientErrorFactory = (code, message) => () => ({
  isClientError: true,
  code,
  message
});

const ServerErrorFactory = (code, message) => () => ({
  isServerError: true,
  code,
  message
});

export const INTERNAL_ERROR = ServerErrorFactory(
  "internal_error",
  "Request cannot be processed due to an internal error."
);

export const UNIMPLEMENTED_ERROR = ServerErrorFactory(
  "unimplemented_error",
  "The endpoint has not been implemented yet."
);

export const INTERNAL_DATABASE_ERROR = ServerErrorFactory(
  "internal_database_error",
  "Request cannot be processed due to an internal database error."
);

export const POST_NOT_FOUND_ERROR = ServerErrorFactory(
  "post_not_found_error",
  "No post found with the given id."
);
