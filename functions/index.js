const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.getAllProducts =
    functions.https.onRequest(
        async (req, res) => {
            const snapshot = await firestore
                .collection('products')
                .get();
            const parsed = snapshot.docs.map(doc => doc.data());
            res.send({ data: parsed });
        }
    );

exports.getAllCategories = 
    functions.https.onRequest(
        async (req, res) => {
            const snapshot = await firestore
                .collection('categories')
                .get();
            const parsed = snapshot.docs.map(doc => doc.data());
            res.send({ data: parsed });
        }
    );

exports.getProductsByUserId = functions.https.onCall(async (data, context) => {
    const snapshot = await firestore
            .collection('orders')
            .get();
    const parsed = snapshot.docs.map(doc => doc.data());
    
    return ({ data: parsed  });
    
});

// exports.getProductsByUserId =
//     functions.https.onRequest(
//         async (req, res) => {
//             // const collectionRef = firestore.collection('orders')

//             // const snapshot = await collectionRef.where('userId' === data.userId);
//             // const parsed = snapshot.docs.map(doc => doc.data());
//             res.send({ data: req  });
//         }
//     );