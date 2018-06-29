
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/* Testing Feed reader using Jasmin */

$(function() {

    //Testing suite for RSS Feeds definitions 

    describe('RSS Feeds', function() {

        //Test ensures that allFeeds variable defined
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Test ensures that allFeeds array elements URL are defined

        it('it has a URL defined',()=>{
            allFeeds.forEach((e)=>{
                expect(e.url.length).not.toBe(0)
            })
        })
        
        //Test ensures that allFeeds array elements names are defined

        it('it has a name defined',()=>{
            allFeeds.forEach((e)=>{
                expect(e.name.length).not.toBe(0)
            })
        })
    });


    /*  Test suite for the feeds menu */

    describe('The menu',function(){

        // test ensure menu hidden by defulte 

        var menu = document.querySelector('body').classList.value;
        it('the menu element is hidden by default',()=>{
            expect(menu).toBe("menu-hidden")
        })
        
        // test ensure the menu visable in click hidden when click again

        it('the menu changes visibility when clicked',()=>{

            var menuIcon = document.querySelector('.menu-icon-link');
            var body = $('body'); 
            
            // when open

            $(menuIcon).trigger('click');
            expect(body.hasClass("menu-hidden")).toBe(false);

            //when close

            $(menuIcon).trigger('click');
            expect(body.hasClass("menu-hidden")).toBe(true);
               
            })


    })


        /*  Test suite for Initial Entries */

    describe('Initial Entries',function(){

        // Test ensures there is at least a single entry 
        // with feed container when loadFeed() is called

        beforeEach(
            function(done){
                loadFeed(0, function(){
                    done()
            });
        })

        it("1 entry after loadFeed function is called", function(done) {
            var numEntries = $('.feed .entry').length
            expect(numEntries).toBeGreaterThan(0);
            done();
          })


        })

    /* Test suite for the new feed selection */

    describe('New Feed Selection', function() {
        var oldFeed;

        //Test ensures that when a new feed is loaded content changes

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();          
        
                loadFeed(1, function(){
                    done()
                });
            });
        });

        it('new feed is loaded', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
        });
    });
}());
