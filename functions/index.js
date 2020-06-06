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
    const filtered = parsed.filter((item) => item.userId === data.userId);
    
    return ({ data: filtered  });
    
});

exports.favoriteProducts = functions.https.onCall(async (data, context) => {
    db.collection("favoriteProducts").add({
        userId: data.userId,
        products: data.products
    })
    .then(() => {
        console.warn('yes');
        return 1;
    })
    .catch((error) => {
        console.warn('error');
    })
});