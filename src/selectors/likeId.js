import database from '../firebase/firebase';


const likeId = new Promise ((resolve, reject) => {
    const promise = (ref, parentId) => {
        let likeId = null;
        database.ref(`users/${ref}/likes`).once('value').then((snapshot) => {
            for (let i = 0; i < snapshot.length ; i++) {
                if (snapshot[i].val().parentId === parentId) {
                    console.log('EEEEEEEEEEE')
                    likeId = snapshot[i].key;
                }
            }
        });
        return likeId
    };
})



export default likeId;