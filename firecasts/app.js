const inputField = document.getElementById('inputField');
const content = document.getElementById('content');
const btn = document.getElementById('btn');
const loadBtn = document.getElementById('loadBtn');

const docRef = db.doc('/mydata/mydoc');     //db.doc() 
btn.addEventListener('click',function(e){
    var textV = inputField.value;
    docRef.set({
        email: textV
    })
    .then(res=>{
        console.log('yes seved!')
    }).catch(err=>{
        console.log(err);
    });
});
loadBtn.addEventListener('click',function(e){
    docRef
        .get()
        .then(res=>{
            content.innerText = res.data().email
        }).catch(err=>{
            console.log(err);
        });
});
const realTimeupdate = function(){ //it fire everytime when we change data
    docRef.onSnapshot(function(doc){
        if(doc && doc.exists){
            content.innerText = doc.data().email
        }
    });
};
realTimeupdate();