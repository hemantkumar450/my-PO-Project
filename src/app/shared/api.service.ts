export class ApiUrl {
  static localUrl = 'http://localhost:5000/api/';
  static prodUrl = '/api/';

  /* this is for production or development url */
  static prodMode = false;
  static baseUrl: string = ApiUrl.prodMode === true ? ApiUrl.prodUrl : ApiUrl.localUrl;

}
