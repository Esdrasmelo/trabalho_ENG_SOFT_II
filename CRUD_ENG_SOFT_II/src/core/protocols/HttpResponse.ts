export interface HttpResponseOut {
  status: number;
  data: any;
}

export const okResponse = (data?: any): HttpResponseOut => {
  return {
    data,
    status: 200,
  };
};

export const notFoundResponse = (data?: any): HttpResponseOut => {
  return {
    data,
    status: 404,
  };
};

export const badRequestResponse = (data?: any): HttpResponseOut => {
  return {
    data,
    status: 400,
  };
};

export const createdResponse = (data?: any): HttpResponseOut => {
  return {
    data,
    status: 201,
  };
};


export const internalServerErrorResponse = (data?: any): HttpResponseOut => {
  return {
    data,
    status: 500,
  };
};