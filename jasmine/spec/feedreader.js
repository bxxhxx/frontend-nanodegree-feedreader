/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
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


        /* TODO: Write a test that loops through each feed
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


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('are hidden', function() {
            /* "body" is the element that recieves the menu-hidden class
             * menu-hidden triggers the slide menu to be off screen via css
             */
            var element = $('body');
            //checks to see if body has recieved the menu-hidden class after load
            expect(element.hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('ensures the menu changes visibility when the menu icon is clicked', function() {
            var element = $('body');

            /* using jquery to trigger click on menu-icon. And then test to see
             * if the menu-hidden class is removed
             */
            $('.menu-icon-link').trigger('click');
            expect(element.hasClass('menu-hidden')).toBe(false);

            /* using jquery to trigger another click on menu-icon. And then test to see
             * if the menu-hidden class is restored
             */
            $('.menu-icon-link').trigger('click');
            expect(element.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         /* using beforEach method to run loadFeed prior to test
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
        it('should have at least one .entry element after loadFeed is called', function(done) {
            var entryLength = $('.entry').length;
            expect(entryLength).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var topHeader;

        /* beforeEach loads one feed, then stores the content of the first entry header
         * in the variable topHeader. Next it loads a different feed and completes by running
         * the done callback which allows the test to run
         */
        beforeEach(function(done) {
            loadFeed(0);
            topHeader = $('.entry h2:first').text();
            loadFeed(2, done);
        });

        /* it test to make sure the content of the newTopHeader is not the same as
         * the previous header
         */
        it('entry content should change', function(done) {
            var newTopHeader = $('.entry h2:first').text();
            expect(newTopHeader).not.toMatch(topHeader);
            done();
        });
    });
}());
