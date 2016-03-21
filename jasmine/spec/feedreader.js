$(function() {
    /* A new test suite named "RSS Feeds" */
    describe('RSS Feeds', function() {
        /* Make sure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function() {
            var arrayLength = allFeeds.length;
            //Make a loop that goes through the whole array
            for (i = 0; i < arrayLength; i++) {
                //It checks to make sure url's are defined
                expect(allFeeds[i].url).toBeDefined();
                //It checks to make sure the url is not empty
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            var nameArray = allFeeds.length;
            //Make a loop that goes through each name array
            for (i = 0; i < nameArray; i++) {
                //it checks to make sure the name array is defined
                expect(allFeeds[i].name).toBeDefined();
                //it checks to make sure the name array is not empty
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* "body" is the element that recieves the menu-hidden class
         * menu-hidden triggers the slide menu to be off screen via css
         */
        var element = $('body');
        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('are hidden', function() {
            //checks to see if body has recieved the menu-hidden class after load
            expect(element.hasClass('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('ensures the menu changes visibility when the menu icon is clicked', function() {
            /* using jquery to trigger click on menu-icon. And then test to see
             * if the menu-hidden class is removed
             */
            $('.menu-icon-link').trigger('click');
            expect(element.hasClass('menu-hidden')).toBeFalsy();

            /* using jquery to trigger another click on menu-icon. And then test to see
             * if the menu-hidden class is restored
             */
            $('.menu-icon-link').trigger('click');
            expect(element.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * using beforEach method to run loadFeed prior to test
         * and usind the done function to delay the test until after
         * asynchronous loadFeed is completed. done is used as a callback.
         */
        beforeEach(function(done) {
            loadFeed(1, done);
        });

        /* using jquery to gather all of the entries after loadFeed is run.
         * measure the length and then the test checks whether the length
         * is greater than zero, meaning there is at least one element
         */
        it('should have at least one .entry element after loadFeed is called', function() {
            var entryLength = $('.entry').length;
            expect(entryLength).toBeGreaterThan(0);
        });
    });

    /* A new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var topHeader,
            newTopHeader;

        /* beforeEach loads a new feed asynchronously, then in the call back, stores the content
         * of the first entry header in the variable topHeader.
         * Then calls the done function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                //storing the current text of the top entry
                topHeader = $('.entry h2:first').text();
                done();
            });
        });

        /* loads a new feed asynchronously, and then grabs the new content of the top entry
         * and compres it to the old one as a test. Then it calls the done function to end the test.
         */
        it('entry content should change', function(done) {
            loadFeed(2, function() {
                newTopHeader = $('.entry h2:first').text();
                expect(newTopHeader).not.toEqual(topHeader);
                done();
            });
        });
    });
}());