import database from '../firebase/firebase';

export const startSetLike = (dbLocation, parentId, likes) => {
    return() => {
        return database.ref(`${dbLocation}/${parentId}`).update({ likes })
    }
};
