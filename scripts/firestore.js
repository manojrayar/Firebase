const userdetails=document.querySelector('.userdetails')

function firestoreUserdata(user){
    var db=firebase.firestore();
    db.collection("users").doc(user.uid).set({
        firstName: user.displayName,
        lastName:"",
        email: user.email,
        number:"",
        interest: ""
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

}

function fetchuserdetails(userId){
    if(userId){
        var db=firebase.firestore();
        db.collection('users').doc(userId).get()
        .then(querySnap=>{
            var details=querySnap.data()
            userdetails.innerHTML=`
            <h1>Username: ${details.firstName}</h1>
            <h1>Email address: ${details.email}</h1>
            `
            
        })
    }
    else{
        userdetails.innerHTML="<h1>You need to login first</h1>"
    }
   
}