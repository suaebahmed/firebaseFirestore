
// ---------------------------------------------------------------------
var btn = document.getElementById('btn');
var reBtn = document.getElementById('result');
var content = document.getElementById('content');
var field = document.getElementById('input-field');

var r = ' '

reBtn.addEventListener('click',function(){
    db.collection('history')
    .orderBy('name')
    .get()
    .then(result=>{
        result.docs.forEach(doc=>{
            var data=doc.data();
            r += `<p data=${doc.id}> <i> ${data.name} </i></p>`
        })
        content.innerHTML = r  
// --------------------------------------------------------------
        const p=document.querySelectorAll('p');
        p.forEach(pbtn=>{
            pbtn.addEventListener('click',function(e){
                var att=e.target.getAttribute('data');
                console.log(att)
                db.collection('history')
                  .doc(`${att}`)
                  .delete().then(()=>{
                      console.log('successfully the item deleted')
                  }).catch(err=>{console.log(err)});
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

btn.addEventListener('click',function(e){
    var value = field.value;
    // db.collection('history').doc('mydocument1')
    db.doc('/history/mydocument1/views/guy')
    .set({
        name: value
    }).then(function(){
        console.log('successful y put it:',value)
    }).catch(err=>{
        console.log('err')
    })
});

getRealtimeUpdates = function(){
    db.collection('history')
      .onSnapshot(doc=>{//onSnapshot
          if(doc && doc.exists){
              console.log(doc);

              doc.docs.forEach(doc=>{
                var data=doc.data();
                r += `<p data=${doc.id}> <i> ${data.name} </i></p>`
            })
            content.innerText = r  
              }
      })
}
getRealtimeUpdates();