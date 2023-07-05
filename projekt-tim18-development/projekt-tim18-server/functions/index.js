const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var admin = require("firebase-admin");


var serviceAccount = require("./upw-projekt-5031c-firebase-adminsdk-1mlex-1e127c0e99.json");
const { databaseURL } = require('firebase-functions/params');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://upw-projekt-5031c.firebaseio.com"
});

const db = admin.firestore();


app.get('/hello', (request, response) => {
    return response.send('Hello world');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get('/smjestaj', (request, response) => {
    let res = []
    if (typeof request.query.id === 'undefined') {
        db.collection('smjestaj').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    res.push(document)
                })
                return response.send(res)
            })
            .catch(function (error) {
                return response.send("Error getting docs: " + error)
            })
    } else {
        var docRef = db.collection('smjestaj').doc(request.query.id)
        docRef.get()
            .then((doc) => {
                if (typeof doc.data() !== 'undefined') {
                    console.log('doc', doc.data())
                    let document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    return response.send(document)
                } else {
                    return response.send(
                        "Error getting document " +
                        request.query.id +
                        ": The document is undefined"
                    )
                }
            })
            .catch(function (error) {
                return response.send(
                    "Error getting document " +
                    request.query.id +
                    ": " + error
                )
            })
    }
})

app.put('/korisnici', (request, response) => {
    if (Object.keys(request.body).length) {
        if (typeof request.query.id !== 'undefined') {
            db.collection('korisnici')
                .doc(request.query.id)
                .set(request.body)
                .then(function () {
                    return response.send(
                        "Document successfully written - " +
                        "updated!"
                    )
                })
                .catch(function (error) {
                    return response.send(
                        "Error writing document: " + error
                    )
                })
        } else {
            return response.send(
                "A parameter id is not set. " +
                "A document is not updated!"
            )
        }
    } else {
        return response.send(
            "No post data for new document. " +
            "A document is not updated!"
        )
    }
})

app.post('/termin', (request, response) => {
    if (Object.keys(request.body).length) {
        db.collection('termin').doc().set(request.body)
            .then(function () {
                return response.send(
                    "Document successfully written - created!"
                )
            })
            .catch(function (error) {
                return response.send(
                    "Error writing document: " + error
                )
            })
    } else {
        return response.send(
            "No post data for new document. " +
            "A new document is not created!"
        )
    }
})


app.delete('/smjestaj', (request, response) => {
    if (typeof request.query.id !== 'undefined') {
        db.collection('smjestaj').doc(request.query.id).delete()
            .then(function () {
                return response.send(
                    "Document successfully deleted!"
                )
            })
            .catch(function (error) {
                return response.send(
                    "Error removing document: " + error
                )
            })
    } else {
        return response.send(
            "A parameter id is not set. " +
            "A document is not deleted!"
        )
    }
})