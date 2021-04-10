const userdetails=document.querySelector('.userdetails')
const editprofileform=document.querySelector('#editprofileform')
const mymodal=document.querySelector("#modal3")

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
        db.collection('users').doc(userId)  //we can use .get() method to fetch the details 
        .onSnapshot(querySnap=>{            //we use .onSnapshot() method to fetch real-time data
            var details=querySnap.data()
            userdetails.innerHTML=`
            <h1>Email address: ${details.email}</h1>
            <h1>Firstname: ${details.firstName}</h1>
            <h1>Lastname: ${details.lastName}</h1>
            <h1>Interest: ${details.interest}</h1>
            <h1>Contact: ${details.number}</h1>
            <button class="btn modal-trigger" href="#modal3">Edit-Profile</button>
            `
            editprofileform['email'].value=details.email
            editprofileform['firstname'].value=details.firstName
            editprofileform['lastname'].value=details.lastName
            editprofileform['number'].value=details.number
            editprofileform['interest'].value=details.interest
            
        })
    }
    else{
        userdetails.innerHTML="<h1>You need to login first</h1>"
    }
   
}

function editProfile(e)
{
    e.preventDefault()
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({
        email:editprofileform['email'].value,
        firstName:editprofileform['firstname'].value,
        lastName:editprofileform['lastname'].value,
        number:editprofileform['number'].value,
        interest:editprofileform['interest'].value
    })
    .then(()=>{
        M.toast({html:"changes saved",classes:"rounded green lighten-1"})
        M.Modal.getInstance(mymodal).close()
    })
    .catch(err=>{
        M.toast({html:"Something went wrong",classes:"rounded red lighten-1"})
    })

   
    
}