let misCabeceras = new Headers();

let miInit = { method: 'GET',
    headers: misCabeceras,
};

fetch('http://localhost/_api_movie/v1/movies',miInit)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        Object.values(myJson).forEach((details,index)=>{
            if(details !==200){
                let title = (details.spanish_title.length > 24) ? details.spanish_title.substring(0,24)+'...' : details.spanish_title;
                let overview = details.overview.substring(0,150)+'...';
                $('#grid').append('<div class="grid__item"><img src="'+details.posters+'" alt=""><span class="tooltip tooltip-effect-1"><span class="tooltip-item">'+title+'</span><span class="tooltip-content clearfix"><span class="tooltip-text">'+overview+'</div>');
            }
        });
        (function() {
            var body = document.body,
                dropArea = document.getElementById( 'drop-area' ),
                droppableArr = [], dropAreaTimeout;

            // initialize droppables
            [].slice.call( document.querySelectorAll( '#drop-area .drop-area__item' )).forEach( function( el ) {
                droppableArr.push( new Droppable( el, {
                    onDrop : function( instance, draggableEl ) {
                        // show checkmark inside the droppabe element
                        classie.add( instance.el, 'drop-feedback' );
                        clearTimeout( instance.checkmarkTimeout );
                        instance.checkmarkTimeout = setTimeout( function() {
                            classie.remove( instance.el, 'drop-feedback' );
                        }, 800 );
                        // ...
                    }
                } ) );
            } );

            // initialize draggable(s)
            [].slice.call(document.querySelectorAll( '#grid .grid__item' )).forEach( function( el ) {
                new Draggable( el, droppableArr, {
                    scroll : true,
                    scrollable : '#drop-area',
                    scrollSpeed : 40,
                    scrollSensitivity : 50,
                    draggabilly : { containment: document.body },
                    onStart : function() {
                        // add class 'drag-active' to body
                        classie.add( body, 'drag-active' );
                        // clear timeout: dropAreaTimeout (toggle drop area)
                        clearTimeout( dropAreaTimeout );
                        // show dropArea
                        classie.add( dropArea, 'show' );
                    },
                    onEnd : function( wasDropped ) {
                        var afterDropFn = function() {
                            // hide dropArea
                            classie.remove( dropArea, 'show' );
                            // remove class 'drag-active' from body
                            classie.remove( body, 'drag-active' );
                        };

                        if( !wasDropped ) {
                            afterDropFn();
                        }
                        else {
                            // after some time hide drop area and remove class 'drag-active' from body
                            clearTimeout( dropAreaTimeout );
                            dropAreaTimeout = setTimeout( afterDropFn, 400 );
                        }
                    }
                } );
            } );
        })();
    });
