import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD5Rj5k-wVyQ2qHiVxBkEcI2CF5BxZXfR0",
    authDomain: "bizbuzzz-test-ba0c1.firebaseapp.com",
    databaseURL: "https://bizbuzzz-test-ba0c1.firebaseio.com",
    projectId: "bizbuzzz-test-ba0c1",
    storageBucket: "bizbuzzz-test-ba0c1.appspot.com",
    messagingSenderId: "890655013991",
    appId: "1:890655013991:web:1691dee3857be53e"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** API ***
    categories = () => this.db.ref('categories');
    category = id => this.db.ref(`categories/${id}`);
}

export default Firebase;