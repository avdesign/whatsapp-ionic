export const environment = {
  production: true,
  api: {
    protocol: 'http',
    //host: '192.168.0.106:8000',
<<<<<<< HEAD
    host: '192.168.1.7:8000',
=======
    host: '192.168.1.8:8000',
>>>>>>> c6455957a960e28a11eca47fec1e9cb2be53edc4
    get url(){
      return `${this.protocol}://${this.host}/api`;
    }
  },
  //baseFilesUrl: `http://192.168.0.106:8000/storage`,
<<<<<<< HEAD
  baseFilesUrl: `http://192.168.1.7:8000/storage`,
=======
  baseFilesUrl: `http://192.168.1.8:8000/storage`,
>>>>>>> c6455957a960e28a11eca47fec1e9cb2be53edc4
  //showFirebaseUI: !document.URL.startsWith('file:///')
  showFirebaseUI: false
};