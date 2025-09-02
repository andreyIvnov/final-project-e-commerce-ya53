import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where, getDocs, updateDoc, getDoc } from 'firebase/firestore'
import db from '../Helpers/firebase.js'

const getUserByUserNameAndPassword = async (userName, password) => {
    const coll = collection(db, 'users');
    const q = query(coll, where('userName', '==', userName), where('password', '==', password))

    const querySnapshot = await getDocs(q);
    let userToReturn = {};
    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userToReturn = {
            id: doc.id,
            isAdmin: userData.isAdmin,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdOn: doc._document.createTime.timestamp,
        };
    })
    return userToReturn;
}

const getAllDocsByCollectionName = async (collectionName) => {
    let docsToReturn = [];
    if (collectionName) {
        const coll = collection(db, collectionName);
        const q = query(coll);
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            docsToReturn.push({
                id: doc.id,
                createdOn: doc._document.createTime.timestamp,
                ...data,
            });
        });
    }
    return docsToReturn;
}

const addNewDoc = async (collectionName, newDocToAdd) => {
    try {
        const newDoc = { ...newDocToAdd };
        const data = await addDoc(collection(db, collectionName), newDoc);
        if (data && data.id) {
            return { ...newDoc, id: data.id }
        } else {
            return {};
        }
    } catch (error) {
        console.error(error);
    }
}

const updateDocByDocId = async (collectionName, docId, docObj) => {
    if (collectionName && docId && docObj) {
        try {
            const resolveData = await updateDoc(doc(db, collectionName, docId), docObj)
        } catch (error) {
            console.error(error)
        }
    }
    else {
        console.error("fdbManager.updateDocByDocId: one or more passed params is null or undefined. ")
    }
}

const deleteDocByDocId = async (collectionName, docId) => {
    if (collectionName && docId) {
        try {
            const deleteDocResolveData = await deleteDoc(doc(db, collectionName, docId))
        } catch (error) {
            console.error(error)
        }
    }
    else {
        console.error("fdbManager.deleteDocByDocId: one or more passed params is null or undefined. ")
    }
}

const getDocByReference = (docReference) => getDoc(docReference);


export { getUserByUserNameAndPassword, addNewDoc, getAllDocsByCollectionName, updateDocByDocId, deleteDocByDocId, getDocByReference }