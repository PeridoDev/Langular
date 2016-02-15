angular.module('langular')
    .factory('Message', Message);

Message.$inject = ['$resource'];

function Message($resource) {

    return class Message {

        constructor(args) {

            if (typeof args === 'object') {
                this.id = args.id;
                this.text = args.text;
                this.created_at = args.created_at;
                this.updated_at = args.updated_at;
            }

        }


        store(args) {

            args = typeof args === 'object' ? args : {};
            var onSuccess =
                typeof args.onSuccess === 'function' ?
                args.onSuccess :
                function(value) {};
            var onFail =
                typeof args.onFail === 'function' ?
                args.onFail :
                function(value) {};

            Message.resource()
                .save({
                    text: this.text
                })
                .$promise.then(
                    function(value) {
                        onSuccess();
                    },
                    function(error) {

                        onFail(error);
                    });
        }

        delete(args) {

            args = typeof args === 'object' ? args : {};
            var onSuccess =
                typeof args.onSuccess === 'function' ?
                args.onSuccess :
                function(value) {};
            var onFail =
                typeof args.onFail === 'function' ?
                args.onFail :
                function(value) {};

            Message.resource()
                .delete({
                    id: this.id
                })
                .$promise.then(
                    function(value) {
                        onSuccess();
                    },
                    function(error) {

                        onFail(error);
                    });

        }

        static makeCollection(data) {

            var collection = [];
            for (var item of data) {

                collection.push(new Message(item));
            }
            return collection;
        }
		

        static resource() {

            return $resource('api/message/:id');
        }


        static index(args) {

            args = typeof args === 'object' ? args : {};
            var onSuccess =
                typeof args.onSuccess === 'function' ?
                args.onSuccess :
                function(value) {};
            var onFail =
                typeof args.onFail === 'function' ?
                args.onFail :
                function(value) {};

            Message.resource()
                .query()
                .$promise
                .then(function(value) {

                        var collection = Message.makeCollection(value);
                        onSuccess(collection);
                    },
                    function(error) {

                        onFail(error);
                    });
        }

    };
}