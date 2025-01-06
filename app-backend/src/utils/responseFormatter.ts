export const successResponse = (data: any, message: string = 'Success') => ({
    success: true,
    message,
    data,
  });
  
  export const errorResponse = (message: string, details: any = null) => ({
    success: false,
    message,
    details,
  });
  