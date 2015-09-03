import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.find('todo');
    },
    actions: {
        createTodo: function(newTitle) {
            // Create the new Todo model
            var todo = this.store.createRecord('todo', {
                title: newTitle,
                isCompleted: false
            });

            // Clear the "New Todo" text field
            this.controllerFor('todos').set('newTitle', '');

            // Save the new model
            todo.save();
        },
        acceptChanges: function(todo) {
            if (Ember.isEmpty(todo.get('title'))) {
                this.send('deleteTodo', todo);
            } else {
                todo.save();
            }
        },
        toggleAll: function() {
            this.store.all('todo').forEach(function (item){
                item.set('isCompleted', !item.get('isCompleted'));
                item.save();
            });
        },
        deleteTodo: function(todo) {
            this.store.find('todo', todo.id ).then(function(item) {
                item.destroyRecord();
                item.save();
            });

        }
    }
});
