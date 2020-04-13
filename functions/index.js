const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestone = admin.firestore();

exports.getAllProducts =
    functions.https.onRequest(
        async (req, res) => {
            const snapshot = await firestone
                .collection('products')
                .get()
            res.send(snapshot.docs.map(doc => doc.data()))
        }
    );
