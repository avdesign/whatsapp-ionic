export const environment = {
  production: true,
  api: {
    protocol: 'http',
    //host: '192.168.0.106:8000',
    host: '192.168.1.7:8000',
    get url(){
      return `${this.protocol}://${this.host}/api`;
    }
  },
  //baseFilesUrl: `http://192.168.0.106:8000/storage`,
  baseFilesUrl: `http://192.168.1.7:8000/storage`,
  //showFirebaseUI: !document.URL.startsWith('file:///')
  showFirebaseUI: false
};
 