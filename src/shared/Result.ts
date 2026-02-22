/**
 * Standardized Business Error structure
 */
export type BusinessError = {
  code: string;
  message: string;
  status?: number; // Optional: to map directly to HTTP if needed
};

export type Result<T> = 
  | { success: true; data: T } 
  | { success: false; error: BusinessError };

export const Success = <T>(data: T): Result<T> => ({ success: true, data });
export const Failure = (error: BusinessError): Result<any> => ({ success: false, error });