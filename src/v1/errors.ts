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

export const INTERNAL = ServerErrorFactory(
  "INTERNAL_ERROR",
  "Request cannot be processed due to internal error."
);
