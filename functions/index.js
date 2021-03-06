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
    const fav = data.favoriteProducts;
    const addDoc = firestore.collection('favoriteProducts').add(fav).then(ref => {
        console.log('Added document with ID: ', ref.id);
        return({ data: ref });
      });
});

exports.getFavoritesByUser = functions.https.onCall(async (data, context) => {
    const userId = data.userId;
    const snapshot = await firestore
        .collection('favoriteProducts')
        .get();
    const parsed = snapshot.docs.map(doc => doc.data());
    const filtered = parsed.filter((item) => item.userId === userId);
    return ({ data: filtered });
});

exports.createOrders = functions.https.onCall(async (data, context) => {
    const order = data.createOrders;
    const addDoc = firestore.collection('orders').add(order).then(ref => {
        console.log('Added document with ID: ', ref.id);
        return({ data: ref });
      });
});
