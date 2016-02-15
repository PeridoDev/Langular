/*
 *	GuestbookController
 */

(function() {

    angular.module('langular')
        .controller('GuestbookController', GuestbookController);

    GuestbookController.$inject = ['Guestbook'];


    function GuestbookController(Guestbook) {

        var self = this;

        self.guestbook = new Guestbook();

        self.guestbook.load();

    }

}());