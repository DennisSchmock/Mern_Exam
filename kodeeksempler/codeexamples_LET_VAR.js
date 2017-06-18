/**
 * Created by Dennis on 18-06-2017.
 */
function footarate() {
    //Foo er ikke synlig her
    //console.log("Foo" + foo) //fejl
    for( let foo = 0; foo < 5; foo++ ) {
        console.log("Foo: " + foo)
    }
    //Foo er ikke synlig her
   //console.log("Foo" + foo) //fejl
}

function barLoop() {
    //bar er synlig her
    console.log("før forloop: " + bar)
    for( var bar = 0; bar < 5; bar++ ) {
        //bar er synlig i hele funktionen
        console.log("bar: " + bar)

    }
    console.log("efter forloop" + bar)
    //bar er synlig her
}

footarate()
barLoop()