class ApiResponse {
  constructor(success, data,message="success") {
    this.statusCode = statusCode
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;  
  }
}
export { ApiResponse };