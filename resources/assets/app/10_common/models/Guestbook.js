angular.module('langular')
    .factory('Guestbook', Guestbook);

Guestbook.$inject = ['Message', '$timeout'];

function Guestbook(Message, $timeout) {

    return class Guestbook {

        constructor() {

            this.longDelayTime = 1000;
            this.isLocked      = false;
            this.isLongDelay   = undefined;
			this.hasFailed	   = false; // TODO: implementera on failed
            this.messages      = [];
            this.input         = "";
        }

        lock() {

            var self = this;
            self.isLocked = true;
            $timeout(function() {

                if (self.isLocked) {

                    self.isLongDelay = true;
                }

            }, self.longDelayTime);
        }

        unlock() {

            this.isLocked = false;
            delete this.isLongDelay;
        }

        load() {
            var self = this;
            self.lock();
            Message.index({
                onSuccess: function(value) {

                    self.messages = value;
                    self.unlock();
                }
            });
        }

        postMessage() {
            self = this;
            self.lock();

            var message = new Message({
                text: self.input
            });

            message.store({
                onSuccess: function() {

                    self.input = "";

                    self.load();
                }
            });

        }

        deleteMessage(message) {

            var self = this;
            self.lock();

            message.delete({
                onSuccess: function() {

                    self.load();
                }
            });
        }

    };

}