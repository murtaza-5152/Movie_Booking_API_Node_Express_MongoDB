export var successResponseBody = {
  message: '',
  success: true,
  data: {},
};

export var errorResponseBody = {
  message: 'Internal Server Error !!',
  success: false,
  err: {},
};

export var badRequestResponse = {
  success: false,
  err: '',
  data: {},
  message: 'Malformed Request | Bad Request',
};
